const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({


  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  work: {
    type: mongoose.Schema.Types.ObjectId
  },
  workTitle: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  place: {
    type: String,
  },
  address: {
    type: String,
  },
  qtdSubscribers: {
    type: String,
  },
  subscribers: [{
    type: mongoose.Schema.Types.ObjectId
  }],

  date: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Minicurso', ScheduleSchema);
