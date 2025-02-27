import { Link, useNavigate, useParams } from "react-router-dom"
import Button from "./Button"

// Componente para renderizar o botão que abre a rota com o docId extraído
export default function ViewDocumentButton({ url }) {
    const { processId, uid } = useParams()

    const navigate = useNavigate()

    // Supondo que a URL do Appwrite tenha a estrutura:
    // "https://cloud.appwrite.io/v1/storage/buckets/{bucketId}/files/{docId}/..."
    const segments = url.split('/')
    // O id do documento é o 8º segmento da URL
    const docId = segments[8]

    function handleViewDocument(){
        // Redireciona para a rota '/viewdocument' passando a URL via state
        navigate(`/processes/${processId}/applications/evaluate/${uid}/view-document`, { state: { fileUrl: url } })
    }

    // function handleViewDocument(){
    //     // Redireciona para a rota '/viewdocument' passando a URL via state
    //     navigate(`/processes/${processId}/applications/evaluate/${uid}/${docId}`, { state: { fileUrl: url } })
    // }

    // return (
    //     <Link to={`/processes/${processId}/applications/evaluate/${uid}/${docId}`}>
    //         <Button>VISUALIZAR DOCUMENTO</Button>
    //     </Link>
    // )

    return (
        <Button onClick={handleViewDocument}>VISUALIZAR DOCUMENTO</Button>
    )
}