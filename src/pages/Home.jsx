import React from "react"
import { styled } from "styled-components";
import Button from "../components/Button";
import { getProcesses } from "../../api";

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const HomeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 2em 0 8em 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`

const ListHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 5em;
    align-items: center;
`

const List = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    border-bottom: 1px solid #ccc;
    width: 100%;
`

export default function Home() {

    const [selectionProcesses, setSelectionProcesses] = React.useState([])

    React.useEffect(() => {
        async function loadProcesses() {
            const data = await getProcesses()
            setSelectionProcesses(data)
        }

        loadProcesses()
    }, [])

    console.log(selectionProcesses)

    const processesList = selectionProcesses.map((process) => {
        return (
            <ListItem key={process.id}>
                <h3>{process.name}</h3>
                <p>{process.description}</p>
                <p>{process.startDate}</p>
                <p>{process.endDate}</p>
                <Button>EDITAR</Button>
                <Button>EXCLUIR</Button>
            </ListItem>
        )
    })

    return (
        <HomeContainer>
            <HomeBox>
                <ListHeader>
                    <h1>PROCESSOS SELETIVOS</h1>
                    <Button>ADICIONAR</Button>  
                </ListHeader>
                <List>
                    {processesList}
                </List>
            </HomeBox>
        </HomeContainer>
    )
}