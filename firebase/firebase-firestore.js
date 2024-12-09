import { initializeApp } from "@firebase/app"
// Importing web app's Firebase configuration
import { firebaseConfig } from "./firebase-config"
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
    setDoc,
    addDoc, 
    updateDoc
} from "firebase/firestore/lite"

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Obtém uma instância do Firestore
const db = getFirestore(app)

// Referência para a coleção "processes" no Firestore
export const processesCollectionRef = collection(db, "processes")
// Referência para a coleção "applications" no Firestore
export const applicationsCollectionRef = collection(db, "applications")

// Função para obter um processo pelo ID
export async function getProcess(id) {
    // Cria uma referência ao documento com o ID fornecido
    const docRef = doc(db, "processes", id) 
    // Obtém o documento do Firestore
    const snapshot = await getDoc(docRef)
    
    // If we dont do it this way, the object will not have the "id" property
    return {
        ...snapshot.data(), // Retorna os dados do documento
        id: snapshot.id // Adiciona a propriedade "id" ao objeto retornado
    }
}

// Função para obter todos os processos
export async function getProcesses() {
    // Obtém todos os documentos da coleção "processes"
    const snapshot = await getDocs(processesCollectionRef) 
    const processes = snapshot.docs.map(doc => ({
        ...doc.data(), // Mapeia os dados de cada documento
        id: doc.id // Adiciona a propriedade "id" a cada objeto de processo
    }))
    // Retorna a lista de processos
    return processes 
}

// Função para carregar um processo pelo ID e atualizar o estado no componente em
// que é chamada
export async function loadProcess(id, stateSetter) {
    const data = await getProcess(id)
    stateSetter(data)
}

// Função para criar um novo processo na coleção "processes" com id gerado manualmente
// e adicionar um documento vazio com o mesmo id na coleção "applications" e "updates"
export async function createProcess(data) {
    try{
        // Usa o valor de "name" como ID
        const processId = data.name
    
        // Verifica se o ID já existe para evitar conflitos
        const processDocRef = doc(processesCollectionRef, processId)
        const existingDoc = await getDoc(processDocRef)
        if (existingDoc.exists()) {
            throw new Error(`Um processo com o nome "${processId}" já existe.`)
        }
    
        // Cria o documento na coleção "processes"
        await setDoc(processDocRef, { ...data, id: processId })
    
        // Cria um documento vazio na coleção "applications" com o mesmo ID
        const applicationDocRef = doc(applicationsCollectionRef, processId)
        // Documento vazio
        await setDoc(applicationDocRef, {})
    } catch (error) {
        console.error("Erro ao criar processo:", error)
        throw error
    }
}

// Função para criar um novo processo com id gerado automaticamente pelo Firebase
// export async function createProcess(data) {
//     // Adiciona um novo documento à coleção "processes" com os dados fornecidos
//     await addDoc(processesCollectionRef, data)
// }

// Função para atualizar um processo existente pelo ID
export async function updateProcess(id, data) {
    // Função para atualizar um processo existente pelo ID
    const docRef = doc(db, "processes", id) 
    // console.log("api.js - updateProcess() - docRef: ", docRef) // Loga a referência do documento
    // console.log("api.js - updateProcess() - data: ", data) // Loga os dados a serem atualizados
    // Atualiza o documento no Firestore com os novos dados
    await updateDoc(docRef, data) 
}

// Função para deletar um processo pelo ID


// Função para adicionar os dados do candidato a um doc na coleção "applications", com
// o mesmo id do processo do doc na coleção "processes"
export async function addApplication(id, data) {
    
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