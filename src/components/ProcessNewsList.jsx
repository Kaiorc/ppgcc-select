import React from "react"
import { styled } from "styled-components"
import { Link } from "react-router-dom"

const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
    width: 100%;
    gap: 2em;
    border-bottom: 2px solid #E5E5E5;
    flex-wrap: no-wrap;

    p { 
        font-weight: bold;
        margin: 0.5em 0;
    }

    h2 {
        margin: 0;
        font-size: 1.2rem;
        text-transform: uppercase;
        text-align: center;
        width: 60%;
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

    text-align: left;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`

const ListItemLink = styled(Link)`
    width: 100%; 
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    color: inherit;
`

// Componente que renderiza a lista de avisos do processo
export default function ProcessNewsList({ news }) {
    // Mapeamento dos avisos recebidos como props e renderização de um item de lista para cada aviso
    const newsElements = news.map((processNews) => {
        // Extrai o título e o corpo da notícia da prop processNews
        const body = processNews.body
        // Limita o preview do corpo do aviso a 250 caracteres e adiciona "..."
        // no final para indicar que o texto foi truncado
        const preview = body.substring(0, 250) + "..."

        return (
            <ListItem 
                key={processNews.id}
                role="listitem"
            >
                <ListItemLink 
                    to={`./${processNews.id}`}
                    aria-label={`Aviso do processo ${processNews.title}`}
                >
                    <h2>{processNews.title}</h2>
                    <div>
                        <BoldInfo>{preview}</BoldInfo>
                    </div>
                </ListItemLink>
            </ListItem>
        )
    })

    return (
        <List role="list">
            {newsElements}
        </List>
    )
}