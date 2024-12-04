import { initializeApp } from "@firebase/app"
// Importing from /lite can reduce the bundle size, by not bring a bunch of realtime features, but just providing
// CRUD operations reducing the time it takes to load the app
import { 
    getFirestore, 
    collection, 
    doc, 
    getDocs, 
    getDoc, 
    query, 
    where, 
    addDoc, 
    updateDoc 
} from "firebase/firestore/lite"
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    getIdTokenResult 
} from "firebase/auth"

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Obtém uma instância do Firestore
const db = getFirestore(app)

// Referência para a coleção "processes" no Firestore
export const processesCollectionRef = collection(db, "processes")

// Função para obter um processo pelo ID
export async function getProcess(id) {
    const docRef = doc(db, "processes", id) // Cria uma referência ao documento com o ID fornecido
    const snapshot = await getDoc(docRef)// Obtém o documento do Firestore
    
    // If we dont do it this way, the object will not have the "id" property
    return {
        ...snapshot.data(), // Retorna os dados do documento
        id: snapshot.id // Adiciona a propriedade "id" ao objeto retornado
    }
}

// Função para obter todos os processos
export async function getProcesses() {
    const snapshot = await getDocs(processesCollectionRef) // Obtém todos os documentos da coleção "processes"
    const processes = snapshot.docs.map(doc => ({
        ...doc.data(), // Mapeia os dados de cada documento
        id: doc.id // Adiciona a propriedade "id" a cada objeto de processo
    }))
    return processes // Retorna a lista de processos
}

// Função para criar um novo processo
export async function createProcess(data) {
    await addDoc(processesCollectionRef, data) // Adiciona um novo documento à coleção "processes" com os dados fornecidos
}

// Função para atualizar um processo existente pelo ID
export async function updateProcess(id, data) {
    const docRef = doc(db, "processes", id) // Função para atualizar um processo existente pelo ID
    console.log("api.js - docRef: ", docRef) // Loga a referência do documento
    console.log("api.js - data: ", data) // Loga os dados a serem atualizados
    await updateDoc(docRef, data) // Atualiza o documento no Firestore com os novos dados
}

// Initialize Firebase Auth
const auth = getAuth(app)

// Função para configurar o listener de autenticação
export function authListener(setIsLoggedIn) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoggedIn(true)
            console.log("api.js - User is logged in")
            console.log("api.js - ", user)
            logUserCustomClaims(user)
        } else {
            setIsLoggedIn(false)
            console.log("api.js - User is logged out")
        }
    });
}

// Função para criar uma conta com email e senha
export function authCreateAccountWithEmail(email, password, navigate) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigate("/")
        })
        .catch((error) => {
            console.error(error.message)
        })
}

export function authLogInWithEmail(email, password, navigate, setIsLoggedIn) { 
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setIsLoggedIn(true)
            navigate("/processes")
        })
        .catch((error) => {
            console.error(error.message)
        })
}

export function authLogOut(navigate, setIsLoggedIn) {
    signOut(auth)
        .then(() => {
            setIsLoggedIn(false)
            navigate("/")
        }).catch((error) => {
            console.error(error.message)
        })
}

// Função para logar as custom claims do usuário logado
export async function logUserCustomClaims(user) {
    if (user) {
        try {
            const tokenResult = await getIdTokenResult(user)
            const claims = tokenResult.claims;
            if (claims.role === "administrador") {
                console.log("api.js - Custom Claims:", claims)
            } else {
                console.log("api.js - O usuário não possui a role de administrador.")
            }
        } catch (error) {
            console.error("api.js - Erro ao obter custom claims:", error)
        }
    } else {
        console.log("api.js - Nenhum usuário está logado.")
    }
}

// Function to get all processes using Mirage.js
// export async function getProcess(id) {
//     const url = id ? `/api/processes/${id}` : "/api/processes"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch processes",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.processes
// }