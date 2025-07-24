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

    h3 {
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

// Componente que renderiza a lista de avisos do processo
export default function ProcessNewsList({ news }) {
    // Mapeamento dos avisos recebidos como props e renderização de um item de lista para cada aviso
    const newsElements = news.map((processNews) => {
        // Extrai o título e o corpo da notícia da prop processNews
        const body = processNews.body
        // Limita o preview do corpo da notícia a 250 caracteres e adiciona "..."
        // no final para indicar que o texto foi truncado
        const preview = body.substring(0, 250) + "..."

        return (
            <Link 
                to={`./${processNews.id}`}
                key={processNews.id}
                aria-label={`Notícia do processo ${processNews.title}`}
            >
                <ListItem 
                    key={processNews.id}
                    role="listitem"
                >
                    <h3>{processNews.title}</h3>
                    <div>
                        <BoldInfo>{preview}</BoldInfo>
                    </div>
                </ListItem>
            </Link>
        )
    })

    return (
        <List role="list">
            {newsElements}
        </List>
    )
}