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
  typeWork: {
    type: Number
  },
  axisId: {
    type: Number
  },
  pathS3DOC: {
    type: String
  },
  pathS3PDF: {
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