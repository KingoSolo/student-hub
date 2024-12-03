const jwt = require('jsonwebtoken');
const Student = require('../models/student'); // Adjust the path as necessary

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' }); // No token provided
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' }); // Invalid token
    }

    try {
      // Fetch the student from the database using the ID from the decoded token
      const student = await Student.findById(decoded._id);
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' }); // Student not found
      }

      req.user = student; // Attach student info to the request
      next(); // Proceed to the next middleware
    } catch (dbErr) {
      console.error('Database error:', dbErr);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });
};

module.exports = authenticateToken;