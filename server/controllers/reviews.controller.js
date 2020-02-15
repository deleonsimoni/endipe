const Work = require('../models/work.model');

module.exports = {
  insertReviews,
  getWorks,
  insertReviewerReview
}


async function insertReviews(reviews, user) {

  let review = { userId: user._id, userEmail: user.email, review: reviews };
  await Work.findOneAndUpdate({ _id: reviews.workId }, { $set: { 'reviewAdmin': review } });

}

async function insertReviewerReview(reviews, user) {

  let review = { userId: user._id, userEmail: user.email, review: reviews };
  await Work.findOneAndUpdate({ _id: reviews.workId }, { $set: { 'reviewReviewer': review } });

}


async function getWorks(user) {
  return await Work.find({ "reviewers.userId": user._id });
}
