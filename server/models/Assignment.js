const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to the Course model
    title: { type: String, required: true }, // Title of the assignment
    description: { type: String }, // Description of the assignment
    dueDate: { type: Date, required: true },
    instructions: { type: [String] } // Due date for the assignment
});

module.exports = mongoose.model('Assignment', assignmentSchema);
