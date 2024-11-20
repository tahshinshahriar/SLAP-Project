const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');
const User = require('../models/User');
const Course = require('../models/Course');

exports.submitAssignment = async (req, res) => {
    const { assignmentId, studentSlapID } = req.body;
    const submission = req.file ? req.file.path : null;

    try {
        // Validate that the assignment exists
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(400).json({ error: 'Invalid assignment ID' });
        }

        // Validate that the student slapID exists
        const student = await User.findOne({ slapID: studentSlapID });
        if (!student) {
            return res.status(400).json({ error: 'Invalid student slapID' });
        }

        // Create new submission document
        const newSubmission = new Submission({
            assignmentId,
            studentSlapID,
            submission,
            submittedAt: Date.now()
        });

        await newSubmission.save();
        res.status(201).json({ submission: newSubmission });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createAssignment = async (req, res) => {
    const { courseCode, title, description, dueDate } = req.body;

    try {
        // Validate that the course code exists
        const course = await Course.findOne({ code: courseCode });
        if (!course) {
            return res.status(400).json({ error: 'Invalid course code' });
        }

        // Create new assignment document
        const assignment = new Assignment({
            courseCode,
            title,
            description,
            dueDate
        });

        await assignment.save();
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

exports.getAssignmentsByCourse = async (req, res) => {
    const { courseCode } = req.params;

    try {
        // Validate that the course code exists
        const course = await Course.findOne({ code: courseCode });
        if (!course) {
            return res.status(400).json({ error: 'Invalid course code' });
        }

        // Find assignments for the given course code
        const assignments = await Assignment.find({ courseCode });
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};