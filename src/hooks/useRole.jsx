import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export default function useRole() {

    const { userRole } = useContext(AuthContext)

    const isAdmin = true

    // userRole === "administrador" ? console.log("useRole() - É administrador") : console.log("useRole() - É candidato")
    
    // console.log(userRole)

    return userRole === "administrador" ? isAdmin : !isAdmin
}