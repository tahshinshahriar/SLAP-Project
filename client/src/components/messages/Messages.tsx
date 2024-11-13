import { useState, useEffect } from 'react';
import axios from 'axios';
import './Messages.scss'


const Messages: React.FC = () => {
    interface Messages {
        message: string;
    }

    const dummyMessage: Messages [] = [
    { message: "- Quiz 2 updated - Class 2" },
    { message: "- System will be down Saturday from 6am - 8am" },
    { message: "- Project instructions uploaded - Class 1" },

    ]

    const [openMessages, setOpenMessages] = useState(true)
    const toggleMessages = () => {
        setOpenMessages(prevState => !prevState);
    };
    // interface Message {
    //     _id: string;
    //     message: string;
    // }
    // const [messageContent, setMessageContent] = useState<Message[]>([]);

    // useEffect(() => {
    //     const fetchMessages = async () => {
    //         try {
    //             const response = await axios.get('/user/messages');
    //             setMessageContent(response.data);
    //         } catch (error) {
    //             console.error("Error fetching messages:", error);
    //         }
    //     };
        
    //     fetchMessages();
    // }, []);
  return (
    // <div className='message__contents'>
    //     {messageContent.map((message) => (
    //         <p key={message._id}>- {message.message}</p>
    //     ))}
    // </div>
    <div className="messages__container">
        <div className="msg__header">
                <p>Messages</p>
                <button onClick={toggleMessages}>{ openMessages ? "-" : "+"}</button>
        </div>
        {openMessages && (
            <div className="message__contents">
            <hr />
            {dummyMessage.map((msgs) => (
                    <p>{msgs.message}</p>
                ))}
            </div>
          )}
    </div>
  )
}

export default Messages
