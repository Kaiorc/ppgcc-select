import { styled } from "styled-components";

const StyledButton = styled.button`
    background-color: #006734;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    flex: 1; /* Permite que o botão cresça para preencher o espaço disponível */

    &:hover {
        background-color: #F0852E;
        transition-duration: 0.2s;
    };
    &:active {
        background-color: #A45516;
    };
`

export default function Button({ children, onClick, type }) {   

    return(
        <StyledButton onClick={onClick} type={type}>
            {children}
        </StyledButton>
    )
}