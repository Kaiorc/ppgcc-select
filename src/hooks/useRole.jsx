import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export default function useRole() {
    const { userRole } = useContext(AuthContext)

    const isAdmin = true

    return userRole === "administrador" ? isAdmin : !isAdmin
}