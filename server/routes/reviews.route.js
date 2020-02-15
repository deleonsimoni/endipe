const express = require('express');
const passport = require('passport');
const reviewCtrl = require('../controllers/reviews.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();
module.exports = router;


router.post('/admin', passport.authenticate('jwt', { session: false }), asyncHandler(insertAdminReview));
router.post('/reviewer', passport.authenticate('jwt', { session: false }), asyncHandler(insertReviewerReview));

router.get('/getWorks', passport.authenticate('jwt', { session: false }), asyncHandler(getWorks));




async function insertAdminReview(req, res) {
  if (req.user.icAdmin) {
    let reviews = await reviewCtrl.insertReviews(req.body, req.user);
    res.json(reviews);
  } else {
    res.sendStatus(401);
  }
}

async function insertReviewerReview(req, res) {
  if (req.user.reviewer) {
    let reviews = await reviewCtrl.insertReviewerReview(req.body, req.user);
    res.json(reviews);
  } else {
    res.sendStatus(401);
  }
}


async function getWorks(req, res) {
  if (req.user.reviewer) {
    let works = await reviewCtrl.getWorks(req.user);
    res.json(works);
  } else {
    res.sendStatus(401);
  }
}