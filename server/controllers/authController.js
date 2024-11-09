// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User logout (For simplicity, in JWT-based auth, logout is managed client-side)
exports.logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};
