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
  date: {
    type: String
  },
  axis: {
    type: String
  },
  qtdSubscribers: {
    type: String,
  },
  subscribers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },
    userEmail: {
      type: String
    },
  }],
  createAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('RodasDeConversa', ScheduleSchema);
