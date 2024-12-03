const mongoose = require('mongoose');

const YouTubeLinkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const YouTubeLinkModel = mongoose.model('YouTubeLink', YouTubeLinkSchema);

module.exports = YouTubeLinkModel;