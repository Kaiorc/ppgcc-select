import React, { createContext, useContext} from 'react'
import { authListener } from '../../services/firebase/firebase-authentication'

export const AuthContext = createContext()

// Hook que pode ser usado em qualquer componente filho para acessar o contexto de autenticação
export function AuthProvider ({ children }) {
  // Estados para armazenar informações de autenticação e informações do usuário
  const [isLoggedIn, setIsLoggedIn] = React.useState(null)
  const [isEmailVerified, setIsEmailVerified] = React.useState(false)
  const [userRole, setUserRole] = React.useState(null)
  const [uid, setUid] = React.useState(null)
  const [userEmail, setUserEmail] = React.useState(null)
  const [displayName, setDisplayName] = React.useState(null)

  // useEffect para ouvir as mudanças de autenticação e atualizar os estados correspondentes
  React.useEffect(() => {
    authListener(setIsLoggedIn, setIsEmailVerified, setUserRole, setDisplayName, setUid, setUserEmail)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isEmailVerified, userRole, displayName, uid, userEmail}}>
      {children}
    </AuthContext.Provider>
  )
}