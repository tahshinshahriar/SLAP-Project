import { useState, useContext } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';

interface UserData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<UserData>({
        email: '',
        password: '',
    });

    // Access UserContext
    const userContext = useContext(UserContext);

    if (!userContext) {
        console.error('UserContext is not available');
        return null;
    }

    const { setUser } = userContext;

    // State to manage password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevVisibility) => !prevVisibility);
    };

    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = data;
    
        try {
            const { data: response } = await axios.post('/login', { email, password }, { withCredentials: true });
            
            if (response.error) {
                toast.error(response.error);
            } else {
                setUser(response);
    
                // Clear form data
                setData({ email: '', password: '' });
    
                toast.success("Login Successful");
    
                // Navigate based on user role
                if (response.role === 'student') {
                    navigate('/home/dashboard');
                } else if (response.role === 'instructor') {
                    navigate('/home/instructor-dash');
                } else {
                    navigate('/home/admin-dash');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login. Please try again.');
        }
    };    

    return (
        <div className="login__container">
            <div className="form">
                <img src="/SLAP_logo.png" alt="logo" />
                <h1>Login To Your Account</h1>
                <form onSubmit={loginUser}>
                    <input
                        type="email"
                        placeholder="Slap Email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    <div className="password__container">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        <span onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? <VscEye /> : <VscEyeClosed />}
                        </span>
                    </div>
                    <Link to="/reset-password">Forgot Password?</Link>
                    <button>Login</button>
                </form>
            </div>
            <div className="image__container">
                <img src="/Login_Hero.png" alt="Drawing of girl working" />
            </div>
        </div>
    );
};

export default Login;
