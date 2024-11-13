import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from '../../components/navigation/Navbar'
import Dashboard from '../../components/dashboard/Dashboard'
import Courses from '../../components/courses/Courses'

const Home = () => {
  return (
    <div className='home'>
        <Navbar />
        <div className="dashboard__content">
            <Routes>
                <Route path='dashboard' element={<Dashboard />}/>
                <Route path='courses' element={<Courses />}/>
            </Routes>
            <Outlet />
        </div>
    </div>
  )
}

export default Home
