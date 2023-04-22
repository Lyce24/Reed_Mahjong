import React, { createContext, useMemo, useState, useEffect } from "react";
import { nanoid } from 'nanoid';

const MyContext = createContext();

function MyProvider(props) {
  const [myVar, setMyVar] = useState(() => {
    const initial = nanoid();
    const storedVar = localStorage.getItem('myvar');
    return storedVar ? JSON.parse(storedVar) : `${initial}`;
  });

  useEffect(() => {
    localStorage.setItem('myvar', JSON.stringify(myVar));
  }, [myVar]);

  const [count, setCount] = useState(0);

  // Use useMemo() to memoize the context value
  const contextValue = useMemo(() => {
    return {
      myVar,
      setMyVar,
    };
  }, [myVar]);

  return <MyContext.Provider value={myVar} {...props} />;
}

export { MyProvider, MyContext };
