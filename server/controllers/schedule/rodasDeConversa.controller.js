const RodasDeConversa = require('../../models/schedule/rodasDeConversa.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule,
  unsubscribeMinicurso,
  subscribeMinicurso
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
  return await RodasDeConversa.findAndUpdate(id, schedule);
}

async function deleteSchedule(id) {
  return await RodasDeConversa.findOneAndRemove({
    _id: id
  });

}

async function unsubscribeMinicurso(workId, userId) {
  return RodasDeConversa.findOneAndUpdate({
    _id: workId
  }, {
    $push: {
      'subscribers.userId': userId
    }
  });
}

async function subscribeMinicurso(workId, userId, email) {
  let userInsert = {
    userId: userId,
    userEmail: email
  }
  return RodasDeConversa.findOneAndUpdate({
    _id: workId
  }, {
    $pull: {
      'subscribers': userInsert
    }
  });
}
