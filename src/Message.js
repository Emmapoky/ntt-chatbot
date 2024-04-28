//display an individual message
//npm install marked
import React from 'react';
import { marked } from 'marked';

const Message = ({ model }) => {
  const { sender, message } = model;
  const messageClass = sender === 'ChatGPT' ? 'message-openai' : 'message-user'; 
  const senderTitle = sender === 'ChatGPT' ? 'ChatGPT' : 'User';

  const getFormattedText = (text) => {
    if (!text) return { __html: "" };
    const rawMarkup = marked(text);
    return { __html: rawMarkup };
};

  return (
    <div className={`message ${messageClass}`}>
      <div className="message-header">
        <div className="profile-icon" style={{ backgroundColor: sender === 'ChatGPT' ? '#aeaeae' : '#707070' }}></div>
        <span className="sender-title">{senderTitle}</span>
      </div>
      <div className="message-text" dangerouslySetInnerHTML={getFormattedText(message)}></div>
    </div>
  );
};

export default Message;