const RodasDeConversa = require('../../models/schedule/rodasDeConversa.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule,
  unsubscribeRodadeConversa,
  subscribeRodadeConversa
}

async function listSchedule(date) {
  return await RodasDeConversa.find({
      date: date
    })
    .sort({
      startTime: 1
    });
}

async function insertSchedule(schedule) {
  return await new RodasDeConversa(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await RodasDeConversa.findOneAndUpdate(id, schedule, {
    upsert: true
  });
}

async function deleteSchedule(id) {
  return await RodasDeConversa.findOneAndRemove({
    _id: id
  });

}

async function unsubscribeRodadeConversa(workId, userId) {
  return RodasDeConversa.findOneAndUpdate({
    _id: workId
  }, {
    $pull: {
      subscribers: {
        userId: userId
      }
    }
  }, {
    new: true
  });
}

async function subscribeRodadeConversa(workId, userId, email) {
  let userInsert = {
    userId: userId,
    userEmail: email
  }

  return RodasDeConversa.findOneAndUpdate({
    _id: workId
  }, {
    $addToSet: {
      'subscribers': userInsert
    }
  }, {
    new: true
  });
}
