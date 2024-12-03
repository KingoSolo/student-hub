const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  category: { type: String, required: false },
  file: { type: String, required: false },
  fileSize: { type: Number, required: false },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  timestamps: {type: Date, default: Date.now}
}
);

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;

