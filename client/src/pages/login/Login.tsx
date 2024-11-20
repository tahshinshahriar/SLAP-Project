import { useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { toast } from 'react-hot-toast'
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';

interface UserData {
    slapID: string,
    password: string

}

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<UserData>({
        slapID: '',
        password: ''
    })
    const { setUser } = useContext(UserContext);
    
    // State to manage password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevVisibility) => !prevVisibility);
    };

    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { slapID, password } = data
        try {
            const {data} = await axios.post('/login', {
                slapID,
                password
            });
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({slapID: '', password: ''})
                localStorage.setItem('token', data.token);
                // Fetch the user profile
                const profileResponse = await axios.get('/profile', {
                    headers: { Authorization: `Bearer ${data.token}` }
                });
                setUser(profileResponse.data);
                toast.success("Login Successful")
                navigate('/home/dashboard')
            }
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div className='login__container'>
        <div className="form">
            
            <img src="/SLAP_logo.png" alt="logo" />
            <h1>Login To Your Account</h1>  
            <form onSubmit={loginUser}>
                <input 
                    type="text" 
                    placeholder='Slap ID'
                    value={data.slapID}
                    onChange={(e) => setData({...data, slapID: e.target.value})}
                />
                <div className="password__container">
                    <input 
                        type={isPasswordVisible ? 'text' : 'password'} 
                        placeholder='Password'
                        value={data.password}
                        onChange={(e) => setData({...data, password: e.target.value})}
                    />
                    <span onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <VscEye /> : <VscEyeClosed />}
                    </span>
                </div>
                <Link to='/reset-password'>Forgot Password?</Link>
                <button>Login</button>
            </form>
        </div>
        <div className="image__container">
            <img src="/Login_Hero.png" alt="Drawing of girl working" />
        </div>
    </div>
  )
}

export default Login
