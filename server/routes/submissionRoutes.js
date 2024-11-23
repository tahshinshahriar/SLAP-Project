const express = require('express');
const { getLatestSubmission, getAllSubmissions, submitAssignment } = require('../controllers/submissionController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Route to get the latest submission for a student
router.get('/latest', authMiddleware, getLatestSubmission);

// Route to get all submissions for an instructor
router.get('/all', authMiddleware, getAllSubmissions);

// Route to submit an assignment
router.post('/submit', authMiddleware, submitAssignment);

module.exports = router;