const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const House = require('../models/house.model');


const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})


module.exports = {
  insert
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;

  if(!user.houses){
    console.log('Usuario sem casa definida');
    house = {
      name: 'Principal'
    }
    user.houses = await new House(house).save();
    console.log('Casa principal criada para o usuario');
  }

  console.log('Inserindo usuário no banco');
  return await new User(user).save();
}
