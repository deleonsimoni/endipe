const mongoose = require('mongoose');

const WorkSchema = new mongoose.Schema({

  protocol: {
    type: Number
  },
  title: {
    type: String
  },
  modalityId: {
    type: Number
  },
  axisId: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  pathS3DOC: {
    type: String
  },
  pathS3PDF: {
    type: String
  },
  mainAuthor: {
    type: String
  },
  authors: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    userEmail: {
      type: String
    }
  }],
}, {
  versionKey: false
});


module.exports = mongoose.model('Work', WorkSchema);