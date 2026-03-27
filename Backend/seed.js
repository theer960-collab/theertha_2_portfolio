/**
 * Seed script - Populates MongoDB with sample data for Theertha's portfolio
 * Run: node seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Attendance = require('./models/Attendance');
const Skill = require('./models/Skill');
const Achievement = require('./models/Achievement');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/theertha_portfolio';

const skills = [
  { name: 'Python', level: 85, category: 'Technical', icon: '🐍' },
  { name: 'JavaScript', level: 78, category: 'Technical', icon: '⚡' },
  { name: 'HTML & CSS', level: 90, category: 'Technical', icon: '🎨' },
  { name: 'React.js', level: 70, category: 'Technical', icon: '⚛️' },
  { name: 'Node.js', level: 68, category: 'Technical', icon: '🟢' },
  { name: 'MongoDB', level: 65, category: 'Technical', icon: '🍃' },
  { name: 'Data Analysis', level: 75, category: 'Technical', icon: '📊' },
  { name: 'UI/UX Design', level: 72, category: 'Design', icon: '✏️' },
  { name: 'Communication', level: 88, category: 'Soft Skills', icon: '💬' },
  { name: 'Problem Solving', level: 82, category: 'Soft Skills', icon: '🧩' },
  { name: 'Team Leadership', level: 80, category: 'Soft Skills', icon: '🤝' },
];

const achievements = [
  {
    title: 'First Place – Hackathon 2024',
    description: 'Won first place at the university-level hackathon for building an AI-based student management system.',
    date: 'March 2024',
    category: 'Award',
    icon: '🥇',
    highlight: true
  },
  {
    title: 'Best Student Award',
    description: 'Recognized as the Best Student of the academic year for outstanding academic performance and leadership.',
    date: 'June 2023',
    category: 'Academic',
    icon: '🏆',
    highlight: true
  },
  {
    title: 'Web Development Certification',
    description: 'Completed the Full Stack Web Development certification from Coursera with distinction.',
    date: 'December 2023',
    category: 'Certification',
    icon: '📜',
    highlight: false
  },
  {
    title: 'Tech Club President',
    description: 'Led a team of 50+ students as President of the college Tech Club, organizing workshops and seminars.',
    date: '2023-2024',
    category: 'Extracurricular',
    icon: '👑',
    highlight: false
  },
  {
    title: 'Published Research Paper',
    description: 'Co-authored a research paper on Machine Learning applications in healthcare, published in a national journal.',
    date: 'January 2024',
    category: 'Academic',
    icon: '📄',
    highlight: true
  },
  {
    title: 'Python Programming Bootcamp',
    description: 'Completed an intensive 30-day Python programming bootcamp with a perfect score.',
    date: 'August 2023',
    category: 'Certification',
    icon: '🐍',
    highlight: false
  }
];

function calcPct(attended, total) {
  return total > 0 ? Math.round((attended / total) * 100) : 0;
}

const attendanceRecords = [
  { subject: 'Data Structures & Algorithms', attended: 42, total: 48, month: 'Jan–Mar 2024', semester: 'Semester 6', percentage: calcPct(42, 48) },
  { subject: 'Database Management Systems', attended: 40, total: 44, month: 'Jan–Mar 2024', semester: 'Semester 6', percentage: calcPct(40, 44) },
  { subject: 'Operating Systems', attended: 38, total: 46, month: 'Jan–Mar 2024', semester: 'Semester 6', percentage: calcPct(38, 46) },
  { subject: 'Computer Networks', attended: 35, total: 40, month: 'Jan–Mar 2024', semester: 'Semester 6', percentage: calcPct(35, 40) },
  { subject: 'Software Engineering', attended: 43, total: 48, month: 'Jan–Mar 2024', semester: 'Semester 6', percentage: calcPct(43, 48) },
  { subject: 'Machine Learning', attended: 30, total: 36, month: 'Jan–Mar 2024', semester: 'Semester 6', percentage: calcPct(30, 36) },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Attendance.deleteMany({}),
      Skill.deleteMany({}),
      Achievement.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Insert fresh data
    await Promise.all([
      Attendance.insertMany(attendanceRecords),
      Skill.insertMany(skills),
      Achievement.insertMany(achievements)
    ]);

    console.log(`✅ Seeded ${skills.length} skills`);
    console.log(`✅ Seeded ${achievements.length} achievements`);
    console.log(`✅ Seeded ${attendanceRecords.length} attendance records`);
    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
