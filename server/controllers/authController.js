// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User login
exports.login = async (req, res) => {
    console.log(`Reqbody: ${JSON.stringify(req.body)}`);
    const { slapID, password } = req.body;

    try {
        const user = await User.findOne({ slapID });
        console.log(`User found: ${JSON.stringify(user)}`);
        if (!user) {
            console.log('Invalid slapID');
            return res.json({ error: 'Invalid Slap ID' });
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
