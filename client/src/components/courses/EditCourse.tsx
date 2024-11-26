import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateAndEditCourse.scss";

const EditCourse: React.FC = () => {
  const [courseCode, setCourseCode] = useState("");
  const [addStudents, setAddStudents] = useState<string>(""); // Accept comma-separated emails
  const [removeStudents, setRemoveStudents] = useState<string>(""); // Accept comma-separated emails
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Prepare the data
    const updateData = {
      courseCode,
      addStudents: addStudents
        ? addStudents.split(",").map((email) => email.trim())
        : [], // Default to empty array if the field is empty
      removeStudents: removeStudents
        ? removeStudents.split(",").map((email) => email.trim())
        : [], // Default to empty array if the field is empty
    };
  
    // Debugging the prepared data
    console.log("This is the data being sent: ", updateData);
  
    try {
      // Send the request
      const response = await axios.put("/update-course", updateData, {
        withCredentials: true,
      });
  
      // Handle response
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(response.data.message || "Course updated successfully!");
        navigate("/home/admin-dash");
      }
    } catch (err) {
      console.error("Error updating course:", err);
      toast.error("Failed to update course. Please try again.");
    }
  };  

  return (
    <div className="edit-course">
      <h1>Edit Course</h1>
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
          <label>Student Emails to Add (comma-separated):</label>
          <input
            type="text"
            value={addStudents}
            onChange={(e) => setAddStudents(e.target.value)}
          />
        </div>
        <div>
          <label>Student Emails to Remove (comma-separated):</label>
          <input
            type="text"
            value={removeStudents}
            onChange={(e) => setRemoveStudents(e.target.value)}
          />
        </div>
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default EditCourse;
