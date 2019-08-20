const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const emailSender = require('../controllers/email.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const templateEmail = require('../config/templateEmails');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', passport.authenticate('jwt', { session: false }), login);


async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  delete user.hashedPassword;
  emailSender.sendMail(user.email, 'Inscrição Realizada com Sucesso', templateEmail.inscricaoSucesso);
  req.user = user;
  next()
}

function login(req, res) {
  console.log('registrando');
  let user = req.user;
  let token = authCtrl.generateToken(user);
  //user = user.toObject();
  //res.json({ user, token });
  res.json({ token });

}
