import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../../context/userContext"
import axios from 'axios';
import './Messages.scss';

const Messages: React.FC = () => {
  interface Message {
    _id: string;
    content: string;
    sender: {
      name: string;
    };
    createdAt: string;
  }

  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user } = userContext;
  const [messages, setMessages] = useState<Message[]>([]);
  const [openMessages, setOpenMessages] = useState(true);

  const toggleMessages = () => {
    setOpenMessages((prevState) => !prevState);
  };

  // Fetch messages from the API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const recipientId = user?._id; 
        const response = await axios.get(`/messages/${recipientId}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="messages__container">
      <div className="msg__header">
        <p>Messages</p>
        <button onClick={toggleMessages}>{openMessages ? '-' : '+'}</button>
      </div>
      {openMessages && (
        <div className="message__contents">
          <hr />
          {messages.length > 0 ? (
            messages.map((msg) => (
              <p key={msg._id}>
                <strong>{msg.sender.name}:</strong> {msg.content} <br />
                <em>{new Date(msg.createdAt).toLocaleString()}</em>
              </p>
            ))
          ) : (
            <p>No messages available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
