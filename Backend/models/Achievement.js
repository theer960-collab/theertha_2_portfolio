const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Academic', 'Extracurricular', 'Certification', 'Award', 'Other'],
    default: 'Academic'
  },
  icon: {
    type: String,
    default: '🏆'
  },
  highlight: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
