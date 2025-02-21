import React from "react"
import { styled } from "styled-components"
import { Link } from "react-router-dom"
import { formatFirestoreDate } from "../../formatters/formatters"

const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
    width: 100%;
    gap: 2em;
    border-bottom: 2px solid #E5E5E5;

    p { 
        font-weight: bold;
        margin: 0.5em 0;
    }

    & div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

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

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        padding: 1rem;
    }
`

const List = styled.ul`
    padding: 0 0 1em 0;
    width: 100%;
    list-style: none;
    margin: 0;
`

const BoldInfo = styled.b`
    color: grey;
    font-size: 1rem;

    text-align: center;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`

// Componente que renderiza uma lista de processos seletivos
export default function ProcessesList({ selectionProcesses }) {
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
                        <p><BoldInfo>Início das inscrições:</BoldInfo> {formatFirestoreDate(process.startDate)}</p>
                        <p><BoldInfo>Fim das inscrições:</BoldInfo> {formatFirestoreDate(process.endDate)}</p> 
                    </div>
                </ListItem>
            </Link>
        )
    })

    return (
        <List role="list">
            {processesElements}
        </List>
    )
}