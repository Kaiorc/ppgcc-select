import React, { createContext, useContext} from 'react'
import { authListener } from "../../firebase/firebase-authentication"

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null)
  const [userRole, setUserRole] = React.useState(null)
  const [uid, setUid] = React.useState(null)
  const [displayName, setDisplayName] = React.useState(null)

  React.useEffect(() => {
    authListener(setIsLoggedIn, setUserRole, setDisplayName, setUid)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, displayName, uid }}>
      {children}
    </AuthContext.Provider>
  )
}