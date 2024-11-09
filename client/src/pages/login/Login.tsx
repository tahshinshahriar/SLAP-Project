import { useState } from 'react'
import React from 'react'
import './Login.scss'

interface UserData {
    email: string,
    password: string

}

const Login: React.FC = () => {
    const [data, setData] = useState<UserData>({
        email: '',
        password: ''
    })
  return (
    <div className='login__container'>
        <div className="form">
            <img src="/SLAP_logo.png" alt="logo" />
            <h1>Login To Your Account</h1>  
            <form>
                <input 
                    type="email" 
                    placeholder='Slap ID'
                    value={data.email}
                    onChange={(e) => setData({...data, email: e.target.value})}
                />
                <input 
                    type="password" 
                    placeholder='Password'
                    value={data.password}
                    onChange={(e) => setData({...data, password: e.target.value})}
                />
                <button>Login</button>
            </form>
        </div>
        <img src="/Login_Hero.png" alt="Drawing of girl working" />
    </div>
  )
}

export default Login
