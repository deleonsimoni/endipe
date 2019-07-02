const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  itsOn: {
    type: Boolean,
    default: false
    },
  createdAt: {
    type: Date,
    default: Date.now
  }});


module.exports = mongoose.model('Device', DeviceSchema);
