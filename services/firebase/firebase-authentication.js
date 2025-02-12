import { initializeApp } from "@firebase/app"
// Importing web app's Firebase configuration
import { firebaseConfig } from "./firebase-config"
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    getIdTokenResult,
    updateProfile
} from "firebase/auth"

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Auth
const auth = getAuth(app)

// Função para configurar o listener de autenticação
export function authListener(setIsLoggedIn, setUserRole, setDisplayName, setUid, setUserEmail) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setIsLoggedIn(true)
            setUid(user.uid)
            setUserEmail(user.email)
            console.log("api.js - authListener() - User is logged in")
            // console.log("api.js - authListener() - ", user)
            const role = await getUserRole(user)
            setUserRole(role)
            setDisplayName(user.displayName)
        } else {
            setIsLoggedIn(false)
            setUid(null)
            console.log("api.js - authListener() - User is logged out")
            setUserRole(null);
            setDisplayName(null);
        }
    })
}

// Função para criar uma conta com email e senha
export async function authCreateAccountWithEmail(name, email, password) {
    try{
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: name })
        // console.log("Profile updated")
    } catch(error) {
        console.error(error.message)
        throw error
    }
}

 
export async function authLogInWithEmail(email, password, setIsLoggedIn) { 
    try{
        await signInWithEmailAndPassword(auth, email, password)
        setIsLoggedIn(true)
    } catch(error) {
        console.error(error.message)
        throw error
    }
}

export async function authLogOut(setIsLoggedIn) {
    try {
        await signOut(auth)
        setIsLoggedIn(false)
    } catch(error) {
        console.error(error.message)
    }
}

// Função para obter o papel do usuário
export async function getUserRole(user) {
    if (!user) return null;
    try {
        const tokenResult = await getIdTokenResult(user);
        // console.log("api.js - getUserRole() - Papel do usuário: ", tokenResult.claims.role);
        return tokenResult.claims.role || null; // Retorna "role" ou null
    } catch (error) {
        console.error("api.js - getUserRole() - Erro ao obter o papel do usuário:", error);
        return null;
    }
}

// Função para logar as custom claims do usuário logado
// export async function logUserCustomClaims(user) {
//     if (user) {
//         try {
//             const tokenResult = await getIdTokenResult(user)
//             const claims = tokenResult.claims;
//             if (claims.role === "administrador") {
//                 console.log("api.js - logUserCustomClaims() - Custom Claims:", claims)
//             } else {
//                 console.log("api.js - logUserCustomClaims() - O usuário não possui a role de administrador.")
//             }
//         } catch (error) {
//             console.error("api.js - logUserCustomClaims() - Erro ao obter custom claims:", error)
//         }
//     } else {
//         console.log("api.js - logUserCustomClaims() - Nenhum usuário está logado.")
//     }
// }