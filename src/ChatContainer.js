// simple container that holds chat elements
import React from 'react';

const ChatContainer = ({ children }) => {
  return <div className="chat-container">{children}</div>;
};

export default ChatContainer;