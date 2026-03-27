const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true
  },
  attended: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100
  },
  month: {
    type: String,
    trim: true
  },
  semester: {
    type: String,
    trim: true,
    default: 'Current'
  }
}, { timestamps: true });

// Auto-calculate percentage before saving
attendanceSchema.pre('save', function (next) {
  if (this.total > 0) {
    this.percentage = Math.round((this.attended / this.total) * 100);
  } else {
    this.percentage = 0;
  }
  next();
});

module.exports = mongoose.model('Attendance', attendanceSchema);
