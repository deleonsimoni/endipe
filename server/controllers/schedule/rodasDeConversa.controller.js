const RodasDeConversa = require('../../models/schedule/rodasDeConversa.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  return await RodasDeConversa.find({
      date: date
    })
    .sort({
      date: -1
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
