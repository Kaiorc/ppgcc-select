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
    width: 100%;
    padding: 1rem;
`

const ListHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${({ isAdmin }) => (isAdmin ? 'space-between' : 'center')};
    gap: 5em;
    align-items: center;
    width: 100%;
    padding: 1rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
`

const List = styled.ul`
    padding: 0 0 1em 0;
    width: 100%;
    list-style: none;
    margin: 0;
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
        font-weight: bold;
        margin: 0.5em 0;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        padding: 1rem;
    }
`

const BoldInfo = styled.b`
    color: grey;
    font-size: 1rem;

    @media (max-width: 768px) {
        font-size: 0.9rem;
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
                        <BoldInfo>{process.miniDescription}</BoldInfo>
                        <p><BoldInfo>Data de início:</BoldInfo> {formatFirestoreDate(process.startDate)}</p>
                        <p><BoldInfo>Data limite:</BoldInfo> {formatFirestoreDate(process.endDate)}</p> 
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