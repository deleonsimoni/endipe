const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const adminCtrl = require('../controllers/admin.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.get('/usrs', passport.authenticate('jwt', { session: false }), getUsers);
router.post('/validatePayment/:id', passport.authenticate('jwt', { session: false }), validatePayment);
router.post('/invalidatePayment/:id', passport.authenticate('jwt', { session: false }), invalidatePayment);

async function getUsers(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.getUsers(req.body);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}

async function validatePayment(req, res) {
  if (req.user.icAdmin) {
    let users = await adminCtrl.validatePayment(req.params.id);
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