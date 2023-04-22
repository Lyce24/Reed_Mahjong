import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { createContext, useContext, useEffect, useState } from "react";

// create SocketContext with value = the socket instance, so all components can read this value with useContext(SocketContext)

const UsernameContext = createContext();

// useSocket is a custom hook, so we can use it in any component to get the socket instance
export const useUsername = () => useContext(UsernameContext);

// SocketProvider is a component that wraps all other components, so all components can access the socket instance
export const UsernameProvider = ({ children }) => {
  const username = "1234"

  return (
    <UsernameContext.Provider value={username}>
      {children}
    </UsernameContext.Provider>
  );
};