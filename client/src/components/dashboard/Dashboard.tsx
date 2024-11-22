import { useContext, useState } from "react"
import { UserContext } from "../../../context/userContext"
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import Messages from "../messages/Messages";
import './Dashboard.scss'

const Dashboard = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user } = userContext;
  return (
    <div className="dash__container">
      <div className="article__container">
        <div className="article">
          <h2>welcome back,</h2>
          <h1>{user?.name}</h1>
        </div>
        <div className="message__container">
          <Messages />
        </div>
      </div>
      <div className="course-button__container">
        <img src="/SLAP_landing.png" alt="Cube Illustration" />
        <Link to="/home/courses">
          <button> View Courses <FaChevronRight /></button>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
