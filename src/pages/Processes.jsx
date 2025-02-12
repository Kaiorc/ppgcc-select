import React from "react"
import { styled } from "styled-components"
import { Link } from "react-router-dom"
import { getProcesses } from "../../services/firebase/firebase-firestore"
import { formatFirestoreDate } from "../../formatters/formatters"
import useRole from "../hooks/useRole"
import Box from "../components/Box"
import Button from "../components/Button"

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const ListHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5em;
    align-items: center;
`

const List = styled.ul`
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    padding: 0;
    width: 100%;
    list-style: none;
    margin: 0;
    width: 100%;

`

const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
    width: 100%;
    gap: 2em;
    border-bottom: 2px solid #E5E5E5;
    &:first-child {
        border-top: 2px solid #E5E5E5;
    }
    &:last-child {
        border-bottom: none;
    }
    &:hover {
        background-color: #E5E5E5;
        transition-duration: 0.2s;
        cursor: pointer;
    }
    &:active {
        background-color: #D9D9D9;
    }

    p { 
        margin: 0.5em 0;
    }

    b { 
        color: grey;
    }
`

export default function Processes() {
    const [selectionProcesses, setSelectionProcesses] = React.useState([])

    const isAdmin = useRole()
    // console.log("Processes.jsx - isAdmin: ", isAdmin)
    
    React.useEffect(() => {
        async function loadProcesses() {
            const data = await getProcesses()
            setSelectionProcesses(data)
        }
        loadProcesses()
    }, [])

    console.log("Processes.jsx - ", selectionProcesses)
    console.log("Processes.jsx - ", typeof selectionProcesses)

    const processesElements = selectionProcesses.map((process) => {
        return (
            <Link 
                to={`/processes/${process.id}`}
                key={process.id}
                aria-label={`Processo seletivo ${process.name}`}
            >
                <ListItem 
                    key={process.id}
                    role="listitem"
                >
                    <h3>{process.name}</h3>
                    <div>
                        <b>{process.miniDescription}</b>
                        <p><b>Data de início:</b> {formatFirestoreDate(process.startDate)}</p>
                        <p><b>Data limite:</b> {formatFirestoreDate(process.endDate)}</p>
                    </div>
                </ListItem>
            </Link>
        )
    })

    return (
        <HomeContainer>
            <Box>
                <ListHeader>
                    <h1>PROCESSOS SELETIVOS</h1>
                    {
                        isAdmin ?
                            <Link to="create-process">
                                <Button type="button">ADICIONAR</Button>  
                            </Link>
                            :
                            null
                    }
                </ListHeader>
                <List role="list">
                    {processesElements}
                </List>
            </Box>
        </HomeContainer>
    )
}