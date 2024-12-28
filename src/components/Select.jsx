import React from "react";
import { styled } from "styled-components";

const StyledSelect = styled.select`
    background-color: #f5f5f5;
    width: 100%;
    height: 40px;
    margin: 10px 0;
    padding: 0 10px;
    border: 2px solid #008442;
    border-radius: 5px;
    outline: none;
    font-size: 1rem;
    &:focus {
        border: 2px solid #008442;
    }
    option.placeholder {
        color: black;
    }
`

const Select = React.forwardRef(({ children, optionPlaceholder, optionsArray, ...props }, ref) => {
    return (
        <StyledSelect ref={ref} {...props}>
            <option value="" className="placeholder">
                {optionPlaceholder}
            </option>
            {
                optionsArray ? (
                    optionsArray.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))
                ) : (
                    children
                )
            }
        </StyledSelect>
    )
})

export default Select

// export default function Select({ children, ...props }) {
//     return (
//         <StyledSelect {...props}>
//             {children}
//         </StyledSelect>
//     )
// }