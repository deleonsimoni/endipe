const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({


  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  titles: [],
  coordinators: [{
    name: String,
    icCoordinator: {
      type: Boolean,
      default: false
    }
  }],
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
  virtual: {
    linkYoutube: {
      type: String
    },
    linkAudio: {
      type: String
    },
    linkLibras: {
      type: String
    }
  },
  theme: {
    type: String,
  },
  date: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Encerramento', ScheduleSchema);
