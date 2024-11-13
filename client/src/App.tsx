import { Routes, Route } from 'react-router-dom'
import './App.scss'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import ForgotPassword from './pages/forgot-password/ForgotPassword'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { UserContextProvider } from '../context/userContext'

axios.defaults.baseURL = 'http://localhost:5000/api/auth'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Toaster position="bottom-right" toastOptions={{duration: 2000}}/>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/home/*' element={<Home />}/>
          <Route path='/reset-password' element={<ForgotPassword />}/>
        </Routes>
      </div>
    </UserContextProvider>
  )
}

export default App
