import React from "react";
import PpgccLogo from "../assets/images/logo-ppgcc.png";
import UeceLogo from "../assets/images/logo-uece.png";
import PpgccSymbol from "../assets/images/symbol-ppgcc.png";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
    background-color: #008442;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
`    

const UeceLogoImg = styled.img`
    width: 30vw;
    height: 18vh;
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
            <Info>
                <PpgccLogoImg 
                    src={PpgccLogo} 
                    alt='logo' 
                    className="logo-img"
                />
                <p>XXXXXXXXXX</p>
            </Info>
        </HeaderContainer>
    )
}