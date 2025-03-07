import React from "react"
import styled from "styled-components"
import Button from "./Button"

// Container do alerta ajustado para ter tamanho máximo e responsividade
const AlertContainer = styled.div`
    background-color: #f8d7da; /* Fundo vermelho claro */
    color: #721c24; /* Texto vermelho escuro */
    padding: 1em;
    border: 1px solid #f5c6cb;
    border-radius: 4px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;        /* Fixa o alerta na tela */
    bottom: 20px;           /* Distância da parte inferior */
    left: 50%;              /* Centraliza horizontalmente */
    transform: translateX(-50%);
    max-width: 600px;       /* Largura máxima */
    width: calc(100% - 40px);  /* Garante margens laterais em telas menores */
    z-index: 9999;          /* Fica acima dos outros elementos */

    @media (max-width: 480px) {
        padding: 0.75em;      /* Ajuste de padding para telas menores */
        font-size: 0.9em;     /* Diminui o tamanho da fonte se necessário */
    }
`

// Estilização para a mensagem do alerta
const AlertMessage = styled.p`
    flex-grow: 1;
    margin: 0;
    text-align: center;
    font-weight: bold;
`

// Botão para fechar o alerta (utilizando o Button já existente)
const RedButton = styled(Button)`
    background-color: red;
    color: white;

    &:hover {
        background-color: darkred;
    }
`

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
