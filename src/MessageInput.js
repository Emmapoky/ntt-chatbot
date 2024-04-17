import React, { useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({ onSend }) => {
  const inputRef = useRef(null);

  const handleSend = (event) => {
    if (event) {
      if (event.type === 'keypress' && (event.key !== 'Enter' || event.shiftKey)) {
        return; // If it's a keypress but not 'Enter' or if 'Shift' is held, do nothing
      }
      event.preventDefault(); // Prevents the default form submission on Enter
    }
    const text = inputRef.current.textContent.trim();
    if (text) {
      onSend(text);
      inputRef.current.textContent = ''; // Clear the input field
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
    if (inputRef.current.textContent === 'Type your message here...') {
      inputRef.current.textContent = '';
    }
  };

  const handleBlur = () => {
    if (inputRef.current.textContent === '') {
      inputRef.current.textContent = 'Type your message here...';
    }
  };

  useEffect(() => {
    adjustHeight(true); // Adjust height initially and on window resize
    if (inputRef.current.textContent === '') {
      inputRef.current.textContent = 'Type your message here...'; // Set placeholder text initially
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
        placeholder="Type your message here..."
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