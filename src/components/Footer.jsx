import React from "react"
import { styled } from "styled-components";

const StyledFooter = styled.footer`
    background-color: #008442;
    color: #ffff;
    height: 74px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    font-weight: bold;
`

export default function Footer() {


    return (
        <StyledFooter>&#169; 2024 PPGCCelect</StyledFooter>
    )
}