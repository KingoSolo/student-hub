const express = require('express');
const router = express.Router();
const { uploadResource, uploadYouTubeLink, uploadImage, searchPage, getAllResourcesData } = require('../controllers/resourceController');
const multer = require('multer');
const authenticateStudent = require('../middleware/authenticateStudent'); 
const path = require('path');

// Use memory storage for documents...
const memoryStorage = multer.memoryStorage();
const uploadDoc = multer({ storage: memoryStorage });

// Use disk storage for images
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the directory to save the uploaded images
  },
  filename: (req, file, cb) => {
      // Create a unique filename using the original name and current timestamp
      cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadImageMiddleware = multer({ storage: diskStorage });

// Apply authentication middleware to this route
router.post('/uploadDoc', authenticateStudent, uploadDoc.single('file'), uploadResource);
router.post('/uploadYouTubeLink', uploadYouTubeLink);
router.post('/uploadImage', uploadImageMiddleware.single('image'), uploadImage);
router.get('/search', searchPage);
router.get('/getDocs',getAllResourcesData);

module.exports = router;