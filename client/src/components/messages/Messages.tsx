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
    <div className="message__contents">
         {dummyMessage.map((msgs) => (
                <p>{msgs.message}</p>
              ))}
    </div>
  )
}

export default Messages
