import React, { createContext, useContext} from 'react'
import { authListener } from "../../firebase/firebase-authentication"

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null)
  const [userRole, setUserRole] = React.useState(null)
  const [displayName, setDisplayName] = React.useState(null)

  React.useEffect(() => {
    authListener(setIsLoggedIn, setUserRole, setDisplayName)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, displayName }}>
      {children}
    </AuthContext.Provider>
  )
}