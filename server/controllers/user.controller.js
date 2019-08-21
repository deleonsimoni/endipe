const bcrypt = require('bcrypt');
//const Joi = require('joi');
const User = require('../models/user.model');
const Prices = require('../config/prices');
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const S3Uploader = require('./aws.controller');

/*const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})*/


module.exports = {
  insert,
  generatePayment,
  getPrice,
  uploadWork,
  getUsers
}

async function insert(user) {
  //user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  console.log('Inserindo usuário no banco');
  return await new User(user).save();
}

async function getUsers() {
  return await User.find()
                    .select('fullname email createdAt document phones modalityId payment works')
                    .sort({ fullname: 1 });
}


function getPrice(id) {
  let dateNow = new Date();

  let seasons = Prices.prices.filter(price => price.id == id)[0].seasons;
  
  return seasons.filter(season => dateNow.getTime() >= season.dateIni.getTime() && dateNow.getTime() <= season.dateEnd.getTime())[0].price;

}

async function generatePayment(req, res) {
  var form = new IncomingForm();
  var fileName = '';
  var buffer = null;
  var formulario = null;
  var payment = null;

  form.on('field', (name, value) => { 
    formulario = JSON.parse(value);
  });

  form.on('file', (field, file) => {
    fileName = 'xxendiperio2020/' + file.name;
    buffer = fs.readFileSync(file.path);
  });

  form.on('end', () => {

    S3Uploader.uploadFile(fileName, buffer).then(fileData => {
      console.log(formulario);
      let amount = getPrice(formulario.categoryId);

      payment = {
        amount: amount,
        categoryId: formulario.categoryId,
        pathS3: fileName,
        icPaid: false
      }

      req.user.payment = payment;

      User.findOneAndUpdate({_id: req.user._id}, {$push: {payment: req.user.payment}}, function (err, doc) {
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
  });

  form.parse(req);
}

async function uploadWork(req, res) {

  var form = new IncomingForm();
  var fileNameDOC = '';
  var bufferDOC = null;
  var fileNamePDF = '';
  var bufferPDF = null;
  var formulario = null;
  var contador = 0;

  /*form.on('field', (name, value) => { 
    formulario = JSON.parse(value);
    console.log(formulario);
  });*/

 // var formfields = await new Promise(function (resolve, reject) {
    form.on('field', (name, value) => { 
      formulario = JSON.parse(value);
      console.log(formulario);
      //resolve(formulario);
    });

  //});

  

  //formfields = await new Promise(function (resolve, reject) {
    form.on('file', (field, file) => {

      if(contador === 0){
        fileNamePDF = 'xxendiperio2020/' + file.name;
        bufferPDF = fs.readFileSync(file.path);
        contador++;
      } else {
        fileNameDOC = 'xxendiperio2020/' + file.name;
        bufferDOC = fs.readFileSync(file.path);
      }

      //resolve(true);

    });
  //});

 // formfields = await new Promise(function (resolve, reject) {
    form.on('end', () => {
      console.log('imprimindo for ', formulario); 
      S3Uploader.uploadFile(fileNameDOC, bufferDOC).then(fileData => {
        S3Uploader.uploadFile(fileNamePDF, bufferPDF).then(fileData => {
          formulario.pathS3DOC = fileNameDOC;
          formulario.pathS3PDF = fileNamePDF;
          req.user.works = formulario;
    
          User.findOneAndUpdate({_id: req.user._id}, {$push: {works: req.user.works}}, function (err, doc) {
              if (err) {
                  console.log("erro ao atualizar o usuario: ", err);
              } else {
                  console.log("update document success");
              }
            });
          res.json({
            user: req.user,
            successful: true
            //fileData
          });
         //return resolve(res);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
           // return  reject(res);

        });
      }).catch(err => {
          console.log(err);
          res.sendStatus(500);
          //return  reject(res);

      });
    });
  //});


  form.parse(req);
  return res;
}