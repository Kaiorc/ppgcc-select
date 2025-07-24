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

const ErrorMessage= styled.p`
    color: red;
`

// Componente de modal para confirmação de exclusão, recebe a função de exclusão e o estado do modal
// e exibe uma mensagem de confirmação, além de um botão para cancelar ou confirmar a exclusão
export default function DeleteModal({ setIsModalOpen, handleDelete, error }) {
    // Estado para controlar o carregamento da exclusão
    const [deletionLoading, setDeletionLoading] = React.useState(false)

    // Função que lida com a exclusão, chama a função de exclusão passada como prop e trata o estado de carregamento.
    // Se ocorrer um erro, ele é capturado e exibido no console
    async function handleDeletion() {
        try {
            setDeletionLoading(true)
            await handleDelete()
        }
        catch (error) {
            console.error(error)
        } finally {
            setDeletionLoading(false)
        }
    }
    
    return (
        <ModalOverlay>
            <ModalContent>
                <TitleContainer>
                    <h3>TEM CERTEZA QUE DESEJA EXCLUIR?</h3>
                </TitleContainer>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ButtonContainer>
                    <Button onClick={() => setIsModalOpen(false)}>
                        CANCELAR
                    </Button>
                    <RedButton onClick={handleDeletion} loading={deletionLoading}>
                        CONFIRMAR
                    </RedButton>
                </ButtonContainer>
            </ModalContent>
        </ModalOverlay>
    )
}