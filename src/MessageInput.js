import React, { useState } from 'react';
import './App'; 

function MessageInput({ onSend }) {
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
                onKeyPress={handleKeyPress} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default MessageInput;
