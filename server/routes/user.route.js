const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const emailSender = require('../controllers/email.controller');
const templateEmail = require('../config/templateEmails');
const fileUpload = require('express-fileupload');


const router = express.Router();
module.exports = router;

router.get('/testeBoleto', testeBoleto);


router.use(passport.authenticate('jwt', { session: false }))

router.get('/price/:id', passport.authenticate('jwt', { session: false }), asyncHandler(price));
router.get('/downloadFile', passport.authenticate('jwt', { session: false }), downloadFile);
router.get('/getBoleto', passport.authenticate('jwt', { session: false }), asyncHandler(getBoleto));

router.post('/uploadWork/xxendiperio2020/:id', [passport.authenticate('jwt', { session: false }), fileUpload()], asyncHandler(uploadWork));
router.post('/submeterTransferencia/xxendiperio2020/:id', [passport.authenticate('jwt', { session: false }), fileUpload()], asyncHandler(submeterTransferencia));
router.post('/payment', passport.authenticate('jwt', { session: false }), payment);
router.post('/gerarPagamento/xxendiperio2020/:id', passport.authenticate('jwt', { session: false }), payment);

router.put('/update', passport.authenticate('jwt', { session: false }), update);

router.route('/')
  .post(asyncHandler(insert));

async function testeBoleto(req, res) {
  //let response = await boletoctrl.gerar();
  res.json(response);
}

async function uploadWork(req, res) {
  let response = await userCtrl.uploadWork(req, res);
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

async function submeterTransferencia(req, res) {
  console.log('cheguei');
  let user = await userCtrl.submeterTransferencia(req);
  res.json({ user });
}

async function getBoleto(req, res) {
  let boleto = await userCtrl.getBoleto(req);
  res.json({ boleto });
}