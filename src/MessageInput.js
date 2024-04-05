import React, { useState } from 'react';
import './App'; 

const MessageInput = ({ onSend, clearError }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      // Clear any previous error messages before sending a new message
      if (clearError) {
        clearError();
      }

      // Send the message input to the parent component to handle
      onSend(input.trim());
      setInput(''); // Clear the input after sending
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="messageInput">
      <input 
        type="text" 
        placeholder="Type message here" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {/* Updated button to use the send icon class */}
      <button onClick={handleSend} className="send-icon"></button>
    </div>
  );
};

export default MessageInput;

