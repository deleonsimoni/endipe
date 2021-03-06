const Poster = require('../../models/schedule/poster.model');

module.exports = {
  listSchedule,
  insertSchedule,
  updateSchedule,
  deleteSchedule
}

async function listSchedule(date) {
  return await Poster.find({
      'dates.date': { $in: date }
    })
    .sort({
      startTime: 1
    });
}

async function insertSchedule(schedule) {
  return await new Poster(schedule).save();
}

async function updateSchedule(id, schedule) {
  return await Poster.findOneAndUpdate({ _id: id }, schedule);
}

async function deleteSchedule(id) {
  return await Poster.findOneAndRemove({
    _id: id
  });

}
