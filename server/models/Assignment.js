const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    courseCode: { type: String, ref: 'Course', required: true }, // Use course code instead of course ID
    title: { type: String, required: true }, // Title of the assignment
    description: { type: String }, // Description of the assignment
    dueDate: { type: Date, required: true } // Due date for the assignment
});

module.exports = mongoose.model('Assignment', assignmentSchema);
