import React from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { getProcess } from "../../api"
import styled from "styled-components"
import Box from "../components/Box"

const ProcessDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default function ProcessDetail() {
    const [selectionProcess, setSelectionProcess] = React.useState(null)
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
        <ProcessDetailContainer>  
            {selectionProcess && (
                <Box>
                    <h1>{selectionProcess.name}</h1>
                    <p><b>Descrição:</b> {selectionProcess.description}</p>
                    <p><b>Data de início:</b> {selectionProcess.startDate}</p>
                    <p><b>Data limite:</b> {selectionProcess.endDate}</p>
                </Box>
            )}
        </ProcessDetailContainer>
    )
}