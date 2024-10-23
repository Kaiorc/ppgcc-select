import { styled } from "styled-components";

const StyledBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 2em 0 8em 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`

export default function Box({ children }) {

    return(
        <StyledBox>
            {children}
        </StyledBox>
    )
}