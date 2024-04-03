import './App.css';
import './MessageList.js';
import './MessageInput.js';
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

//Import API key from .env
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

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

// Define the Sidebar component directly in App.js
const Sidebar = ({ onToggleTheme }) => {
  // Place your sidebar buttons and logic here
  return (
    <div className="sidebar">
      <button onClick={onToggleTheme} className="sidebar-btn">Toggle Theme</button>
      {/* Implement other sidebar buttons here */}
    </div>
  );
};

function App() {
  const [messages, setMessages] = useState([
    { id: 0, sender: 'ChatGPT', message: 'Hello, I am ChatGPT!' },
  ]);
  const [theme, setTheme] = useState('dark');
  const [error, setError] = useState(''); // State to store the error message

  const handleUserMessage = async (userMessage) => {
    // Clear previous error messages
    setError('');
    
    const newUserMessage = {
      id: messages.length,
      sender: 'user',
      message: userMessage,
    };

    // Add the user's message to the messages array
    setMessages([...messages, newUserMessage]);

    try {
      // Replace with your actual API call
      const response = await fetch('/path-to-your-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include your API key header here if necessary
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status code ${response.status}`);
      }

      const data = await response.json();
      const newAIMessage = {
        id: messages.length + 1,
        sender: 'ChatGPT',
        message: data.reply, // Replace with the actual property from your response
      };

      // Add ChatGPT's response to the messages array
      setMessages([...messages, newUserMessage, newAIMessage]);
    } catch (err) {
      console.error("An error occurred:", err);
      setError('Failed to get a response from the server. Please try again later.');
    }
  };

  // Function to toggle the theme
  const handleToggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`App ${theme}`}>
      <Sidebar onToggleTheme={handleToggleTheme} />
      <div className="chat-area">
        {/* Error message display */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Message list display */}
        <div className="messageList">
          {messages.map((message, i) => (
            <div key={i} className={`message ${message.sender === 'ChatGPT' ? 'left' : 'right'}`}>
              {message.message}
            </div>
          ))}
        </div>

        {/* Message input field */}
        <div className="messageInput">
          <input 
            type="text" 
            placeholder="Type Message here" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(event) => event.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;