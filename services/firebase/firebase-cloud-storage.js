// import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

// // Inicializa o Storage do Firebase
// const storage = getStorage()

// // Função para fazer upload de um arquivo para o Firebase Storage e retornar a URL de acesso
// export async function uploadFileToStorage(file) {
//     try {
//         // Cria um caminho único para o arquivo
//         const filePath = `uploads/${Date.now()}-${file.name}`
//         const fileRef = ref(storage, filePath)

//         // Faz o upload do arquivo
//         await uploadBytes(fileRef, file)

//         // Obtém a URL de download
//         const fileUrl = await getDownloadURL(fileRef)

//         // Retorna um objeto com a URL e o caminho do arquivo (que pode ser usado para futuras operações, como deleção)
//         return { fileUrl, filePath }
//     } catch (error) {
//         console.error("Erro ao fazer upload para o Firebase Storage:", error)
//         throw error
//     }
// }

// // Função para obter a URL de visualização de um arquivo existente usando seu caminho (filePath)
// export async function getFileForViewing(filePath) {
//     try {
//         const fileRef = ref(storage, filePath)
//         const fileUrl = await getDownloadURL(fileRef)
//         return fileUrl
//     } catch (error) {
//         console.error("Erro ao buscar arquivo para visualização:", error)
//         throw error
//     }
// }

// // Função para deletar um arquivo do Firebase Storage usando seu caminho (filePath)
// export async function deleteFile(filePath) {
//     try {
//         const fileRef = ref(storage, filePath)
//         await deleteObject(fileRef)
//         console.log("Arquivo deletado com sucesso!")
//     } catch (error) {
//         console.error("Erro ao deletar arquivo:", error)
//         throw error
//     }
// }