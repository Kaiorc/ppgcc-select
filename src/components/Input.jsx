import { styled } from "styled-components";

const StyledInput = styled.input`
    background-color: #f5f5f5;
    width: 100%;
    height: 40px;
    margin: 10px 0;
    padding: 1.2em;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
`

export default function Input({ name, onChange, type, placeholder, value }) {
    
    return (
        <StyledInput
            name={name}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            value={value}
        />
    )
}