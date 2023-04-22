import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { nanoid } from 'nanoid';

// create SocketContext with value = the socket instance, so all components can read this value with useContext(SocketContext)

const UsernameContext = createContext();

// useSocket is a custom hook, so we can use it in any component to get the socket instance
export const useUsername = () => useContext(UsernameContext);

// SocketProvider is a component that wraps all other components, so all components can access the socket instance
export const UsernameProvider = ({ children }) => {

  const [username, setUsername] = useState(() => {
    const initialUsername = nanoid();
    const storedVar = sessionStorage.getItem('username');
    return storedVar ? JSON.parse(storedVar) : `${initialUsername}`;
  });

  useEffect(() => {
    sessionStorage.setItem('username', JSON.stringify(username));
  }, [username]);

  return (
    <UsernameContext.Provider value={username}>
      {children}
    </UsernameContext.Provider>
  );
};