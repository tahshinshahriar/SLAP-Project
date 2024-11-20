const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true }, // Reference to the assignment
    studentSlapID: { type: String, ref: 'User', required: true }, // Use slapID instead of student ID
    submission: { type: String, required: true }, // This could be a URL or file path
    submittedAt: { type: Date, default: Date.now },
    grade: { type: Number, min: 0, max: 100 }, // Grade for the assignment
    feedback: { type: String } // Feedback for the assignment
});

module.exports = mongoose.model('Submission', submissionSchema);