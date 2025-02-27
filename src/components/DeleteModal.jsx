import React from "react"
import styled from "styled-components"
import Button from "./Button"

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const TitleContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 0 1em 0;
    border-radius: 8px 8px 0 0;
    background-color: #008442;

    & h1 {
        text-transform: uppercase;
        text-align: center;
    }
`

const ModalContent = styled.div`
    background: white;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    width: 90%;
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1em;
    gap: 1em;
    flex-wrap: wrap;

    @media (max-width: 425px) {
        flex-direction: column-reverse;
        width: 100%;
        gap: 0.5em;
    }
`

const RedButton = styled(Button)`
  background-color: red;
  color: white;

  &:hover {
    background-color: darkred;
  }
`

export default function DeleteModal({ setIsModalOpen, handleDelete }) {
    
    return (
        <ModalOverlay>
            <ModalContent>
                <TitleContainer>
                    <h3>TEM CERTEZA QUE DESEJA EXCLUIR?</h3>
                </TitleContainer>
                <ButtonContainer>
                    <Button onClick={() => setIsModalOpen(false)}>
                        CANCELAR
                    </Button>
                    <RedButton onClick={handleDelete}>
                        CONFIRMAR
                    </RedButton>
                </ButtonContainer>
            </ModalContent>
        </ModalOverlay>
    )
}