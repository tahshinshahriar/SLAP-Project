import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './SendMessage.scss'

interface Props {
  senderId: string | undefined; 
}

const SendMessage: React.FC<Props> = ({ senderId }) => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [content, setContent] = useState('');
  const [isBroadcast, setIsBroadcast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/messages', {
        senderId,
        recipientEmail: recipientEmail, // Only send email if not a broadcast
        content,
      });

      toast.success('Message sent successfully!');
      setContent(''); // Clear the input field
      setRecipientEmail(''); // Clear the email field
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="sendMsg__container">

      <form className='message__form' onSubmit={handleSubmit}>
        {!isBroadcast && (
          <div>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Recipient's email"
              required={!isBroadcast} // Only required if not a broadcast
            />
          </div>
        )}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message here..."
          required
        ></textarea>
        {/* <div>
          <label>
            Broadcast:
            <input
              type="checkbox"
              checked={isBroadcast}
              onChange={(e) => setIsBroadcast(e.target.checked)}
            />
          </label>
        </div> */}
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default SendMessage;
