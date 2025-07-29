// models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming there is a User model, adjust if necessary
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  dateSubmitted: {
    type: Date,
    default: Date.now
  }
});

// Check if the model already exists in mongoose, to prevent overwriting
const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);
module.exports = Result;
