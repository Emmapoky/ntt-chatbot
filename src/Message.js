 // Message.js
import { marked } from 'marked';
import React from 'react';

export const getFormattedText = (text) => {
  const rawMarkup = marked(text);
  return { __html: rawMarkup };
};

const Message = ({ model }) => {
  const { sender, message } = model;
  const messageClass = sender === 'Gemini' ? 'message-gemini' : 'message-user';
  const senderTitle = sender === 'Gemini' ? 'Gemini' : 'User';

  return (
    <div className={`message ${messageClass}`}>
      <div className="message-header">
        <div className="profile-icon"></div>
        <span className="sender-title">{senderTitle}</span>
      </div>
      <div className="message-text" dangerouslySetInnerHTML={getFormattedText(message)}></div>
    </div>
  );
};

export default Message;
