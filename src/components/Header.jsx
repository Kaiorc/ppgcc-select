import React from "react"
import PpgccLogo from "../assets/images/logo-ppgcc.png"
import UeceLogo from "../assets/images/logo-uece.png"
import PpgccSelectLogoSide from "../assets/images/logo-ppgcc-select-side-cropped.png"
import PpgccSelectLogoTop from "../assets/images/logo-ppgcc-select-top-cropped.png"
import { styled } from "styled-components"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { authLogOut } from "../../services/firebase/firebase-authentication"
import { formatFirstTwoNames } from "../utils/formatters/formatters"
import useAuth from "../hooks/useAuth"
import Button from "./Button"

const HeaderContainer = styled.header`
    background-color: #008442;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: no-wrap;
    padding: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0px;
`    
    
const InfoAreaContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 0.6em 10px 10px 0;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
        margin: 1em 0 0 0;
    }
`    

const InfoMessage = styled.b`
    color: #fff;
    margin: 0;
    text-align: center;
    font-size: 1rem;

    @media (max-width: 480px) {
        font-size: 0.9rem;
    }
`    

const UeceLogoImg = styled.img`
    width: 22vw;
    max-width: 490px;
    min-width: 180px;
    height: auto;
    margin: 10px;
    object-fit: contain;

    @media (max-width: 1024px) {
        width: 25vw;
    }

    @media (max-width: 768px) {
        width: 55vw;
        display: none;
    }

    @media (max-width: 480px) {
        width: 65vw;
    }
`

const PpgccSelectLogoSideImg = styled.img`
    width: 35vw;
    max-width: 576px;
    min-width: 200px;
    height: auto;
    margin: 1em 1em 1em 5em;
    object-fit: contain;

    @media (max-width: 1024px) {
        width: 30vw;
        margin: 1em 1em 1em 2em;
    }

    @media (max-width: 768px) {
        width: 60vw;
        display: none;
    }

    @media (max-width: 480px) {
        width: 70vw;
    }
`

const PpgccSelectLogoTopImg = styled.img`
    width: 28vw;
    max-width: 576px;
    min-width: 200px;
    height: auto;
     margin: 0.5em 0.5em 0 0.5em;
    object-fit: contain;
    display: none;


    @media (max-width: 768px) {
        width: 60vw;
        display: flex;
    }

    @media (max-width: 480px) {
        width: 70vw;
    }
`

const PpgccLogoImg = styled.img`
    width: 28vw;
    max-width: 576px;
    min-width: 200px;
    height: auto;
    margin: 10px;
    object-fit: contain;

    @media (max-width: 1024px) {
        width: 30vw;
    }

    @media (max-width: 768px) {
        width: 60vw;
        display: none;
    }

    @media (max-width: 480px) {
        width: 70vw;
    }
`

const NavigationButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;
    margin: 0.6em 0;

    @media (max-width: 768px) {
        gap: 10px;
        margin: 0;
    }
`
// Função que verifica se os botões de navegação devem ser exibidos, de acordo com a rota atual
function shouldShowNavigationButtons(location) {
    // return location.pathname !== "/" && location.pathname !== "/processes" && location.pathname !== "/signin"
    const hiddenPaths = ["/", "/signin", "/forgotten-password", "/email-verification", "/processes", "/processes/active", "/processes/inactive", "/processes/my-applications"]
    return !hiddenPaths.includes(location.pathname)
}

// Função que verifica se a área de informações deve ser exibida, de acordo com o estado de autenticação e a rota atual
function shouldShowInfoArea(isLoggedIn, location) {
    // return isLoggedIn && location.pathname !== "/" && location.pathname !== "/signin"
    const hiddenPaths = ["/", "/signin", "/forgotten-password"]
    return isLoggedIn && !hiddenPaths.includes(location.pathname)
}

// Componente Header que renderiza o cabeçalho da aplicação
export default function Header() {
    // O hook useLocation obtém a rota atual
    let location = useLocation()
    
    // O hook useNavigate é usado para navegar entre as rotas
    const navigate = useNavigate()
    
    // O hook useAuth obtém o estado de autenticação do usuário e o nome de exibição do usuário
    const { isLoggedIn, setIsLoggedIn, displayName } = useAuth()

    // Função que lida com o clique do botão de logout
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
            <PpgccSelectLogoTopImg
                src={PpgccSelectLogoTop} 
                alt='logo' 
                className="logo-img"
            />
            <InfoContainer>
                <UeceLogoImg 
                    src={UeceLogo} 
                    alt='logo' 
                    className="logo-img"
                />
                { shouldShowNavigationButtons(location) && (
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
            <PpgccSelectLogoSideImg
                src={PpgccSelectLogoSide} 
                alt='logo' 
                className="logo-img"
            />
            <InfoContainer>
                <PpgccLogoImg 
                    src={PpgccLogo} 
                    alt='logo' 
                    className="logo-img"
                />
                { shouldShowInfoArea(isLoggedIn, location) && (
                    <InfoAreaContainer>
                        <InfoMessage>BEM VINDO(A), {displayName ? formatFirstTwoNames(displayName).toUpperCase() : "CANDIDATO(A)"}</InfoMessage>
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