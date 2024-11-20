// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const { register } = require("../controllers/regController")
const { getCourses, addCourse } = require('../controllers/courseController');

// Routes
router.post('/register', register)

router.post('/login', login);

router.post('/logout', logout);





module.exports = router;
