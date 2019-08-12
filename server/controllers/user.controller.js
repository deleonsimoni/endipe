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
  payment,
  getPrice,
  uploadWork
}

async function insert(user) {
  //user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  console.log('Inserindo usuário no banco');
  return await new User(user).save();
}

async function payment(form) {
  let amount = price(form.idCategoria);
  return await new User(user).save();
}

function getPrice(id) {
  let dateNow = new Date();

  let seasons = Prices.prices.filter(price => price.id == id)[0].seasons;
  
  return seasons.filter(season => dateNow.getTime() >= season.dateIni.getTime() && dateNow.getTime() <= season.dateEnd.getTime())[0].price;

}

async function uploadWork(req) {
  var id = req.params.id;
  var s3Uploader = new S3Uploader(req);
  var form = new IncomingForm();
  var fileName = '';
  var buffer = null;

  form.on('file', (field, file) => {
    fileName = file.name;
    buffer = fs.readFileSync(file.path);
  });
  form.on('end', () => {
    s3Uploader.uploadFile(fileName, buffer).then(fileData => {
      res.json({
        successful: true,
        fileData
      });
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
  });
  form.parse(req);

}