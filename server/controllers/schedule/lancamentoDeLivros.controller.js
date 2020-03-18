const LancamentoDeLivros = require('../../models/schedule/lancamentoDeLivros.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  return await LancamentoDeLivros.find({
      date: date
    })
    .sort({
      date: -1
    });
}

async function insertSchedule(schedule) {
  return await new LancamentoDeLivros(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await LancamentoDeLivros.findAndUpdate(id, schedule);
}

async function deleteSchedule(id) {
  return await LancamentoDeLivros.findOneAndRemove({
    _id: id
  });

}
