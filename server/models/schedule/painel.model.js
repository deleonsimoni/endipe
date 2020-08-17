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
  axis: {
    type: String
  },
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
    monitor: {
      email: String
    },
    mediator: {
      email: String
    },
    linkZoom: {
      type: String
    },
    linkAudio: {
      type: String
    },
    linkLibras: {
      type: String
    }
  },
  pdf: {
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
  authors: {
    type: String
  },
  resumePropose: {
    type: String
  },
  date: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Painel', ScheduleSchema);
