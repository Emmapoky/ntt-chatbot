import React, { useState } from 'react';
import sendIcon from './img/SendIcon.svg'; 

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput(''); // Clear the input field
    }
  };

  return (
    <div className="message-input-container">
      <input
        className="input-field"
        type="text"
        placeholder="Message Gemini..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button className="send-button" onClick={handleSend}>
        <img src={sendIcon} alt="Send" /> {}
      </button>
    </div>
  );
};

export default MessageInput;