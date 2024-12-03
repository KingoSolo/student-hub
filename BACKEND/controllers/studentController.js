const Student = require('../models/student');
const {School,Course } = require('../models/schoolCourse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
})
exports.registerStudent = async (req, res) => {
try {
    const { email, password, firstName, lastName, studyProgram } = req.body;

    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const newStudent = new Student({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Save student to database
    await newStudent.save();

    return res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error registering student' });
  }
};
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if student exists
    const student = await Student.findOne({ email });
    console.log(student);
    if (!student) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token (optional)
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({ message: 'Login successful', token, data: student });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error logging in' });
  }
};
// Forgot Password Function
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    student.resetPasswordToken = resetToken;
    student.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await student.save();

    const resetUrl = `https://student-hub-vd8o.onrender.com/resetPassword/${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`,
    });

    return res.json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error processing request' });
  }
};

// Reset Password Function
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const student = await Student.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!student) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    student.password = hashedPassword;
    student.resetPasswordToken = undefined;
    student.resetPasswordExpires = undefined;

    await student.save();

    return res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error resetting password' });
  }
};
// Edit Profile function
exports.editProfile = async (req, res) => {
  const { firstName, lastName, studyProgram } = req.body;
  const userId = req.student.id; // Ensure this matches how you set the authenticated user ID

  try {
      const student = await Student.findById(userId);
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }

      // Update the student's profile
      student.firstName = firstName;
      student.lastName = lastName;
      student.studyProgram = studyProgram;

      await student.save();

      return res.json({ message: 'Profile updated successfully' });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating profile' });
  }
};
exports.createSchoolAndCourse = async (req, res) => {
  try {
    const { schoolName, courseName } = req.body; // Destructure the correct fields

    // Check if school already exists
    const existingSchool = await School.findOne({ name: schoolName });
    if (existingSchool) {
      return res.status(400).json({ message: 'School already exists' });
    }

    // Create new school
    const newSchool = new School({ name: schoolName });
    await newSchool.save();

    // Create new course associated with the new school
    const newCourse = new Course({
      name: courseName,
      school: newSchool._id // Associate with the newly created school
    });
    await newCourse.save();

    return res.json({ message: 'School and course created successfully' });
  } catch (err) {
    console.error('Error details:', err); // Log the error details
    return res.status(500).json({ message: 'Error creating school and course', error: err.message }); // Include error message in response
  }
};

exports.selectedSchoolAndCourse = async (req, res) => {
  const school = req.body.school;
  const course = req.body.course;

  // Log the student object
  console.log(req.student); // This should show the authenticated student object

  // Validate the inputs
  if (!school || !course) {
    return res.status(400).json({ error: 'School and course are required' });
  }

  // Ensure req.student is defined
  if (!req.student) {
    return res.status(401).json({ error: 'User  not authenticated' });
  }

  // Proceed to update the user's school and course
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.student._id, {
      school: school,
      course: course,
    }, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json({ message: 'School and course updated successfully' });
  } catch (err) {
    console.error("Database update error:", err);
    return res.status(500).json({ error: 'Error updating school and course', details: err.message });
  }
};
exports