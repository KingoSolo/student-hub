// models/Image.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
        unique: true,
    },
    path: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

const ImageModel = mongoose.model('Image', ImageSchema);

module.exports = ImageModel;