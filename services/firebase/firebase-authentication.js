import { initializeApp } from "@firebase/app"
// Importing web app's Firebase configuration
import { firebaseConfig } from "./firebase-config"
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    getIdTokenResult,
    updateProfile
} from "firebase/auth"

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Auth
const auth = getAuth(app)

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider()

// Função para configurar o listener de autenticação
export function authListener(setIsLoggedIn, setIsEmailVerified, setUserRole, setDisplayName, setUid, setUserEmail) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setIsLoggedIn(true)
            setUid(user.uid)
            setUserEmail(user.email)
            console.log("api.js - authListener() - User is logged in")
            setIsEmailVerified(user.emailVerified)
            console.log("api.js - authListener() - Email verified: ", user.emailVerified)
            // console.log("api.js - authListener() - ", user)
            // Captura o resultado do redirecionamento
            const role = await getUserRole(user)
            setUserRole(role)
            console.log("api.js - authListener() - Papel do usuário: ", role)
            setDisplayName(user.displayName)
        } else {
            setIsLoggedIn(false)
            setUid(null)
            setIsEmailVerified(false)
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
        // Envia o email de verificação
        await sendEmailVerification(auth.currentUser)
    } catch(error) {
        console.error(error.message)
        throw error
    }
}

// Função para logar com email e senha
export async function authLogInWithEmail(email, password, setIsLoggedIn) { 
    try{
        await signInWithEmailAndPassword(auth, email, password)
        setIsLoggedIn(true)
    } catch(error) {
        console.error(error.message)
        throw error
    }
}

// export async function authSignInWithGoogle() {
//     // Função para detectar mobile (simples, pode ser melhorada)
//     function isMobile() {
//         return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
//     }
//     try {
//         if (isMobile()) {
//             await signInWithRedirect(auth, provider)
//             // O fluxo de redirect não retorna user imediatamente
//             // O usuário será redirecionado e, após o login, o onAuthStateChanged será chamado
//             return null
//         } else {
//             const result = await signInWithPopup(auth, provider)
//             // Retorna o resultado ou o usuário logado
//             return result.user
//         }
//     } catch (error) {
//         console.error("Erro ao fazer login com o Google:", error)
//         throw error
//     }
// }

// Função para logar com o Google
export async function authSignInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider)
        // Retorna o resultado ou o usuário logado
        return result.user
    } catch (error) {
        console.error("Erro ao fazer login com o Google:", error)
        throw error
    }
}

// Função para deslogar o usuário
export async function authLogOut(setIsLoggedIn) {
    try {
        await signOut(auth)
        setIsLoggedIn(false)
    } catch(error) {
        console.error(error.message)
    }
}

// Função para enviar o e-mail de recuperação de senha
export async function authSendPasswordResetEmail(email) {
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error) {
        console.error("Erro ao enviar e-mail de recuperação:", error)
        throw error
    }
}

// Função para obter o papel do usuário
export async function getUserRole(user) {
    if (!user) return null
    try {
        const tokenResult = await getIdTokenResult(user)
        // console.log("api.js - getUserRole() - Papel do usuário: ", tokenResult.claims.role)
        // Retorna "role" ou null
        return tokenResult.claims.role || null 
    } catch (error) {
        console.error("api.js - getUserRole() - Erro ao obter o papel do usuário:", error)
        return null
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