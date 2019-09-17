const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: ObjectId,
    required: true    
  }
});


module.exports = mongoose.model('News', NewsSchema);
