const jwt = require('jsonwebtoken'); // Ensure you have this import
const Student = require('../models/student'); // Adjust the path as necessary

const authenticateStudent = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    console.log('Decoded token:', decoded); // Log decoded token for debugging

    req.student = await Student.findById(decoded.id); // Fetch student from the database
    if (!req.student) {
      return res.status(404).json({ message: 'Student not found' }); // Handle case where student does not exist
    }

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error('Authentication error:', err); // Log the error for debugging
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateStudent;