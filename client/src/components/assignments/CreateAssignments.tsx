import React, { useState } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import "./CreateAssignments.scss";

const CreateAssignment: React.FC = () => {
  const [courseCode, setCourseCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [fileType, setFileType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const assignmentData = {
      courseCode,
      title,
      description,
      dueDate,
      instructions: {
        fileName,
        filePath,
        fileType,
      },
    };

    try {
      const response = await axios.post("/create-assignment", assignmentData);
      if (response) {
        toast.success(response.data.message)
        navigate("/home/courses");
      }
      console.log(response.data);
    } catch (error) {
        console.error("Error creating assignment:", error);
        toast.error("Failed to create assignment. Please try again.")
    }
  };

  return (
    <div className="create-assignment__container">
      <h1>Create Assignment</h1>
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
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <h3>Instructions</h3>
        <div>
          <label>File Name:</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>File Path:</label>
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            required
          />
        </div>
        <div>
          <label>File Type:</label>
          <input
            type="text"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Assignment</button>
      </form>
    </div>
  );
};

export default CreateAssignment;
