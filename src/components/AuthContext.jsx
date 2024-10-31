import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};