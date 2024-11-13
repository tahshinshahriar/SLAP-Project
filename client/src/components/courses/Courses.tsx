import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Messages from "../messages/Messages"
import './Courses.scss'

const Courses = () => {
  // Temporary
  interface Courses {
    _id: number,
    courseCode: string,
    courseName: string

  }
  
  const dummyCourses: Courses [] = [
    { _id: 1, courseCode: 'RTA928', courseName: 'Introduction to Game Design'},
    { _id: 2, courseCode: 'CPS845', courseName: 'Extreme Programming and Agile Processes'},
    { _id: 3, courseCode: 'MHR523', courseName: 'Human Resources Management'},
    { _id: 4, courseCode: 'CPS714', courseName: 'Software Project Management'}
  ]
  // const [courses, setCourses] = useState(null);

  // useEffect(() => {
  //     const fetchCourses = async () => {
  //         try {
  //             const response = await axios.get('/user/courses');
  //             setCourses(response.data);
  //         } catch (error) {
  //             console.error("Error fetching courses:", error);
  //         }
  //     };
      
  //     fetchCourses();
  // }, []);
  return (
    <div className="courses__container">
        {/*<div className="course__content">
          {courses && courses.map((course) => (
            <div key={course._id}/>
            <h2>{course.courseCode} - {course.courseName}</h2>
            <div/>
            ))}
          </div> */}
        <div className="course__content__container">
          <h1>Courses</h1>
          {dummyCourses.map((course) => (
            <div className="course__content">
              <Link to='/home/courses/assignments'><p>{course.courseCode} - {course.courseName}</p></Link>
            </div>
          ))}
        </div>
        <div className="msg__container">
          <Messages />
        </div>
    </div>
  )
}

export default Courses
