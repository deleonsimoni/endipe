const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    axis: {
        type: String
    },
    work: {
        title: String,
        modalityId: String
    },
    day: {
        type: String
    },
    hour: {
        type: String
    },
    room: {
        type: String
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);