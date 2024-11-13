import Logout from "../logout/Logout"
import { Link } from 'react-router-dom'; 
import { CgProfile } from "react-icons/cg";
import './Navbar.scss'


const Navbar = () => {
  return (
    <nav>
      <div className="nav__container">
        <Link to='/home/dashboard'><img src="/SLAP_logo.png" alt="Logo" /></Link>
        <div className="functions__container">
          <CgProfile />
          <Logout />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
