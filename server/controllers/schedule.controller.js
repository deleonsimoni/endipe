const Schedule = require('../models/schedule.model');

module.exports = {
    listAllSchedules,
    insertSchedule,
    deleteSchedule
}

async function listAllSchedules() {
    return await Schedule.find()
        .sort({ createAt: -1 });
}

async function insertSchedule(schedule) {
    return await new Schedule(schedule).save();
}

async function deleteSchedule(id) {
    console.log(id);
    return await Schedule.findOneAndRemove({ _id: id });
}