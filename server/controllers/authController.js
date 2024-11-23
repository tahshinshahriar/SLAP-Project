// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User login
exports.login = async (req, res) => {
    console.log(`Reqbody: ${JSON.stringify(req.body)}`);
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(`User found: ${JSON.stringify(user)}`);
        if (!user) {
            console.log('Invalid email');
            return res.json({ error: 'Invalid Email Address' });
        }

        console.log(`Password from request: ${password}`);
        console.log(`Hashed password from DB: ${user.password}`);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`Password match: ${isMatch}`);
        if (!isMatch) {
            console.log('Invalid password');
            return res.json({ error: 'Invalid Password' });
        }

        const token = jwt.sign(
            { userId: user._id, slapID: user.slapID, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, message: 'Logged in successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};


exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.userId; 

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }
       
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).json({ error: 'Server error' });
    }
};