import { Routes, Route } from 'react-router-dom'
import './App.scss'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import ForgotPassword from './pages/forgot-password/ForgotPassword'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { UserContextProvider } from '../context/userContext'
import AdminPage from './pages/admin/AdminPage'

axios.defaults.baseURL = 'http://localhost:5000/api/auth'
axios.defaults.withCredentials = true
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Toaster position="bottom-right" toastOptions={{duration: 2000}}/>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/home/*' element={<Home />}/>
          <Route path='/admin' element={<AdminPage />}/>
          <Route path='/reset-password' element={<ForgotPassword />}/>
        </Routes>
      </div>
    </UserContextProvider>
  )
}

export default App
