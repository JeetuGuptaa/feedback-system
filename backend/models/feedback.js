const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },

  category: {
    type: String,
    enum: ['suggestion', 'bug report', 'feature request', 'other'],
    default: 'other',
    index: true,   
  },

  text: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,   
});


FeedbackSchema.index({ createdAt: -1 });
FeedbackSchema.index({ category: 1, createdAt: -1 });

const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;