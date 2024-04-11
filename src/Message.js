//display an individual message
import React from 'react';

const Message = ({ model }) => {
  const { sender, message } = model;
  const messageClass = sender === 'Gemini' ? 'message-gemini' : 'message-user';

  return (
    <div className={`message ${messageClass}`}>
      <p>{message}</p>
    </div>
  );
};

export default Message;