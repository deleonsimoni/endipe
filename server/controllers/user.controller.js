const bcrypt = require('bcrypt');
//const Joi = require('joi');
const User = require('../models/user.model');
const Prices = require('../config/prices');

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
  price
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

function price(id) {
  let dateNow = Date.now;
  let seasons = Prices.find(price => price.id === id).seasons;
  
  return seasons.filter(season => dateNow >= season.dateIni && dateNow <= season.dateEnd)[0].price;

}
