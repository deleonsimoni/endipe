const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))
router.post('/payment', passport.authenticate('jwt', { session: false }), payment);
router.get('/price/:id', passport.authenticate('jwt', { session: false }), price);

router.route('/')
  .post(asyncHandler(insert));


async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function payment(req, res) {
  let payment = await userCtrl.payment(req.body);
  payment = payment.toObject();
  res.json({ payment });
}

async function price(req, res) {
  let price = userCtrl.getPrice(req.params.id);
  res.json({ price });
}