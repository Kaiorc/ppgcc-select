import { storage } from "./appwrite-config"

const bucketId = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID

// Função para fazer upload de um arquivo para o Appwrite Storage e retornar a
// URL para visualização do arquivo
// export async function uploadFileToStorage(file) {
//     try {
//         const response = await storage.createFile(bucketId, "unique()", file)
//         // Retorna o fileId
//         const fileId = response.$id
//         // Retorna a URL para visualização do arquivo
//         const fileUrl = storage.getFileView(bucketId, fileId)
//         return fileUrl
//     } catch (error) {
//         console.error("Erro ao fazer upload para o Appwrite:", error)
//         throw error
//     }
// }
export async function uploadFileToStorage(file) {
    try {
        const response = await storage.createFile(bucketId, "unique()", file)
        // Retorna o fileId
        const fileId = response.$id
        // Retorna o ID do arquivo
        return fileId
    } catch (error) {
        console.error("Erro ao fazer upload para o Appwrite:", error)
        throw error
    }
}

// Função para obter a URL de visualização de um arquivo existente pelo fileId
export async function getFileForViewing(fileId) {
    try {
        const fileUrl = storage.getFileView(bucketId, fileId)
        return fileUrl
    } catch (error) {
        console.error("Erro ao buscar arquivo para visualização:", error)
        throw error
    }
}

// Função para deletar um arquivo do Appwrite Storage
export async function deleteFile(fileId) {
    try {
        console.log("Tentando deletar arquivo com id:", fileId)
        await storage.deleteFile(bucketId, fileId)
        console.log("Arquivo deletado com sucesso!")
    } catch (error) {
        console.error("Erro ao deletar arquivo:", error)
        throw error
    }
}
