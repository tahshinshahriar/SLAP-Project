const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourses = async (req, res) => {
    try {
        console.log('Fetching courses for user:', req.user.slapID); // Log user slapID
        const courses = await Course.find({
            $or: [{ students: req.user.slapID }, { instructors: req.user.slapID }]
        });
        console.log('Courses found:', courses); // Log found courses
        res.json(courses);
    } catch (err) {
        console.error('Error fetching courses:', err); // Log error
        res.status(500).json({ error: 'Server error' });
    }
};

exports.addCourse = async (req, res) => {
    const { title, code, description, startDate, endDate, instructorSlapIDs, studentSlapIDs } = req.body;
    console.log('Adding course with data:', req.body); // Log request body

    try {
        // Validate that instructor and student slapIDs exist in the User collection
        const instructors = await User.find({ slapID: { $in: instructorSlapIDs } });
        const students = await User.find({ slapID: { $in: studentSlapIDs } });
        console.log('Instructors found:', instructors); // Log found instructors
        console.log('Students found:', students); // Log found students

        // Create new course document
        const course = new Course({
            title,
            code,
            description,
            startDate,
            endDate,
            instructors: instructorSlapIDs,
            students: studentSlapIDs
        });

        await course.save();
        console.log('Course saved:', course); // Log saved course
        res.status(201).json(course);
    } catch (err) {
        console.error('Error adding course:', err); // Log error
        res.status(500).json({ error: 'Server error' });
    }
};
