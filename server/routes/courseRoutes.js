const express = require('express');
const router = express.Router();
const { getCourses, addCourse } = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get courses
router.get('/courses', authMiddleware, getCourses);

// Route to add a courses
router.post('/courses', addCourse);

module.exports = router;
