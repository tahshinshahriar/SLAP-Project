const express = require('express');
const { createAssignment, submitAssignment, getAssignmentsByCourse } = require('../controllers/assignmentController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Route to create an assignment
router.post('/create', authMiddleware, createAssignment);

// Route to submit an assignment with file upload
router.post('/submit', authMiddleware, upload.single('file'), submitAssignment);

// Route to get assignments for a particular course
router.get('/course/:courseCode', authMiddleware, getAssignmentsByCourse);

module.exports = router;
