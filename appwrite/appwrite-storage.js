import { storage } from "./appwrite-config"

const bucketId = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID

export async function uploadFileToStorage(file) {
    try {
        const response = await storage.createFile(bucketId, "unique()", file)
        // Retorna o fileId
        return response.$id
    } catch (error) {
        console.error("Erro ao fazer upload para o Appwrite:", error)
        throw error
    }
}