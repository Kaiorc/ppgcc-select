import React from "react"
import ReactLoading from 'react-loading'
import styled from "styled-components"
import { getProcessesWithUserApplications } from "../../../services/firebase/firebase-firestore"
import useAuth from "../../hooks/useAuth"
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

export default function MyApplicationsProcesses() {
    const [myApplicationsSelectionProcesses, setMyApplicationsSelectionProcesses] = React.useState([])

    const [loading, setLoading] = React.useState(true)

    const { uid } = useAuth()

    React.useEffect(() => {
        async function loadData() {
            const myApplicationsProcesses = await getProcessesWithUserApplications(uid)
            console.log("ActiveProcesses.jsx - myApplicationsSelectionProcesses: ", myApplicationsSelectionProcesses)
            setMyApplicationsSelectionProcesses(myApplicationsProcesses)
            setLoading(false)
        }
        loadData()
    }, [])

    console.log("MyApplicationsProcesses.jsx - ", myApplicationsSelectionProcesses)

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
                ) : ( myApplicationsSelectionProcesses.length === 0 && (
                        <BoldGreenMessage>VOCÊ NÃO ESTÁ INSCRITO EM PROCESSOS SELETIVOS</BoldGreenMessage>
                    )
                )
            }
            <ProcessesList selectionProcesses={myApplicationsSelectionProcesses} />
        </>
    )
}