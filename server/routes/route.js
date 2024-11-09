// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const { register } = require("../controllers/regController")
// Routes
router.post('/register', register)

router.post('/login', login);

router.post('/logout', logout);

router.post('/courses', courses)



module.exports = router;
