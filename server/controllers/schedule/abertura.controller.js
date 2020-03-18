const Abertura = require('../../models/schedule/abertura.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  return await Abertura.find({
      date: date
    })
    .sort({
      date: -1
    });
}

async function insertSchedule(schedule) {
  return await new Abertura(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await Abertura.findAndUpdate(id, schedule);
}

async function deleteSchedule(id) {
  return await Abertura.findOneAndRemove({
    _id: id
  });

}
