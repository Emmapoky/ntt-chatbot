import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div className="custom-message-list">
      {messages.map((message, index) => (
        <Message key={index} model={message} />
      ))}
    </div>
  );
};

export default MessageList;