//serves as the main wrapper for chat application, potentially holding other UI elements beyond just the chat
import React from 'react';

const MainContainer = ({ children }) => {
  return <div className="main-container">{children}</div>;
};

export default MainContainer;