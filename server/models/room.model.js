const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: Buffer
  },
  icon: {
    type: String
  },
  devices:[
    {type: mongoose.Schema.Types.ObjectId, ref: 'Device'}
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Room', RoomSchema);
