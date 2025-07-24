import React from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'
import Button from './Button'
import { getProcesses } from "../../services/firebase/firebase-firestore"

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2em;
`

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  & h2 {
    text-align: center;
  }
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1em;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1em 1em 1em;
  overflow-y: auto;
`

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 1em 0 1em 0;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
`

const ListItem = styled.li`
  padding: 1em;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`

// Componente que renderiza um modal para importar campos de processos seletivos
export default function ImportProcessFieldModal({ onClose, onImport }) {
  const [processes, setProcesses] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  // useEffect para carregar os processos seletivos ao montar o componente
  // e atualizar o estado de loading
  React.useEffect(() => {
    async function loadData() {
      const data = await getProcesses()
      setProcesses(data)
      setLoading(false)
    }
    loadData()
  }, [])

  // Renderiza o modal com uma lista de processos seletivos para importar campos
  // e um botão para fechar o modal
  const processesElements = processes.map((process) => {
    return (
      <ListItem key={process.id} onClick={() => onImport(process)}>
        <h3>{process.name}</h3>
        <p>{process.miniDescription}</p>
      </ListItem>
    )
  })

  return (
    <ModalBackground>
      <ModalContainer>
        <TitleContainer>
          <h1>IMPORTAR CAMPOS</h1>
        </TitleContainer>
        <ContentContainer>
          <ButtonContainer>
            <Button onClick={onClose} type="button">FECHAR</Button>
          </ButtonContainer>
          <h2>SELECIONE UM DOS PROCESSOS SELETIVOS PARA IMPORTAR OS CAMPOS</h2>
          { loading ?
              <LoaderContainer>
                  <ReactLoading 
                      type={"spinningBubbles"}
                      color={"#008442"}
                      height={"10%"}
                      width={"10%"}
                  />
              </LoaderContainer>
            : 
              <List>
                {processesElements}
              </List>
          }
        </ContentContainer>
      </ModalContainer>
    </ModalBackground>
  )
}