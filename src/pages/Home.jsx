import React from "react"
import { styled } from "styled-components";
import Box from "../components/Box";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { getProcess } from "../../api";

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
    &:hover {
        background-color: #E5E5E5;
        transition-duration: 0.2s;
        cursor: pointer;
        border-radius: 8px;
    };
    &:active {
        background-color: #D9D9D9;
    };

    p { margin: 0.5em 0; }

    b{ color: grey; }
`

export default function Home() {

    const [selectionProcesses, setSelectionProcesses] = React.useState([])

    React.useEffect(() => {
        async function loadProcesses() {
            const data = await getProcess()
            setSelectionProcesses(data)
        }
        loadProcesses()
    }, [])

    console.log(selectionProcesses)

    const processesElements = selectionProcesses.map((process) => {
        return (
            <Link to={`/${process.id}`}>
                <ListItem key={process.id}>
                    <h3>{process.name}</h3>
                    <div>
                        <b>{process.description}</b>
                        <p><b>Data de início:</b> {process.startDate}</p>
                        <p><b>Data limite:</b> {process.endDate}</p>
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
                    <Button>ADICIONAR</Button>  
                </ListHeader>
                <List>
                    {processesElements}
                </List>
            </Box>
        </HomeContainer>
    )
}