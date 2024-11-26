import { Routes, Route, Outlet } from 'react-router-dom'
import { useContext } from "react"
import { UserContext } from "../../../context/userContext"
import './Home.scss'
import Navbar from '../../components/navigation/Navbar'
import Dashboard from '../../components/dashboard/Dashboard'
import Courses from '../../components/courses/Courses'
import Assignments from '../../components/assignments/Assignments'
import SendMessage from '../../components/send-message/SendMessage'
import ChangePassword from '../changePassword/ChangePassword'
import InstructorDash from '../../components/dashboard/InstructorDash'
import CreateAssignments from '../../components/assignments/CreateAssignments'
import AdminPage from '../admin/AdminPage'
import RegisterUser from '../register/RegisterUser'
import CreateCourse from '../../components/courses/CreateCourse'
import EditCourse from '../../components/courses/EditCourse'

const Home = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user } = userContext;
  return (
    <div className='home'>
        <Navbar />
        <div className="dashboard__content">
            <Routes>
                <Route path='dashboard' element={<Dashboard />}/>
                <Route path='instructor-dash' element={<InstructorDash />}/>
                <Route path='admin-dash' element={<AdminPage />}/>
                <Route path='register-user' element={<RegisterUser />}/>
                <Route path="/create-course" element={<CreateCourse />} />
                <Route path="/edit-course" element={<EditCourse />} />
                <Route path='courses' element={<Courses />}/>
                <Route path="/courses/:courseId/assignments" element={<Assignments />} />
                <Route path="courses/:courseId/create-assignment" element={<CreateAssignments />} />
                <Route path='courses/send-message' element={<SendMessage senderId={user?._id}/>}/>
                <Route path='courses/change-password' element={<ChangePassword />}/>
            </Routes>
            <Outlet />
        </div>
    </div>
  )
}

export default Home
