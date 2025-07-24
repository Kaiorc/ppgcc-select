import React from "react"
import ReactLoading from 'react-loading'
import { useOutletContext } from "react-router-dom"
import { formatFirestoreDate, formatProcessDescription } from "../../utils/formatters/formatters"
import DOMPurify from "dompurify"
import styled from "styled-components"

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 5em; 
`

const InfoGrid = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h3 {
        text-align: center;
        margin-bottom: 0;
        font-size: 1.2rem;
        padding: 0 1em 0 1em;
    }

    p {
        margin-top: 0.3rem;
        font-size: 1.2rem;
        padding: 0 1em 0 1em;
    }

    @media (max-width: 768px) {
        h3 {
            font-size: 1rem;
        }

        p {
            font-size: 1rem;
        }
    }
`

// Componente que renderiza os detalhes de um processo seletivo
export default function ProcessDetail() {
    // Obtém o processo seletivo do contexto da rota
    const { selectionProcess } = useOutletContext()

    // Estado para controlar o carregamento dos dados
    const [loading, setLoading] = React.useState(true)

    // useEffect para definir o estado de carregamento como falso quando o processo seletivo é
    // carregado, isso garante que o loader seja exibido até que os dados estejam prontos
    React.useEffect(() => {
        if (selectionProcess) {
            setLoading(false)
        }
    }, [selectionProcess])

    return (
        <>
            { loading ? (
                <LoaderContainer>
                    <ReactLoading 
                        type={"spinningBubbles"}
                        color={"#008442"}
                        height={"10%"}
                        width={"10%"}
                    />
                </LoaderContainer>
            ) : (
                    <>
                        <InfoGrid>
                            <InfoContainer>
                                <h3>Número de vagas:</h3>
                                <p> {selectionProcess.places}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <h3>Data de início de inscrições:</h3>
                                <p> {formatFirestoreDate(selectionProcess.startDate)}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <h3>Data de encerramento de inscrições:</h3>
                                <p> {formatFirestoreDate(selectionProcess.endDate)}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <h3>Data de encerramento de análise de inscrições:</h3>
                                <p> {formatFirestoreDate(selectionProcess.endAnalysisDate)}</p>
                            </InfoContainer>
                        </InfoGrid>
                        <InfoContainer>
                            <h3>Descrição:</h3>
                            <p 
                                dangerouslySetInnerHTML={{ 
                                    __html: DOMPurify.sanitize(formatProcessDescription(selectionProcess.description)) 
                                }} 
                            />
                        </InfoContainer>
                    </>
                )
            }
        </>
    )
}