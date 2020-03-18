const Encerramento = require('../../models/schedule/encerramento.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  return await Encerramento.find({
      date: date
    })
    .sort({
      date: -1
    });
}

async function insertSchedule(schedule) {
  return await new Encerramento(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await Encerramento.findAndUpdate(id, schedule);
}

async function deleteSchedule(id) {
  return await Encerramento.findOneAndRemove({
    _id: id
  });

}
