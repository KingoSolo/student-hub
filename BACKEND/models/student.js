const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, default: null },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;

