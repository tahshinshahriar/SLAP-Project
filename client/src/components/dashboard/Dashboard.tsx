import { useContext, useState } from "react"
import { UserContext } from "../../../context/userContext"
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import Messages from "../messages/Messages";
import './Dashboard.scss'

const Dashboard = () => {
  interface Messages {
    message: string;
  }

  const dummyMessage: Messages [] = [
    { message: "- Quiz 2 updated - Class 2" },
    { message: "- System will be down Saturday from 6am - 8am" },
    { message: "- Project instructions uploaded - Class 1" },

  ]
  const context = useContext(UserContext);
  const [openMessages, setOpenMessages] = useState(true)
  const toggleMessages = () => {
    setOpenMessages(prevState => !prevState);
  };

  if (!context) {
    return <div>Loading...</div>; 
  }
  const { user } = context;
  return (
    <div className="dash__container">
      <div className="article__container">
        <div className="article">
          <h2>welcome back,</h2>
          {/* Need to integrate with backend*/}
          {/* {!!user && (<h1>{user.firstName}</h1>)} */}
          <h1>Samih</h1>
        </div>
        <div className="messages__container">
          <div className="msg__header">
            <p>Messages</p>
            <button onClick={toggleMessages}>{ openMessages ? "-" : "+"}</button>
          </div>
          {/* {openMessages && (<div className="msg__content">
            <hr />
            <Messages /> 
          </div>)} */}
          {openMessages && (
            <div className="msg__content">
            <hr />
            <Messages />
            </div>
          )}
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
