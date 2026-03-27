const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// GET /api/attendance - Get all attendance records
router.get('/', async (req, res) => {
  try {
    const records = await Attendance.find().sort({ subject: 1 });
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/attendance - Add an attendance record
router.post('/', async (req, res) => {
  try {
    const { subject, attended, total, month, semester } = req.body;

    if (!subject || attended === undefined || total === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Subject, attended, and total are required'
      });
    }

    const record = new Attendance({ subject, attended, total, month, semester });
    await record.save();

    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/attendance/:id - Update attendance record
router.put('/:id', async (req, res) => {
  try {
    const { attended, total, month, semester } = req.body;
    const record = await Attendance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    if (attended !== undefined) record.attended = attended;
    if (total !== undefined) record.total = total;
    if (month) record.month = month;
    if (semester) record.semester = semester;
    await record.save();

    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/attendance/:id
router.delete('/:id', async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
