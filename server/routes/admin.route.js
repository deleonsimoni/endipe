const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const adminCtrl = require('../controllers/admin.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.get('/usrs', passport.authenticate('jwt', { session: false }), getUsers);

async function getUsers(req, res) {
  if(req.user.icAdmin){
    let users = await adminCtrl.getUsers(req.body);
    res.json(users);
  } else {
    res.sendStatus(401);
  }
}