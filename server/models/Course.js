const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    students: { type: String}, // Store slapID instead of ObjectId
    instructors: [{ type: String, ref: 'User' }], // Store slapID instead of ObjectId
});

module.exports = mongoose.model('Course', courseSchema);
