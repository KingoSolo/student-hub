const Resource = require('../models/resource');
const YouTubeLinkModel = require('../models/youTubeLink');
const ImageModel = require('../models/image');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save the uploaded images
  },
  filename: (req, file, cb) => {
    // Create a unique filename using the original name and current timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });
exports.uploadResource = async (req, res) => {
  try {
    console.log("body", req.body)
    const documentResults = await Resource.find().populate('uploader', 'firstName lastName');
    const { title } = req.body;
    // const file = req.file;

    if (!req.file) {
      console.log("I didn't get file, request : ", req.file)
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create new resource
    const newResource = new Resource({
      documents: documentResults.uploader,
      title: title,
      file: req.file.buffer.toString('base64'), // Store file as base64 for simplicity
      fileSize: req.file.size,
      uploader: req.student._id,
      
    });

    // Save resource to database
    await newResource.save();

    return res.json({ message: 'Resource uploaded successfully', data: newResource });


  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error uploading resource' });
  }
};

const isValidYouTubeUrl = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&\n]{11})$/;
  return regex.test(url);
};

exports.uploadYouTubeLink = async (req, res) => {
  const { youtubeLink } = req.body;

  console.log('Received YouTube link:', youtubeLink); // Log the input

  // Validate the YouTube link
  if (!isValidYouTubeUrl(youtubeLink)) {
      return res.status(400).json({ message: 'Invalid YouTube link format.' });
  }

  try {
      // Logic to save the YouTube link to the database
      const newLink = new YouTubeLinkModel({ link: youtubeLink });
      await newLink.save();

      return res.json({ message: 'YouTube link uploaded successfully.' });
  } catch (err) {
      console.error('Error uploading YouTube link:', err);
      return res.status(500).json({ message: 'Error uploading YouTube link', error: err.message });
  }
};
// Create an upload function
exports.uploadImage = async (req, res) => {
  // Check if the file was uploaded
  if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
  }

  // Log the req.file object for debugging
  console.log('Uploaded file:', req.file);

  // Create a new image document
  const newImage = new ImageModel({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
  });

  // Log the newImage object to see what is being saved
  console.log('New Image Document:', newImage);

  try {
      // Save the image metadata to the database
      await newImage.save();
      return res.status(200).json({
          message: 'Image uploaded successfully.',
          file: req.file,
          image: newImage, // Return the saved image metadata
      });
  } catch (error) {
      return res.status(500).json({ message: 'Error saving image metadata.', error });
  }
};
// Create a function to retrieve all resources, YouTube links, and images
exports.getAllResourcesData = async (req, res) => {
  try {
    // Retrieve all resources/documents
    const documentResults = await Resource.find();
    const youtubeLinkResults = await YouTubeLinkModel.find();
    const imageResults = await ImageModel.find();

    // Combine all results into a single response object
    const results = {
      documents: documentResults,
      youtubeLinks: youtubeLinkResults,
      images: imageResults,
    };

    // Send combined data as response
    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving resources data:', error);
    res.status(500).json({ message: 'Error retrieving resources data', error: error.message });
  }
};
//create a search function
exports.searchPage = async (req, res) => {
  try {
    const { query } = req.query; // Assumes search term is provided as query parameter

    // Search documents by title or description
    const documentResults = await Resource.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    // Search YouTube links by URL
    const youtubeLinkResults = await YouTubeLinkModel.find({
      link: { $regex: query, $options: 'i' }
    });

    // Search images by original name or filename
    const imageResults = await ImageModel.find({
      $or: [
        { originalName: { $regex: query, $options: 'i' } },
        { filename: { $regex: query, $options: 'i' } }
      ]
    });

    // Combine results into a single response
    const results = {
      documents: documentResults,
      youtubeLinks: youtubeLinkResults,
      images: imageResults,
    };

    res.json(results);
  } catch (error) {
    console.error('Error searching resources:', error);
    res.status(500).json({ message: 'Error searching resources', error: error.message });
  }
};