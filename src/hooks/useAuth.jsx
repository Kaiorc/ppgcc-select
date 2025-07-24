import { useContext } from 'react'
import { AuthContext } from '../components/AuthContext'

// Hook personalizado para acessar o contexto de autenticação
export default function useAuth() {
    return useContext(AuthContext)
}