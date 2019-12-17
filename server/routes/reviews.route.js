const express = require('express');
const passport = require('passport');
const reviewCtrl = require('../controllers/reviews.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();
module.exports = router;


router.post('/admin', passport.authenticate('jwt', { session: false }), asyncHandler(insertAdminReview));

async function insertAdminReview(req, res) {
  if (req.user.icAdmin) {
    let reviews = await reviewCtrl.insertReviews(req.body, req.user);
    res.json(reviews);
  } else {
    res.sendStatus(401);
  }
}