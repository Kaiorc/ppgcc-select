import React from "react"
import ReactLoading from 'react-loading'
import styled from "styled-components" 
import { loadActiveProcesses } from "../../../services/firebase/firebase-firestore"
import ProcessesList from "../../components/ProcessesList"

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 5em; 
`

const BoldGreenMessage = styled.h2`
    color: #008442;
    font-weight: bold;
    padding: 0 1em;
    margin: 2em;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.2em;
    }   
`

export default function ActiveProcesses() {
    const [activeSelectionProcesses, setActiveSelectionProcesses] = React.useState([])

    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function loadData() {
            const activeProcesses = await loadActiveProcesses()
            console.log("ActiveProcesses.jsx - activeProcesses: ", activeProcesses)
            setActiveSelectionProcesses(activeProcesses)
            setLoading(false)
        }
        loadData()
    }, [])

    console.log("ActiveProcesses.jsx - ", activeSelectionProcesses)

    return (
        <>
            {loading ? (
                    <LoaderContainer>
                        <ReactLoading 
                            type={"spinningBubbles"}
                            color={"#008442"}
                            height={"20%"}
                            width={"20%"}
                        />
                    </LoaderContainer>
                ) : ( activeSelectionProcesses.length === 0 && (
                        <BoldGreenMessage>NÃO HÁ PROCESSOS SELETIVOS ATIVOS</BoldGreenMessage>
                    )
                )
            }
            <ProcessesList selectionProcesses={activeSelectionProcesses} />
        </>
    )
}