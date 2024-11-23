const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration
exports.register = async (req, res) => {
    const { slapID, name, email, password, role } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ slapID });
        if (user) {
            return res.status(400).json({ message: 'User with this SlapID already exists' });
        }

        // Check if the email already exists
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create a new user instance with plain password (middleware will hash it)
        user = new User({
            slapID,
            name,
            email,
            password,
            role
        });

        // Save the user to the database (middleware will hash the password)
        await user.save();

        // Generate a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
