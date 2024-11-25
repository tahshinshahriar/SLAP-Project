import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Messages from "../messages/Messages"
import './Courses.scss'
import axios from "axios"

interface Course {
  _id: string;
  courseCode: string;
  courseName: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {

      try {
        const response = await axios.get('/show-courses', { withCredentials: true }); 
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Refetch courses when user changes

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>{error}</div>;

  
  return (
    <div className="courses__container">
      <div className="course__content__container">
        <h1>Courses</h1>
        {courses && courses.map((course) => (
          <div key={course._id} className="course__content">
            <Link to={`/home/courses/${course._id}/assignments`}>
              <p>{course.courseCode} - {course.courseName}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="msg__container">
        <Messages />
      </div>
    </div>
  );
}

export default Courses



