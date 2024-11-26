import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateAndEditCourse.scss";

const CreateCourse: React.FC = () => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [instructorID, setInstructorID] = useState("");
  const [studentIDs, setStudentIDs] = useState<string>(""); // Accept as a comma-separated string
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = {
      courseCode,
      courseName,
      description,
      instructorID,
      studentIDs: studentIDs.split(",").map((email) => email.trim()),
    };

    try {
      const response = await axios.post("/courses", courseData, {
        withCredentials: true,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Course created successfully!");
        navigate("/home/admin-dash");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create course. Please try again.");
    }
  };

  return (
    <div className="create-course">
      <h1>Create Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Code:</label>
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructor Email:</label>
          <input
            type="email"
            value={instructorID}
            onChange={(e) => setInstructorID(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Student Emails (comma-separated):</label>
          <input
            type="text"
            value={studentIDs}
            onChange={(e) => setStudentIDs(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
