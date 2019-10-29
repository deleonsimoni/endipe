const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const adminCtrl = require('../controllers/admin.controller');
const emailSender = require('../controllers/email.controller');
const templateEmail = require('../config/templateEmails');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.get('/usrs', passport.authenticate('jwt', { session: false }), getUsers);
router.get('/getUserWorks/:id', passport.authenticate('jwt', { session: false }), asyncHandler(getUserWorks));
router.get('/works/:id', passport.authenticate('jwt', { session: false }), getWorks);
router.get('/metrics', passport.authenticate('jwt', { session: false }), getMetrics);

router.post('/validatePayment/:id', passport.authenticate('jwt', { session: false }), validatePayment);
router.post('/invalidatePayment/:id', passport.authenticate('jwt', { session: false }), invalidatePayment);
router.post('/rainbown/:id', passport.authenticate('jwt', { session: false }), deleteByEmail);


async function getUsers(req, res) {
  const user = req.user;
  if (user.icAdmin || user.coordinator || user.reviewer) {
    let users = await adminCtrl.getUsers(req.body);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function deleteByEmail(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.deleteByEmail(req.params.id);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function getUserWorks(req, res) {
  const user = req.user;
  if (user.icAdmin || user.coordinator || user.reviewer) {
    let users = await adminCtrl.getUserWorks(req.params.id);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function getWorks(req, res) {
  const user = req.user;

  if (user.coordinator || user.reviewer) {

    try {

      const works = await adminCtrl.getWorks(req.params.id);
      res.status(200).json(works);

    } catch (error) {

      console.log(error);
      res.status(401).json(error);

    }
  }

}

async function validatePayment(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.validatePayment(req.params.id);
    emailSender.sendMail(users.email, 'Pagamento Homologado', templateEmail.pagamentoHomologado);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function invalidatePayment(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.invalidatePayment(req.params.id);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function getMetrics(req, res) {
  let metrics = await adminCtrl.recoverMetrics();
  res.json(metrics);
}