import Logout from "../logout/Logout"
import { Link } from 'react-router-dom'; 
import { CgProfile } from "react-icons/cg";
import './Navbar.scss'
import { useState } from "react";


const Navbar = () => {
  const [showitems, setShowItems] = useState(false)
  const toggleProfile = () => {
    setShowItems(prevState => !prevState);
  }
  return (
    <nav>
      <div className="nav__container">
        <Link to='/home/dashboard'><img src="/SLAP_logo.png" alt="Logo" /></Link>
        <div className="functions__container">
          <button className="profile__icon" onClick={toggleProfile}><CgProfile /></button>
          {showitems && (
            <div className="profile__items">
              <Link to='/home/courses/send-message' onClick={toggleProfile}>Send Message</Link>
              <Link to='/home/courses/change-password' onClick={toggleProfile}>Change Password</Link>
            </div>
          )}
          <Logout />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
