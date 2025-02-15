import React from "react"
import { styled } from "styled-components"

const StyledInput = styled.input`
    background-color: #f5f5f5;
    width: 100%;
    height: 40px;
    margin: 10px 0;
    padding: 1.2em;
    border: 2px solid #008442;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    &:focus {
        border: 2px solid #F0852E;
    }
    &[type="file"] {
        min-height: 40px;
        appearance: none; /* Evita estilos nativos do navegador */
    }

    &[type="checkbox"] {
        width: 1.5em; 
        height: 1.5em; 
        margin: 0 0.5em 0 0;
        cursor: pointer;
    }
`

// Define o Input usando React.forwardRef() para que o ref possa ser passado para o <input>
// e o React Hook Form possa acessar o <input> diretamente
const Input = React.forwardRef(
    ({ name, onChange, type, placeholder, value, min, required, disabled, ...rest }, ref) => {
        return (
            <StyledInput
                name={name}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                value={value}
                min={type === "number" ? min : undefined}
                required={required}
                disabled={disabled}
                ref={ref} // Passa o ref para o <input>
                {...rest} // Passa outras props adicionais
            />
        )
    }
)

export default Input

// export default function Input({ name, onChange, type, placeholder, value, min, required, ...rest }) {
    
//     return (
//         <StyledInput
//             name={name}
//             onChange={onChange}
//             type={type}
//             placeholder={placeholder}
//             value={value}
//             min={type === "number" ? min : 1}
//             required={required}
//             {...rest} // Passa as props adicionais (como as do `register`)
//         />
//     )
// }