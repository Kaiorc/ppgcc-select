import React from 'react'
import ReactLoading from 'react-loading'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFileForViewing } from '../../services/appwrite/appwrite-storage'
import styled from 'styled-components'
import Box from '../components/Box'
import Button from '../components/Button'

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 5em; 
`

const TitleContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 8px 8px 0 0;
    background-color: #008442;

    & h1 {
        text-transform: uppercase;
        text-align: center;
    }
`

const DocumentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    width: 100%;
    padding: 1em;
`

const ImageFile = styled.img`
    width: 100%;
    max-height: 500px;
    object-fit: contain;
`

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
`

export default function ViewDocument() {
    const [fileUrl, setFileUrl] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    const navigate = useNavigate()
    const { state } = useLocation()

    // Obtém o formato e o id do arquivo a partir do state
    const fileFormat = state?.fileFormat
    const fileId = state?.fileId

    React.useEffect(() => {
        async function fetchFileUrl() {
            // Se os dados não foram passados via state, indica erro
            if (!fileId || !fileFormat) {
                setError("Arquivo inválido")
                setLoading(false)
                return
            }
            try {
                const url = await getFileForViewing(fileId)
                setFileUrl(url)
                setLoading(false)
            } catch (error) {
                console.error("Erro ao buscar arquivo para visualização:", error)
                setError("Erro ao carregar o documento")
            } finally {
                setLoading(false)
            }
        }
        fetchFileUrl()
    }, [fileId, fileFormat])

    if(loading){
        return (
            <Box>
                <LoaderContainer>
                    <ReactLoading 
                        type={"spinningBubbles"}
                        color={"#008442"}
                        height={"10%"}
                        width={"10%"}
                    />
                </LoaderContainer>
            </Box>
        )
    }

    return (
        <Box>
            <TitleContainer>
                <h1>DOCUMENTO</h1>
            </TitleContainer>
            <DocumentContainer>
                <Button onClick={() => navigate(-1)}>← VOLTAR</Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {fileUrl && fileFormat === "image" && (
                    <ImageFile
                        src={fileUrl}
                        alt="Documento"
                    />
                )}
                {fileUrl && fileFormat === "pdf" && (
                    <iframe
                        src={fileUrl}
                        title="Documento"
                        width="100%"
                        height="900px"
                    />
                )}
            </DocumentContainer>
        </Box>
    )
}