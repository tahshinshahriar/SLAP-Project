const { default: mongoose } = require("mongoose");

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: True
    },

    courseCode:{
        type: String,
        required: True,
        unique: True
    },
    instructors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    }]
})

module.exports = mongoose.model('Course', CourseSchema);