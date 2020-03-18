const Simposio = require('../../models/schedule/simposio.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  return await Simposio.find({
      date: date
    })
    .sort({
      date: -1
    });
}

async function insertSchedule(schedule) {
  return await new Simposio(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await Simposio.findAndUpdate(id, schedule);
}

async function deleteSchedule(id) {
  return await Simposio.findOneAndRemove({
    _id: id
  });

}
