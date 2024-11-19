import { styled } from "styled-components";

const StyledSelect = styled.select`
    background-color: #f5f5f5;
    width: 100%;
    height: 40px;
    margin: 10px 0;
    padding: 1.2em;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    &:focus {
        border: 1px solid #008442;
    }
    option.placeholder {
        color: black; /* Cor do placeholder */
    }
`;

export default function Select({ children, ...props }) {
    return (
        <StyledSelect {...props}>
            {children}
        </StyledSelect>
    )
}