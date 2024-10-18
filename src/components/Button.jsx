import React from "react";
import { styled } from "styled-components";


export default function Button({ children, onClick }) {
    
    const Button = styled.button`
        background-color: #006734;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
        width: 30%;
        &:hover {
            background-color: #F0852E;
            transition-duration: 0.6s;
        };
        &:active {
            background-color: #A45516;
        };
    `

    return(
        <Button onClick={onClick}>
            {children}
        </Button>
    )
}