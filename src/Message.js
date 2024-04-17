//display an individual message
// run npm install marked
import React from 'react';
import { marked } from 'marked';

const Message = ({ model }) => {
  const { sender, message } = model;
  const messageClass = sender === 'Gemini' ? 'message-gemini' : 'message-user';

  const getFormattedText = (text) => {
    const rawMarkup = marked(text); // Correct usage of `marked`
    return { __html: rawMarkup };
  };

  return (
    <div className={`message ${messageClass}`}>
      <p dangerouslySetInnerHTML={getFormattedText(message)}></p>
    </div>
  );
};

export default Message;