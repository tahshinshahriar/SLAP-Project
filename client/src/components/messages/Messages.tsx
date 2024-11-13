import React from 'react'
import './Messages.scss'

interface MessageProps {
    messages: {
      _id: string;
      content: string;  
    };
  }
const Messages: React.FC<MessageProps> = ({ messages }) => {
  return (
    <div className='message__contents'>
        <p>- {messages.content}</p>
    </div>
  )
}

export default Messages
