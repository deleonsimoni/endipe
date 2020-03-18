const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({


  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  titles: [],
  coordinator: [],
  startTime: {
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
  theme: {
    type: String,
  },
  date: {
    type: Date
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('AtividadeCultural', ScheduleSchema);
