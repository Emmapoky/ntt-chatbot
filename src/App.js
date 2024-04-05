import React, { useState } from 'react';
import './App.css';
import MessageList from './MessageList'; // Importing MessageList component
import MessageInput from './MessageInput'; // Importing MessageInput component
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API model
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const handleUserMessage = async (userMessage) => {
    // Omitting the part where we add user's message to state, as we now do this in MessageInput

    try {
      const result = await model.generateContent({ prompt: userMessage });
      const aiMessage = result.choices[0].message;
      // Add AI response to the conversation
      setMessages(currentMessages => [...currentMessages, { id: currentMessages.length, sender: 'Gemini', message: aiMessage }]);
      
    } catch (error) {
        console.error("Error getting response from AI:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
        setError('Failed to get a response. Please try again later.');
      }
      
  };

  // Function to clear the error message, can be used as a callback
  function clearError() {
    return setError('');
  }

  return (
    <div className="App">
      {error && <div className="error-message">{error}</div>}
      <MessageList messages={messages} />
      <MessageInput onSend={handleUserMessage} clearError={clearError} />
    </div>
  );
}

export default App;

