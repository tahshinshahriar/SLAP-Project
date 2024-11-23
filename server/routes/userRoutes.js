const express = require('express');
const { changePassword, requestPasswordReset, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/change-password', authMiddleware, changePassword);
router.post('/request-password-reset', requestPasswordReset);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
