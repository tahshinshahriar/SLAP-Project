import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "./ForgotPassword.scss"


function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    const handlePasswordResetRequest = async () => {
        try {
            await axios.post('/request-password-reset', { email });
            if (email) {
                toast.success("Password reset request sent to the administrator.")
                navigate('/')
            }
        } catch (error) {
            console.error("Error sending password reset request:", error);
        }
    };

    return (
        <div className="forgot-pass__container">
            <img src="/Forgot_Pass.png" alt="Illustration" />
            <h1>Forgot your password?</h1>
            <p>Enter your email and we'll help you reset your password.</p>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
            />
            <button onClick={handlePasswordResetRequest}>
                Continue
            </button>
        </div>
    );
}

export default ForgotPassword


