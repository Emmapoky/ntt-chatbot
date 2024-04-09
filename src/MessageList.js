// Render a list of message components
import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  // Ensure messages is always treated as an array
  const safeMessages = messages || [];

  return (
    <div className="message-list">
      {safeMessages.map((message, index) => (
        <Message key={index} model={message} />
      ))}
    </div>
  );
};

export default MessageList;