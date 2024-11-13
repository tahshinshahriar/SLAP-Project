import { Routes, Route, Outlet } from 'react-router-dom'
import './Home.scss'
import Navbar from '../../components/navigation/Navbar'
import Dashboard from '../../components/dashboard/Dashboard'
import Courses from '../../components/courses/Courses'
import Assignments from '../../components/assignments/Assignments'
import SendMessage from '../../components/send-message/SendMessage'
import ChangePassword from '../../components/change-password/ChangePassword'

const Home = () => {
  return (
    <div className='home'>
        <Navbar />
        <div className="dashboard__content">
            <Routes>
                <Route path='dashboard' element={<Dashboard />}/>
                <Route path='courses' element={<Courses />}/>
                <Route path='courses/assignments' element={<Assignments />}/>
                {/* <Route path='courses/:courseId/assignments' element={<Assignments />}/> */}
                <Route path='courses/send-message' element={<SendMessage />}/>
                <Route path='courses/change-password' element={<ChangePassword />}/>
            </Routes>
            <Outlet />
        </div>
    </div>
  )
}

export default Home
