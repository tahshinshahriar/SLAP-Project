import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Messages from "../messages/Messages"
import './Courses.scss'
import axios from "axios"
const Courses = () => {
  // Temporary
  interface Courses {
    _id: number,
    courseCode: string,
    courseName: string
  }
  const [courses, setCourses] = useState<Courses []>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses',{
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);
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