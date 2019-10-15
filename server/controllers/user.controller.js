const bcrypt = require('bcrypt');
//const Joi = require('joi');
const User = require('../models/user.model');
const Work = require('../models/work.model');
const Prices = require('../config/prices');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const S3Uploader = require('./aws.controller');
const config = require('../config/config');


/*const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})*/


module.exports = {
  insert,
  update,
  generatePayment,
  getPrice,
  uploadWork,
  downloadFileS3,
  createCoordinator
}

async function insert(user) {
  //user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  console.log('Inserindo usuário no banco');
  return await new User(user).save();
}

async function update(user) {
  return await User.findOneAndUpdate({ _id: user._id }, user, { new: true });
}

function getPrice(id) {
  let dateNow = new Date();

  let seasons = Prices.prices.filter(price => price.id == id)[0].seasons;

  return seasons.filter(season => dateNow.getTime() >= season.dateIni.getTime() && dateNow.getTime() <= season.dateEnd.getTime())[0].price;

}

async function generatePayment(req, res) {

  var form = new IncomingForm();
  var fileName = null;
  var buffer = null;
  var formulario = null;
  var payment = null;



  form.on('field', (name, value) => {
    formulario = JSON.parse(value);
  });

  form.on('file', (field, file) => {
    fileName = config.PATH_S3_DEV ? config.PATH_S3_DEV + 'xxendiperio2020/' + file.name : 'xxendiperio2020/' + file.name;
    buffer = fs.readFileSync(file.path);
  });

  form.on('end', () => {

    let amount = getPrice(formulario.categoryId);

    payment = {
      amount: amount,
      categoryId: formulario.categoryId,
      pathS3: fileName,
      icPaid: false
    }

    req.user.payment = payment;


    if (fileName) {
      S3Uploader.uploadFile(fileName, buffer).then(fileData => {

        req.user.payment.pathS3 = fileName;

        User.findOneAndUpdate({ _id: req.user._id }, { $set: { payment: req.user.payment } }, function (err, doc) {
          if (err) {
            console.log("erro ao atualizar o usuario: ", err);
          } else {
            console.log("Pagamento registrado com sucesso");
          }
        });

      }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      });

    } else {

      User.findOneAndUpdate({ _id: req.user._id }, { $set: { payment: req.user.payment } }, function (err, doc) {
        if (err) {
          console.log("erro ao atualizar o usuario: ", err);
        } else {
          console.log("Pagamento registrado com sucesso");
        }
      });

    }

  });

  form.parse(req);
}

async function downloadFileS3(req) {
  console.log('pegando Arquivo ' + req);
  return await S3Uploader.downloadFile(req);
}

async function getUserByEmail(email) {
  return await User.findOne({ email: email.toLowerCase() });
}


async function uploadWork(req, res) {

  let formulario = JSON.parse(req.body.formulario);

  console.log('Validando Usuarios' + JSON.stringify(formulario.authors));
  let responseValidacao = await validatePaymentUsers(formulario.authors);
  if (responseValidacao.temErro) {
    console.log('erro na validacao dos usuarios: ' + JSON.stringify(responseValidacao));
    return responseValidacao;
  }
  console.log('validei todos com sucesso: ' + JSON.stringify(responseValidacao));

  console.log('upload works');
  let responseUpload = await uploadWorks(req.files.fileArray);
  if (responseUpload.temErro) {
    console.log('erro no upload de arquivos: ' + JSON.stringify(responseUpload));
    return responseUpload;
  }
  console.log('subi todos os arquivos: ' + JSON.stringify(responseUpload));

  console.log('atualizando  banco');
  let workId = await createWork(responseValidacao.user, responseUpload.filesS3, formulario);
  console.log('IDWORKJK ' + workId);
  return await updateUsers(responseValidacao.user, workId);

}

async function validatePaymentUsers(users) {

  let userFind;
  let retorno = {
    temErro: false,
    mensagem: '',
    user: []
  }

  for (let i = 0; i < users.length; i++) {

    if (!users[i].email) {
      continue;
    }

    userFind = await getUserByEmail(users[i].email);

    if (userFind) {
      if (!userFind.payment || !userFind.payment.icPaid) {
        retorno.temErro = true;
        retorno.mensagem = `O usuário ${users[i].email} não possui pagamento válido`
        break;
      } else if (userFind.works && userFind.works.length > 2) {
        retorno.temErro = true;
        retorno.mensagem = `O usuário ${users[i].email} já possui dois trabalhos submetidos`
        break;
      } else {
        retorno.user.push({ userId: userFind._id, userEmail: users[i].email });
      }
    } else {
      retorno.temErro = true;
      retorno.mensagem = `O usuário ${users[i].email} não está inscrito no congresso`
      break;
    }
  };

  return retorno;

}

async function uploadWorks(files) {

  let retorno = {
    temErro: false,
    mensagem: '',
    filesS3: []
  }

  let fileName;

  for (let i = 0; i < files.length; i++) {

    fileName = config.PATH_S3_DEV ? config.PATH_S3_DEV + 'xxendiperio2020/works/' + files[i].name : 'xxendiperio2020/works/' + files[i].name;
    await S3Uploader.uploadFile(fileName, files[i].data).then(fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      retorno.filesS3.push(fileName);
    }, err => {
      console.log('Erro ao enviar o trabalho para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });
  }

  return retorno;

}

async function createWork(users, filesName, formulario) {

  let protocol = 123;

  let work = {
    protocol: protocol,
    title: formulario.title,
    modalityId: formulario.modalityId,
    typeWork: formulario.typeWork,
    axisId: formulario.axisId,

    pathS3DOC: filesName[0],
    pathS3PDF: filesName[1],

    authors: users
  }

  let workInserted = await new Work(work).save();
  return workInserted._id;

}

async function updateUsers(users, workId) {

  users.forEach(element => {
    User.findOneAndUpdate({ _id: element.userId }, { $push: { works: workId } }, { new: true }, (err, doc) => {
      if (err) {
        console.log("Erro ao atualizar o usuario -> " + err);
      }
    });
  });

}

async function createCoordinator(coordinators) {

  let retorno = {
    temErro: false,
    mensagem: '',
    userEmail: [],
    userId: []
  }

  let p1 = await validateCoordinator(coordinators.authors, retorno);
  console.log('promise: ', p1);

  if (retorno.temErro) {
    return retorno;
  } else {

    retorno.userId.forEach(async user => {
      await User.findOneAndUpdate({ _id: user }, { $set: { coordinator: coordinators.axis } });
    });

    retorno.mensagem = `Coordenador cadastrado com sucesso`;
    retorno.temErro = false;

  }

  return retorno;

}


async function validateCoordinator(authors, retorno) {
  let user;
  let promise = await new Promise(function (resolve, reject) {
    authors.forEach(async author => {
      user = await getUserByEmail(author.email);
      if (!user) {
        retorno.userEmail.push(author.email);
        retorno.temErro = true;
        retorno.mensagem = `Usuário ${author.email} não está cadastrado no sistema`;
        reject(retorno);
      } else if (user.coordinator && user.coordinator.modalityId) {
        retorno.userEmail.push(author.email);
        retorno.temErro = true;
        retorno.mensagem = `O usuário ${author.email} já possui cadastro como coordenador`;
        reject(retorno);
      } else if (user.reviewer && user.reviewer.modalityId) {
        retorno.userEmail.push(author.email);
        retorno.temErro = true;
        retorno.mensagem = `O usuário ${author.email} já possui cadastro como parecerista`;
        reject(retorno);
      } else {
        retorno.userId.push(user._id);
        retorno.temErro = false;
        resolve(retorno);
      }
    });
  }).then(res => res).catch(err => err);

  return promise;
};