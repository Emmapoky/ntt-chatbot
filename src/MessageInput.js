import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const MessageInput = ({ onSend }) => {
  const inputRef = useRef(null);
  const placeholder = 'Message Gemini...';
  const [isPlaceholder, setIsPlaceholder] = useState(true);

  const handleSend = (event) => {
    if (event) {
      if (event.type === 'keypress' && (event.key !== 'Enter' || event.shiftKey)) {
        return; // If it's a keypress but not 'Enter' or if 'Shift' is held, do nothing
      }
      event.preventDefault(); // Prevents the default form submission on Enter
    }
    const text = inputRef.current.textContent.trim();
    if (text && !isPlaceholder) { // Only send text if it's not the placeholder
      onSend(text);
      inputRef.current.textContent = ''; // Clear the input field
      setIsPlaceholder(true); // Reset the placeholder state
    }
    adjustHeight(); // Optionally adjust the height after sending
  };

  const adjustHeight = () => {
    const textarea = inputRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto'; // Reset the height
    const computed = window.getComputedStyle(textarea);
    const minHeight = parseInt(computed.getPropertyValue('min-height'), 1);
    const height = Math.max(textarea.scrollHeight, minHeight);
    textarea.style.height = `${height}px`; // Set to scrollHeight or minHeight
  };

  const handleFocus = () => {
    if (isPlaceholder) {
      inputRef.current.textContent = ''; // Clear placeholder text
      setIsPlaceholder(false); // Update state to indicate this is not placeholder text
    }
  };

  const handleBlur = () => {
    if (inputRef.current.textContent.trim() === '') {
      inputRef.current.textContent = placeholder; 
      setIsPlaceholder(true); // Set state back to placeholder
    }
  };

  useEffect(() => {
    adjustHeight(true); // Adjust height initially and on window resize
    if (inputRef.current && inputRef.current.textContent.trim() === '') {
      inputRef.current.textContent = placeholder; 
      setIsPlaceholder(true);
    }
    window.addEventListener('resize', () => adjustHeight(true));
    return () => {
      window.removeEventListener('resize', () => adjustHeight(true));
    };
  }, []);

  return (
    <div className="message-input-container">
      <div
        ref={inputRef}
        className="input-field"
        contentEditable
        placeholder = {placeholder}
        onInput={adjustHeight} // Adjust height when input changes
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleSend} // Handle Enter key
      />
      <IconButton className="send-button" onClick={handleSend} aria-label="send">
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default MessageInput;