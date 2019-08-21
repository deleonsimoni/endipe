const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.get('/price/:id', passport.authenticate('jwt', { session: false }), price);
router.get('/usrs', passport.authenticate('jwt', { session: false }), getUsers);
router.post('/payment', passport.authenticate('jwt', { session: false }), payment);
router.post('/uploadWork/xxendiperio2020/:id', passport.authenticate('jwt', { session: false }), uploadWork);
router.post('/gerarPagamento/xxendiperio2020/:id', passport.authenticate('jwt', { session: false }), payment);
router.route('/')
  .post(asyncHandler(insert));

async function uploadWork(req, res) {
  let response = await userCtrl.uploadWork(req, res);
  console.log('Devolvi Pro front');
  res.json(response);
}

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function getUsers(req, res) {
  //if(req.user.icAdmin){
    let users = await userCtrl.getUsers(req.body);
    res.json(users);
  /*} else {
    res.sendStatus(401);
  }*/
}

async function payment(req, res) {
  let user = await userCtrl.generatePayment(req);
  res.json({ user });
}

async function price(req, res) {
  let price = userCtrl.getPrice(req.params.id);
  res.json({ price });
}