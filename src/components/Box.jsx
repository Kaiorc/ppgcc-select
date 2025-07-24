import { styled } from "styled-components";

const StyledBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 2em 8em 2em;
    border-radius: 8px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`

// Componente que renderiza uma caixa estilizada, pode ser usado para agrupar outros componentes
// e recebe os filhos e uma classe opcional para personalização
export default function Box({ children, className }) {

    return(
        <StyledBox className={className}>
            {children}
        </StyledBox>
    )
}