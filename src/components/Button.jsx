import React from "react"
import ReactLoading from 'react-loading'
import { styled } from "styled-components"

const StyledButton = styled.button`
    background-color: #006734;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    // flex: 1; /* Permite que o botão cresça para preencher o espaço disponível */

    &:hover {
        background-color: #F0852E;
        transition-duration: 0.2s;
    };
    &:active {
        background-color: #A45516;
    };
`

// Componente de botão reutilizável que recebe filhos, função de clique, tipo, classe e estado de carregamento
export default function Button({ children, onClick, type, className, loading }) {   

    return(
        <StyledButton onClick={onClick} type={type} className={className} disabled={loading}>
            {loading ? (
                <ReactLoading 
                    type="spinningBubbles"
                    color="#FFF"
                    height={20}
                    width={20}
                />
            ) : (
                children
            )}
        </StyledButton>
    )
}