const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

const School = mongoose.model('School', schoolSchema);

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = { School, Course };