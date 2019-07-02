const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  rooms:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'Room'}
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('House', HouseSchema);
