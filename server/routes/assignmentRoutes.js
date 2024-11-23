const express = require('express');
const { createAssignment, submitAssignment, getAssignments } = require('../controllers/assignmentController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Route to create an assignment
router.post('/create', createAssignment);

// Route to submit an assignment with file upload
// router.post('/submit', authMiddleware, upload.single('file'), submitAssignment);

// Route to get assignments for a particular course
router.get('/:courseId', getAssignments);

module.exports = router;
