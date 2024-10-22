import React from "react"
import { styled } from "styled-components";
import Button from "../components/Button";

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const HomeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: 2em 0 8em 0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
`

const ListHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 2em;
`

export default function Home() {

    return (
        <HomeContainer>
            <HomeBox>
                <ListHeader>
                    <h1>PROCESSOS SELETIVOS</h1>
                    <Button>ADICIONAR</Button>  
                </ListHeader>
            </HomeBox>
        </HomeContainer>
    )
}