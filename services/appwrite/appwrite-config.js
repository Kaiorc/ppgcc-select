import { Client, Storage } from 'appwrite'

// Configurando o cliente Appwrite
const client = new Client()

// Definindo o endpoint e o ID do projeto a partir das variáveis de ambiente
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

export const storage = new Storage(client)