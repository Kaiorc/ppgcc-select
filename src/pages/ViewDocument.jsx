import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFileForViewing } from '../../services/appwrite/appwrite-storage'
import styled from 'styled-components'
import Box from '../components/Box'
import Button from '../components/Button'

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

export default function ViewDocument() {

    const navigate = useNavigate()

    const { state } = useLocation()
    const fileUrl = state?.fileUrl

    // React.useEffect(() => {
    //     if (fileUrl) {
    //         try {
    //             const url = getFileForViewing(fileId)
    //             console.log("URL", url)
    //             setFileUrl(url)
    //         } catch (error) {
    //             console.error("Erro ao carregar o arquivo:", error)
    //         }
    //     }
    // }, [fileId])

    console.log(fileUrl)

    return (
        <Box>
            <TitleContainer>
                <h1>DOCUMENTO</h1>
            </TitleContainer>
            <DocumentContainer>
                {fileUrl ? (
                    // Aqui estamos usando um iframe para renderizar o documento.
                    // Dependendo do tipo de arquivo, você pode usar um <img> ou outro componente.
                    <iframe src={fileUrl} width="100%" height="500px" title="Documento" />
                ) : (
                    "Carregando documento..."
                )}
            </DocumentContainer>
        </Box>
    )
}

// export default function ViewDocument({}) {

//     const navigate = useNavigate()

//     return (
//         <Box>
//             <TitleContainer>
//                 <h1>DOCUMENTO</h1>
//             </TitleContainer>
//             <DocumentContainer>
//                 Documento vai ser renderizado aqui
//             </DocumentContainer>
//         </Box>
//     )
// }