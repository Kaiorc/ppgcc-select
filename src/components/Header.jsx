import React from "react";
import PpgccLogo from "../assets/images/logo-ppgcc.png";
import UeceLogo from "../assets/images/logo-uece.png";
import PpgccSymbol from "../assets/images/symbol-ppgcc.png";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";

const HeaderContainer = styled.header`
    background-color: #008442;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0px;
`    
    
const InfoAreaContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0px;
    margin: 2px 10px 20px 0;
`    

const InfoMessage = styled.p`
    color: #fff;
    margin: 0 0 0 20px;
`    

const UeceLogoImg = styled.img`
    width: 30vw;
    height: 18vh;
    margin: 10px 0 0 20px;
`

const PpgccLogoImg = styled.img`
    width: 30vw;
    height: 15vh;
`

export default function Header() {

    return(
        <HeaderContainer>
            <Link to="/">
                <UeceLogoImg 
                    src={UeceLogo} 
                    alt='logo' 
                    className="logo-img"
                />
            </Link>
            <InfoContainer>
                <PpgccLogoImg 
                    src={PpgccLogo} 
                    alt='logo' 
                    className="logo-img"
                />
                <InfoAreaContainer>
                    <InfoMessage>BEM VINDO(A), XXXXX XXXXXXXXX</InfoMessage>
                    <Button> SAIR </Button>
                </InfoAreaContainer>
            </InfoContainer>
        </HeaderContainer>
    )
}