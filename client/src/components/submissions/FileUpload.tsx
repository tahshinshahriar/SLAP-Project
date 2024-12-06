import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

interface Props {
  assignmentId: string;
}

const FileUpload: React.FC<Props> = ({ assignmentId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignmentId", assignmentId);

    try {
      const response = await axios.post("/submit", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);

      // Redirect to the courses page after a short delay
      setTimeout(() => {
        navigate("/home/courses");
      }, 1500); 
    } catch (error) {
      console.error("Error submitting file:", error);
      setMessage("Failed to upload file. Please try again.");
    }
  };

  return (
    <div>
      <h3>Submit Assignment</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".pdf,.txt" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
