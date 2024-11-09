const bcrypt = require('bcryptjs');
const User = require('../models/User');

// User registration
exports.register = async (req, res) => {
    const {firstName, lastName, username, email, password, role } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user instance
        user = new User({
            firstName,
            lastName,
            username,
            email,
            password: await bcrypt.hash(password, 10), // Hash the password
            role
        });

        // Save the user to the database
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
