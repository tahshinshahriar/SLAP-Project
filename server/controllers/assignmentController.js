const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');
const User = require('../models/User');
const Course = require('../models/Course');

exports.createAssignment = async (req, res) => {
    const { courseCode, title, description, dueDate } = req.body;

    try {
        // Validate that the course code exists
        const course = await Course.findOne({ code: courseCode });
        console.log(course);
        const courseId = course._id;
        console.log(courseId);
        if (!course) {
            return res.status(400).json({ error: 'Invalid course code' });
        }

        // Create new assignment document
        const assignment = new Assignment({
            courseId,
            title,
            description,
            dueDate
        });

        await assignment.save();
        console.log(assignment);
        res.status(201).json({ assignment });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAssignments = async (req, res) => {
    const { courseId } = req.params;
    try {
       const assignments = await Assignment.find({ courseId });
       res.json(assignments);
    } catch (err) {
       res.status(500).json({ error: 'Server error' });
    }
};

// exports.getAssignmentsByCourse = async (req, res) => {
//     const { courseCode } = req.params;

//     try {
//         // Validate that the course code exists
//         const course = await Course.findOne({ code: courseCode });
//         if (!course) {
//             return res.status(400).json({ error: 'Invalid course code' });
//         }

//         // Find assignments for the given course code
//         const assignments = await Assignment.find({ courseCode });
//         res.status(200).json(assignments);
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };