const express = require('express');
const { registerStudent, loginStudent, selectedSchoolAndCourse, createSchoolAndCourse,forgotPassword,resetPassword,editProfile} = require('../controllers/studentController');
const authenticateStudent = require('../middleware/authenticateStudent'); 
const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.post('/createCourse',createSchoolAndCourse);
router.post('/submitSchoolAndCourses',authenticateStudent,selectedSchoolAndCourse);
router.post('/forgotPassword',forgotPassword);
router.post('/resetPassword/:token', resetPassword);
router.put('/editProfile', authenticateStudent, editProfile);
module.exports = router;

