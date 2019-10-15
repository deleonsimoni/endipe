const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const emailSender = require('../controllers/email.controller');
const templateEmail = require('../config/templateEmails');
const fileUpload = require('express-fileupload');


const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.get('/price/:id', passport.authenticate('jwt', { session: false }), asyncHandler(price));
router.get('/downloadFile', passport.authenticate('jwt', { session: false }), downloadFile);
router.get('/coordinator', passport.authenticate('jwt', { session: false }), getCoordinator);
router.get('/reviewer', passport.authenticate('jwt', { session: false }), getReviewer);

router.post('/uploadWork/xxendiperio2020/:id', [passport.authenticate('jwt', { session: false }), fileUpload()], asyncHandler(uploadWork));
router.post('/payment', passport.authenticate('jwt', { session: false }), payment);
router.post('/gerarPagamento/xxendiperio2020/:id', passport.authenticate('jwt', { session: false }), payment);
router.post('/coordinator', passport.authenticate('jwt', { session: false }), createCoordinator);
router.post('/reviewer', passport.authenticate('jwt', { session: false }), createReviewer);
router.delete('/coordinator', passport.authenticate('jwt', { session: false }), deleteCoordinator);
router.delete('/reviewer', passport.authenticate('jwt', { session: false }), deleteReviewer);

router.put('/update', passport.authenticate('jwt', { session: false }), update);
router.route('/')
  .post(asyncHandler(insert));


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

async function getCoordinator(req, res) {
  let coordinators = await userCtrl.getCoordinator();
  res.json({ coordinators });
}

async function getReviewer(req, res) {
  let reviewers = await userCtrl.getReviewer();
  res.json({ reviewers });
}

async function createCoordinator(req, res) {
  let coordinators = await userCtrl.createCoordinator(req.body);
  res.json({ coordinators });
}

async function createReviewer(req, res) {
  let reviewers = await userCtrl.createReviewer();
  res.json({ reviewers });
}

async function deleteCoordinator(req, res) {
  let coordinators = await userCtrl.deleteCoordinator();
  res.json({ coordinators });
}

async function deleteReviewer(req, res) {
  let reviewers = await userCtrl.deleteReviewer();
  res.json({ reviewers });
}