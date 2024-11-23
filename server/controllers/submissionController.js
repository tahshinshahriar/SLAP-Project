const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');
const User = require('../models/User');

// Function to get the latest submission for a student
exports.getLatestSubmission = async (req, res) => {
    const studentSlapID = req.user.slapID; // Assuming the user ID is stored in req.user by the auth middleware

    try {
        const latestSubmission = await Submission.findOne({ studentSlapID })
            .sort({ submittedAt: -1 })
            .populate('assignmentId', 'title description dueDate');

        if (!latestSubmission) {
            return res.status(404).json({ error: 'No submissions found' });
        }

        res.status(200).json(latestSubmission);
    } catch (err) {
        console.error('Error fetching latest submission:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to get all submissions for an instructor
exports.getAllSubmissions = async (req, res) => {
    const instructorSlapID = req.user.slapID; // Assuming the user ID is stored in req.user by the auth middleware

    try {
        const assignments = await Assignment.find({ instructors: instructorSlapID });
        const assignmentIds = assignments.map(assignment => assignment._id);

        const submissions = await Submission.find({ assignmentId: { $in: assignmentIds } })
            .populate('assignmentId', 'title')
            .populate('studentSlapID', 'name email');

        res.status(200).json(submissions);
    } catch (err) {
        console.error('Error fetching submissions:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to submit an assignment
exports.submitAssignment = async (req, res) => {
    const { assignmentId } = req.body;
    const studentSlapID = req.user.slapID; // Assuming the user ID is stored in req.user by the auth middleware
    const file = req.file; // The uploaded file

    try {
        // Check if the assignment exists
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        // Create a new submission
        const newSubmission = new Submission({
            assignmentId,
            studentSlapID,
            submission: file.path, // Save the file path
            submittedAt: new Date()
        });

        // Save the submission to the database
        await newSubmission.save();
        res.status(201).json(newSubmission);
    } catch (err) {
        console.error('Error submitting assignment:', err);
        res.status(500).json({ error: 'Server error' });
    }
};