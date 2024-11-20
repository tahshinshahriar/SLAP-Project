const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv').config();

exports.changePassword = async (req, res) => {
   const { oldPassword, newPassword } = req.body;

   try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.json({ message: 'Password updated successfully' });
   } catch (err) {
      res.status(500).json({ error: 'Server error' });
   }
};

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate a new temporary password
        const newPassword = crypto.randomBytes(6).toString('hex');

        // Hash the new password
        // const salt = await bcrypt.genSalt(10);
        user.password = newPassword;

        await user.save();
        console.log('User saved:', user); // Log the saved user

        // Send email with new password
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        console.log('Email transporter created'); // Log transporter creation

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            text: `Your password has been reset. Your new temporary password is: ${newPassword}\n\n
                   Please log in and change your password immediately.`,
        };
        console.log('Mail options set:', mailOptions); // Log mail options

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('Error sending email:', err); // Log email sending error
                return res.status(500).json({ message: 'Error sending email' });
            }
            console.log('Password reset email sent'); // Log successful email sending
            res.status(200).json({ message: 'Password reset email sent' });
        });
    } catch (err) {
        console.error('Server error:', err); // Log server error
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
