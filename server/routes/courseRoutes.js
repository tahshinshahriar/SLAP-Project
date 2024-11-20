const express = require('express');
const router = express.Router();
const { getCourses, addCourse } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get courses
router.get('/courses', authMiddleware, getCourses);

// Route to add a coursez
router.post('/courses', authMiddleware, addCourse);

module.exports = router;
