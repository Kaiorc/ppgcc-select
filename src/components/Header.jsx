import React from "react";
import PpgccLogo from "../assets/images/logo-ppgcc.png";
import UeceLogo from "../assets/images/logo-uece.png";
import { styled } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { authLogOut } from "../../services/firebase/firebase-authentication"

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
    margin: 0.6em 10px 10px 0;
`    

const InfoMessage = styled.b`
    color: #fff;
    margin: 0 0 0 2px;
`    

const UeceLogoImg = styled.img`
    max-width: 100%; 
    height: auto;
    width: 26vw;
    max-height: 15vh;
    margin: 10px 0 0 20px;
    object-fit: contain;
`

const PpgccLogoImg = styled.img`
    max-width: 100%; 
    height: auto;
    width: 30vw;
    max-height: 20vh;
    object-fit: contain;
    margin: 10px 0 0 0;
`

const NavigationButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 1em;
    margin: 0.6em 0 0.6em 1.25em;
`

export default function Header() {

    let location = useLocation();

    const navigate = useNavigate()

    const { isLoggedIn, setIsLoggedIn, displayName } = useAuth()

    async function handleLogOutButtonClick() {
        try {
            await authLogOut(setIsLoggedIn)
            navigate("/", { replace: true })
        } catch(error) {
            console.error(error.message)
            throw error
        }
    }
    
    return(
        <HeaderContainer>
            <InfoContainer>
                <Link to="/processes">
                    <UeceLogoImg 
                        src={UeceLogo} 
                        alt='logo' 
                        className="logo-img"
                        />
                </Link>
                {location.pathname !== "/" && location.pathname !== "/processes" && location.pathname !== "/signin" && (
                    <NavigationButtonsContainer>
                        <Button 
                            type="button" 
                            onClick={() => navigate(-1)}
                        >
                            ← VOLTAR
                        </Button>
                        <Button 
                            type="button" 
                            onClick={() => navigate("/")}
                        >
                            ⌂ INÍCIO
                        </Button>
                    </NavigationButtonsContainer>
                )}
            </InfoContainer>
            <InfoContainer>
                <PpgccLogoImg 
                    src={PpgccLogo} 
                    alt='logo' 
                    className="logo-img"
                />
                { isLoggedIn && location.pathname !== "/" && location.pathname !== "/signin" && (
                    <InfoAreaContainer>
                        <InfoMessage>BEM VINDO(A), {displayName ? displayName.toUpperCase() : "CANDIDATO(A)"}</InfoMessage>
                        <Button 
                            type="button"
                            onClick={handleLogOutButtonClick}	
                        >
                            SAIR
                        </Button>
                    </InfoAreaContainer>
                )}
            </InfoContainer>
        </HeaderContainer>
    )
}