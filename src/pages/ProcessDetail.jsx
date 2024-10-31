import React from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { getProcess } from "../../api"
import styled from "styled-components"
import Box from "../components/Box"

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

export default function ProcessDetail() {
    const [selectionProcess, setSelectionProcess] = React.useState()
    // const [loading, setLoading] = React.useState(false)
    // const [error, setError] = React.useState(null)
    const { id } = useParams()
    const location = useLocation()

    React.useEffect(() => {
        async function loadProcesses() {
            const data = await getProcess(id)
            setSelectionProcess(data)
        }
        loadProcesses()
    }, [id])

    // const search = location.state?.search || "";
    // const type = location.state?.type || "all";
    
    return (
        <>  
            {selectionProcess && (
                <ProcessDetailBox>
                    <h1>{selectionProcess.name}</h1>
                    <InfoContainer>
                        <h3>Descrição:</h3>
                        <p> {selectionProcess.description}</p>
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