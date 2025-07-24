import React from "react"
import styled from "styled-components"
import Button from "./Button"

// Container do alerta ajustado para ter tamanho máximo e responsividade
const AlertContainer = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    padding: 1em;
    border: 1px solid #f5c6cb;
    border-radius: 4px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;       
    bottom: 20px;           
    left: 50%;              
    transform: translateX(-50%);
    max-width: 600px;       
    width: calc(100% - 40px);
    z-index: 9999;

    @media (max-width: 480px) {
        padding: 0.75em;     
        font-size: 0.9em; 
    }
`

// Estilização para a mensagem do alerta
const AlertMessage = styled.p`
    flex-grow: 1;
    margin: 0;
    text-align: center;
    font-weight: bold;
`

// Botão para fechar o alerta (utilizando o componente Button já existente)
const RedButton = styled(Button)`
    background-color: red;
    color: white;

    &:hover {
        background-color: darkred;
    }
`

// Componente que recebe a mensagem, a função de fechar e nãorenderiza
// se não houver mensagem
export default function AlertBox({ message, onClose }) {
    // Não renderiza nada se não houver mensagem
    if (!message) return null

    return (
        <AlertContainer>
            <AlertMessage>{message}</AlertMessage>
            {onClose && (
            <RedButton onClick={onClose} aria-label="Fechar alerta">
                &times;
            </RedButton>
            )}
        </AlertContainer>
    )
}
