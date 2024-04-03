import React from 'react';
import './App'; 

function MessageList({ messages }) {
  return (
    <div className="messageList">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender === "ChatGPT" ? "left" : "right"}`}>
          {msg.message}
        </div>
      ))}
    </div>
  );
}

export default MessageList;

