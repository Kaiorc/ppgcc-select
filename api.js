import { initializeApp } from "@firebase/app";
// Importing from /lite can reduce the bundle size, by not bring a bunch of realtime features, but just providing
// CRUD opoerations reducing the time it takes to load the app
import { getFirestore, collection, doc, getDocs, getDoc, query, where, addDoc } from "firebase/firestore/lite";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC69Vrl7WzVHDIgzPfFh_f7RMpHbwbK-FY",
    authDomain: "ppgccelect.firebaseapp.com",
    projectId: "ppgccelect",
    storageBucket: "ppgccelect.firebasestorage.app",
    messagingSenderId: "1036502504104",
    appId: "1:1036502504104:web:8bab1891391a1988ffe89d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const processesCollectionRef = collection(db, "processes");

export async function getProcess(id) {
    const docRef = doc(db, "processes", id)
    const snapshot = await getDoc(docRef)
    
    // console.log(snapshot.data())
    console.log({
        ...snapshot.data(),
        id: snapshot.id
    })
    
    // If we dont do it this way, the object will not have the "id" property
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getProcesses() {
    const snapshot = await getDocs(processesCollectionRef)
    const processes = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return processes
}

export async function createProcess(data) {
    await addDoc(processesCollectionRef, data)
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