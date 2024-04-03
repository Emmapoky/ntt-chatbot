import logo from './logo.svg';
import './App.css';
import './MessageList.js';
import './MessageInput.js';
import React, { useState } from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="messageList">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender === "ChatGPT" ? "left" : "right"}`}>
          {msg.message}
        </div>
      ))}
    </div>
  );
};

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
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
        placeholder="Type Message here" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

function App() {
  const [messages, setMessages] = useState([
    { id: 0, sender: 'ChatGPT', message: 'Hello, I am ChatGPT!' },
    // ... You can add more default messages here
  ]);

  const handleUserMessage = (userMessage) => {
    const newMessage = { id: messages.length, sender: 'user', message: userMessage };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="App">
      {/* Remove the header and other contents to make room for the chat UI */}
      <MessageList messages={messages} />
      <MessageInput onSend={handleUserMessage} />
    </div>
  );
}

export default App;
