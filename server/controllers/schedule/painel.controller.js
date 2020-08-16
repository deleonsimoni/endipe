const Painel = require('../../models/schedule/painel.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  return await Painel.find({
      date: date
    })
    .sort({
      startTime: 1
    });
}

async function insertSchedule(schedule) {
  return await new Painel(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await Painel.findOneAndUpdate({ _id: id }, schedule);
}

async function deleteSchedule(id) {
  return await Painel.findOneAndRemove({
    _id: id
  });

}
