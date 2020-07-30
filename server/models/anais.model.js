const mongoose = require('mongoose');

const AnaisSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


module.exports = mongoose.model('Anais', AnaisSchema);
