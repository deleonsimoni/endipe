const Work = require('../models/work.model');

module.exports = {
  insertReviews
}


async function insertReviews(reviews, user) {

  let review = { userId: user._id, userEmail: user.email, review: reviews };
  await Work.findOneAndUpdate({ _id: reviews.workId }, { $set: { 'reviewAdmin': review } });

}
