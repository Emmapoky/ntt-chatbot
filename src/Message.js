//display an individual message
import React from 'react';

const Message = ({ model }) => {
    // Adjusted to match the actual structure of your message objects
    const { sender, text: message } = model;
  
    return (
      <div className={`message ${sender === "Gemini" ? "gemini" : "user"}`}>
        <p>{message}</p>
      </div>
    );
  };

export default Message;
