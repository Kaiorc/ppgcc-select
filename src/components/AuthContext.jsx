import React, { createContext, useContext} from 'react';
import { authListener } from '../../api';

export const AuthContext = createContext();

export function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);

  React.useEffect(() => {
    authListener(setIsLoggedIn, isLoggedIn);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};