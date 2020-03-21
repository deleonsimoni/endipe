const Minicurso = require('../../models/schedule/minicurso.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule,
  unsubscribeMinicurso,
  subscribeMinicurso
}

async function listSchedule(date) {
  return await Minicurso.find({
      date: date
    })
    .sort({
      date: -1
    });
}

async function insertSchedule(schedule) {
  return await new Minicurso(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await Minicurso.findAndUpdate(id, schedule);
}

async function deleteSchedule(id) {
  return await Minicurso.findOneAndRemove({
    _id: id
  });

}

async function unsubscribeMinicurso(workId, userId) {
  return Minicurso.findOneAndUpdate({
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
  return Minicurso.findOneAndUpdate({
    _id: workId
  }, {
    $pull: {
      'subscribers': userInsert
    }
  });
}
