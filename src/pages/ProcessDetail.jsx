import React from "react"
import DOMPurify from "dompurify";
import { Link, useParams, useLocation, Outlet } from "react-router-dom"
import { getProcess } from "../../api"
import styled from "styled-components"
import Box from "../components/Box"
import Button from "../components/Button"

const ProcessDetailContainer = styled.div`
    
`

const ProcessDetailBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 2em 2em 8em 2em;
    padding: 1em;
    border-radius: 8px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`

// const ProcessDetailBox = styled(Box)`
//     &&{
//         background-color: #f5f5f5;
//     }
// `

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;   
    & h3 {
        margin-bottom: 0;
    }
    & p {
        margin-top: 0;
    }
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const TitleButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
`

function formatText(text) {
    if (!text) return "";
    
    const formattedText = text.replace(/\n/g, "<br>");
    
    const linkedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    return linkedText;
}

export default function ProcessDetail() {
    const [selectionProcess, setSelectionProcess] = React.useState()
    // const [loading, setLoading] = React.useState(false)
    // const [error, setError] = React.useState(null)

    const { id } = useParams()
    const location = useLocation()

    React.useEffect(() => {
        async function loadProcess() {
            const data = await getProcess(id)
            setSelectionProcess(data)
        }
        loadProcess()
    }, [id])
    
    return (
        <>  
            {selectionProcess && (
                <ProcessDetailBox>
                    <TitleContainer>
                        <h1>{selectionProcess.name}</h1>
                        <TitleButtonContainer>
                            <Link to="applications">
                                <Button>INSCRIÇÕES</Button>
                            </Link>
                            <Link to="edit-process">
                                <Button>EDITAR</Button>
                            </Link>
                        </TitleButtonContainer>
                    </TitleContainer>
                    <InfoContainer>
                        <h3>Número de vagas:</h3>
                        <p> {selectionProcess.places}</p>
                    </InfoContainer>
                    <InfoContainer>
                        <h3>Descrição:</h3>
                        <p 
                            dangerouslySetInnerHTML={{ 
                                __html: DOMPurify.sanitize(formatText(selectionProcess.description)) 
                            }} 
                        />
                    </InfoContainer>
                    <InfoContainer>
                        <h3>Data de início de inscrição:</h3>
                        <p> {selectionProcess.startDate}</p>
                    </InfoContainer>
                    <InfoContainer>
                        <h3>Data limite de inscrição:</h3>
                        <p> {selectionProcess.endDate}</p>
                    </InfoContainer>
                    <InfoContainer>
                        <h3>Data limite de análise de inscrição:</h3>
                        <p> {selectionProcess.endAnalysisDate}</p>
                    </InfoContainer>
                </ProcessDetailBox>
            )}
        </>
    )
}