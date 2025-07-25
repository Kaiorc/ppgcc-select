import React from "react"
import { styled } from "styled-components"
import { Link } from "react-router-dom"
import { formatFirestoreDate } from "../utils/formatters/formatters"

const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
    width: 100%;
    gap: 0.5em;
    border-bottom: 2px solid #E5E5E5;

    h3 {
        text-transform: uppercase;
        text-align: center;
        width: 50%;
    }

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
    text-transform: uppercase;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`

const ListItemLink = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
    width: 100%;
    gap: 0.5em;
    border-bottom: 2px solid #E5E5E5;
    text-decoration: none;
    color: inherit;

    h3 {
        text-transform: uppercase;
        text-align: center;
        width: 50%;
    }

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

// Componente que renderiza uma lista de processos seletivos e exibe informações básicas
// sobre cada processo
export default function ProcessesList({ selectionProcesses }) {
    // Mapeamento dos processos seletivos recebidos como props e renderização de um item de lista para cada processo
    const processesElements = selectionProcesses.map((process) => {
        return (
            <ListItem 
                key={process.id}
                role="listitem"
            >
                <ListItemLink 
                    to={`/processes/${process.id}`}
                    key={process.id}
                    aria-label={`Processo seletivo ${process.name}`}
                >
                    <h3>{process.name}</h3>
                    <div>
                        <BoldInfo>{process.miniDescription}</BoldInfo>
                        <p><BoldInfo>Início das inscrições:</BoldInfo> {formatFirestoreDate(process.startDate)}</p>
                        <p><BoldInfo>Fim das inscrições:</BoldInfo> {formatFirestoreDate(process.endDate)}</p> 
                    </div>
                </ListItemLink>
            </ListItem>
        )
    })

    return (
        <List role="list">
            {processesElements}
        </List>
    )
}