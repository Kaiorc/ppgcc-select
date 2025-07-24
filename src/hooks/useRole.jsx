import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

// Hook personalizado para acessar o contexto de autenticação e verificar o papel do usuário
export default function useRole() {
    const { userRole } = useContext(AuthContext)

    const isAdmin = true

    return userRole === "administrador" ? isAdmin : !isAdmin
}