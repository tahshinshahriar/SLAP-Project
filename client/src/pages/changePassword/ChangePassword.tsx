import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import './ChangePassword.scss';

const ChangePassword: React.FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevVisibility) => !prevVisibility);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
        }

        try {
        const response = await axios.put(
            '/change-password',
            { oldPassword, newPassword },
            { withCredentials: true } 
        );
        toast.success(response.data.message || 'Password updated successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        } catch (err: any) {
        toast.error(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className= 'change__container'>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="oldPassword">Old Password</label>
                    <div className='input__group'>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                        <span onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? <VscEye /> : <VscEyeClosed />}
                        </span>
                    </div>
                </div>
                <div>
                    <label htmlFor="newPassword">New Password</label>
                    <div className='input__group'>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <span onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? <VscEye /> : <VscEyeClosed />}
                        </span>
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <div className='input__group'>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? <VscEye /> : <VscEyeClosed />}
                        </span>
                    </div>
                </div>
                <button type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
