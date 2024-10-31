import React from "react";
import PpgccLogo from "../assets/images/logo-ppgcc.png";
import UeceLogo from "../assets/images/logo-uece.png";
import { styled } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import useAuth from "../hooks/useAuth";

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
    gap: 20px;
    margin: 2px 10px 10px 0;
`    

const InfoMessage = styled.p`
    color: #fff;
    margin: 0 0 0 2px;
`    

const UeceLogoImg = styled.img`
    width: 26vw;
    height: 15vh;
    margin: 10px 0 0 20px;
`

const PpgccLogoImg = styled.img`
    width: 28vw;
    height: 14vh;
`

export default function Header() {

    let location = useLocation();
    console.log(location.pathname)

    const { isLoggedIn } = useAuth();

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
                { isLoggedIn && location.pathname !== "/" && location.pathname !== "/signin" && (
                    <InfoAreaContainer>
                        <InfoMessage>BEM VINDO(A), XXXXX XXXXXXXXX</InfoMessage>
                        <Button> SAIR </Button>
                    </InfoAreaContainer>
                )}
            </InfoContainer>
        </HeaderContainer>
    )
}