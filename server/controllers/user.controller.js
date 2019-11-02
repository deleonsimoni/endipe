const bcrypt = require('bcrypt');
//const Joi = require('joi');
const User = require('../models/user.model');
const Work = require('../models/work.model');
const Prices = require('../config/prices');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const S3Uploader = require('./aws.controller');
const config = require('../config/config');
const emailSender = require('../controllers/email.controller');
const templateEmail = require('../config/templateEmails');
const validarCpf = require('validar-cpf');

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
  createCoordinator,
  getCoordinator,
  deleteCoordinator,
  getReviewer,
  createReviewer,
  deleteReviewer,
  checkDocumentDup,
  generateNewPassword,
  resetPassword,
  getBoleto,
  submeterTransferencia
}

async function insert(user) {
  //user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function generateNewPassword(user) {
  const randomstring = Math.random().toString(36).slice(-8);

  let response = {
    status: 200, message: `Seu código para troca de senha foi enviado para seu email.`
  };

  await User.findByIdAndUpdate(user._id, {
    '$set': {
      mailCodePassword: randomstring
    }
  }, function (err, doc) {
    if (err) response = { status: 500, message: err };
    let email = templateEmail.esqueciSenha.replace("#senha#", randomstring);
    emailSender.sendMail(user.email, 'Recuperação de Senha', email);
  })

  return response;

}

async function resetPassword(req, user) {
  const hashString = bcrypt.hashSync(req.body.password, 10);

  let response = {
    status: 200, message: `Senha alterada com sucesso.`
  };

  await User.findByIdAndUpdate(user._id, {
    '$set': {
      mailCodePassword: null,
      hashedPassword: hashString
    }
  }, function (err, doc) {
    if (err) response = { status: 500, message: err };
  })

  return response;

}

async function getBoleto(req) {

  let retorno = {};
  retorno = await validarDadosGeracaoBoleto(req.user);
  if (retorno.temErro) {
    return retorno;
  } else {
    let ultimoRef = await User.findOne({ 'boleto': { $ne: null } }, {}, { sort: { 'boleto.refTran': 1 } }).select('boleto.refTran');

    if (req.user.boleto) {
      let dateNow = new Date();
      dateNow.setHours(0, 0, 0, 0);


      if (dateNow.getTime() >= req.user.boleto.dtVenc.getTime()) {

        let price = getPriceFullObject(req.user.payment.categoryId);
        retorno.refTran = ultimoRef == null || ultimoRef.length == 0 ? 1 : ++ultimoRef.boleto.refTran;
        retorno.dtVenc = price.dateEnd;
        console.log(price);
        retorno.valor = price.price + '00';
        retorno.userId = req.user._id;
        retorno.tpPagamento = "2";
        await User.findOneAndUpdate({ _id: req.user._id }, { $set: { boleto: retorno } }, { new: true });

      } else {
        retorno = req.user.boleto;
        retorno.tpPagamento = 21;

      }

    } else {

      let price = getPriceFullObject(req.user.payment.categoryId);

      retorno.refTran = ultimoRef == null || ultimoRef.length == 0 ? 1 : ++ultimoRef.boleto.refTran;
      retorno.dtVenc = price.dateEnd;
      retorno.valor = price.price + '00';
      retorno.userId = req.user._id;
      retorno.tpPagamento = "2";
      await User.findOneAndUpdate({ _id: req.user._id }, { $set: { boleto: retorno } }, { new: true });

    }

    retorno.dtVenc = formatDate(retorno.dtVenc);
    retorno.refTran = pad(retorno.refTran, 10);
    return retorno;
  }
}

async function validarDadosGeracaoBoleto(user) {

  let retorno = {
    temErro: false,
    msgErro: ''
  }

  if (user.address.street == null || user.address.city == null || user.address.zip == null) {
    retorno.temErro = true;
    retorno.msgErro = "Endereço inválido, cheque seus dados no menu Perfil";
  } else if (user.address.state.length != 2) {
    retorno.temErro = true;
    retorno.msgErro = "Seu estado deve conter apenas dois digitos, cheque seus dados no menu Perfil";
  } else if (user.address.zip.length != 8) {
    retorno.temErro = true;
    retorno.msgErro = "CEP inválido, cheque seu CEP no menu Perfil";
  } else if (!validarCpf(user.document)) {
    retorno.temErro = true;
    retorno.msgErro = "CPF inválido, cheque seu CPF no menu Perfil";
  }

  return retorno;
}

async function checkDocumentDup(cpf) {
  let userFind = await User.find({ document: cpf }).select('document');
  return userFind.length > 0 ? true : false;
}

async function update(user) {
  return await User.findOneAndUpdate({ _id: user._id }, user, { new: true });
}

function getPrice(id) {
  let dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0);
  let seasons = Prices.prices.filter(price => price.id == id)[0].seasons;

  return seasons.filter(season => dateNow.getTime() >= season.dateIni.getTime() && dateNow.getTime() <= season.dateEnd.getTime())[0].price;

}

function getPriceFullObject(id) {
  let dateNow = new Date();
  dateNow.setHours(0, 0, 0, 0)
  let seasons = Prices.prices.filter(price => price.id == id)[0].seasons;

  return seasons.filter(season => dateNow.getTime() >= season.dateIni.getTime() && dateNow.getTime() <= season.dateEnd.getTime())[0];

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

    if (formulario.categoryId === 5) {
      payment.pathReceiptPayment = '';
      payment.icValid = true;
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


async function submeterTransferencia(req, res) {

  let file = req.files.fileArray;
  let fileName = config.PATH_S3_DEV ? config.PATH_S3_DEV + 'xxendiperio2020/' + file.name : 'xxendiperio2020/' + file.name;

  await S3Uploader.uploadFile(fileName, file.data).then(fileData => {

    return User.findOneAndUpdate({ _id: req.user._id }, { $set: { 'payment.pathReceiptPayment': fileName } }, function (err, doc) {
      if (err) {
        console.log("erro ao atualizar o usuario: ", err);
      } else {
        console.log("Documento de transferencia registrado com sucesso");
      }
    });

  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
    return res;
  });

}


async function uploadWork(req, res) {

  let formulario = JSON.parse(req.body.formulario);
  console.log('Validando Usuarios' + JSON.stringify(formulario.authors));

  let responseValidationEmails = await validateEmailsFrom(formulario.authors, formulario.usuarioPrincipal);
  if (responseValidationEmails.temErro) {
    console.log('dados inválidos do front: ' + JSON.stringify(responseValidationEmails));
    return responseValidationEmails;
  }

  let responseValidacao = await validatePaymentUsers(formulario.authors, formulario.modalityId);
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


async function validateEmailsFrom(users, usuarioPrincipal) {

  let resultado;
  let retorno = {
    temErro: false,
    mensagem: ''
  }

  resultado = await validarUsuarioPrincipal(users, usuarioPrincipal);

  if (resultado) {
    retorno.temErro = true;
    retorno.mensagem = `Você precisa ser um autor para submeter o trabalho`
  }

  resultado = await validarEmailDuplicado(users);

  if (resultado) {
    retorno.temErro = true;
    retorno.mensagem = `Há emails duplicados, verifique o campo de autores`
  }

  return retorno;

}

async function validarUsuarioPrincipal(usuarios, emailPrincipal) {

  let emailFind = await usuarios.filter(autor => autor.email == emailPrincipal)[0];
  if (emailFind) {
    return false;
  } else {
    return true;
  }

}

async function validarEmailDuplicado(usuarios) {

  var sorted_arr = usuarios.slice().sort();
  var results = [];
  for (var i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1].email == sorted_arr[i].email) {
      results.push(sorted_arr[i]);
    }
  }

  if (results.length > 0) {
    return true;
  } else {
    return false;
  }

}

async function validatePaymentUsers(users, modalityId) {

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
      } else if (userFind.works && userFind.works.length >= 2) {
        retorno.temErro = true;
        retorno.mensagem = `O usuário ${users[i].email} já possui dois trabalhos submetidos`
        break;
      } else if (userFind.works.length == 1 && await validateModalityDup(userFind.works[0], modalityId)) {
        retorno.temErro = true;
        retorno.mensagem = `O usuário ${users[i].email} já possui trabalho submetido para esta modalidade`
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

async function validateModalityDup(workId, modalityId) {
  let workFind = await Work.findById(workId);
  if (workFind.modalityId == modalityId) {
    return true;
  } else {
    return false;
  }

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
    axisId: formulario.axisId,
    mainAuthor: formulario.usuarioPrincipal,
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

  if (retorno.temErro) {
    return retorno;
  } else {

    retorno.userId.forEach(async user => {
      await User.findOneAndUpdate({ _id: user }, { $set: { coordinator: { icModalityId: coordinators.axis } } });
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

      } else if (user.coordinator && user.coordinator.icModalityId) {

        retorno.userEmail.push(author.email);
        retorno.temErro = true;
        retorno.mensagem = `O usuário ${author.email} já possui cadastro como coordenador`;
        reject(retorno);

      } else if (user.reviewer && user.reviewer.icModalityId) {

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

async function getCoordinator() {
  return await User.find({ coordinator: { $ne: null } }).sort({ fullname: 1 });
}

async function deleteCoordinator(id) {
  await User.findByIdAndUpdate({ _id: id }, { $unset: { coordinator: '' } });
  return null;
}

async function getReviewer() {
  return await User.find({ reviewer: { $ne: null } }).sort({ fullname: 1 });
}

async function createReviewer(reviewer) {

  let retorno = {
    temErro: false,
    mensagem: '',
    valids: []
  };

  console.log('work: ', reviewer.work);
  await validateReviewer(reviewer.reviewers, retorno);

  if (retorno.temErro) {
    return retorno;
  } else {

    retorno.valids.forEach(async user => {
      console.log('user: ', user);
      await Work.findOneAndUpdate({ _id: reviewer.work }, { $push: { reviewers: { user } } });
      await User.findOneAndUpdate({ _id: user.userId }, { $set: { icReviewer: true } });

    });

    retorno.mensagem = `Parecerista cadastrado com sucesso`;
    retorno.temErro = false;

  }

  return retorno;

}

async function validateReviewer(reviewers, retorno) {

  let user;

  const promise = await new Promise(function (resolve, reject) {

    reviewers.forEach(async (reviewer, key) => {

      user = await getUserByEmail(reviewer.email);

      if (!user) {

        retorno.temErro = true;
        retorno.mensagem = `Usuário ${reviewer.email} não está cadastrado no sistema`;
        reject(retorno);

      } else if (user.coordinator && user.coordinator.icModalityId) {

        retorno.temErro = true;
        retorno.mensagem = `O usuário ${reviewer.email} já possui cadastro como coordenador`;
        reject(retorno);

      } else if (user.icReviewer) {

        retorno.temErro = true;
        retorno.mensagem = `O usuário ${reviewer.email} já possui cadastro como parecerista`;
        reject(retorno);

      } else {

        retorno.temErro = false;
        retorno.valids.push({ userId: user._id, userEmail: user.email });
        if (reviewers.length - 1 == key) {
          resolve(retorno);
        }

      }
    });


  }).then(res => res).catch(err => err);

  return promise;
}

async function deleteReviewer(id) {
  await User.findByIdAndUpdate({ _id: id }, { $unset: { reviewer: '' } });
  return null;
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [day, month, year].join('');
}

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}