const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.get('/price/:id', passport.authenticate('jwt', { session: false }), price);
router.get('/downloadFile', passport.authenticate('jwt', { session: false }), downloadFile);
router.post('/payment', passport.authenticate('jwt', { session: false }), payment);
router.post('/uploadWork/xxendiperio2020/:id', passport.authenticate('jwt', { session: false }), uploadWork);
router.post('/gerarPagamento/xxendiperio2020/:id', passport.authenticate('jwt', { session: false }), payment);
router.put('/update', passport.authenticate('jwt', { session: false }), update);
router.route('/')
  .post(asyncHandler(insert));

async function uploadWork(req, res) {
  let response = await userCtrl.uploadWork(req, res);
  console.log('Devolvi Pro front');
  res.json(response);
}

async function downloadFile(req, res) {
  let response = await userCtrl.downloadFileS3(req.query.fileName);
  res.json(response);
}

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function update(req, res) {
  let user = await userCtrl.update(req.body);
  res.json(user);
}

async function payment(req, res) {
  let user = await userCtrl.generatePayment(req);
  res.json({ user });
}

async function price(req, res) {
  let price = userCtrl.getPrice(req.params.id);
  res.json({ price });
}