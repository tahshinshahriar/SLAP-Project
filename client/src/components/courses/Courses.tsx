import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Messages from "../messages/Messages";
import axios from "axios";
import { UserContext } from "../../../context/userContext"; // Assuming UserContext is set up to provide user info
import "./Courses.scss";

interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading user...</div>;
  }

  const { user } = userContext; 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/show-courses", { withCredentials: true });
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, [courses]); 

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="courses__container">
      <div className="course__content__container">
        <h1>Courses</h1>
        {courses.map((course) => (
          <div key={course._id} className="course__content">
            {user?.role === "instructor" ? (
              <Link to={`/home/courses/${course._id}/create-assignment`}>
                <p>{course.courseCode} - {course.courseName} (Create Assignment)</p>
              </Link>
            ) : (
              <Link to={`/home/courses/${course._id}/assignments`}>
                <p>{course.courseCode} - {course.courseName} (View Assignments)</p>
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="msg__container">
        <Messages />
      </div>
    </div>
  );
};

export default Courses;
