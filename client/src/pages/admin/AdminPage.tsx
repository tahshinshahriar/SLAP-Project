import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPage.scss";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users", { withCredentials: true });
        setUsers(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load users. Please try again.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRegisterUser = () => {
    navigate("/home/register-user");
  };

  const handleCreateCourse = () => {
    navigate("/home/create-course");
  };

  const handleEditCourse = () => {
    navigate("/home/edit-course");
  };


  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="buttons__container">
        <button className="register-button" onClick={handleRegisterUser}>
          Register User
        </button>
        <button className="create-course-button" onClick={handleCreateCourse}>
          Create Course
        </button>
        <button className="edit-course-button" onClick={handleEditCourse}>
          Edit Course
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
