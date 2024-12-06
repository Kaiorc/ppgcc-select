import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { getProcesses } from "../../firebase/firebase-firestore";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 2em;
  border-radius: 8px;
  width: 500px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 1em;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function ImportProcessFieldModal({ onClose, onImport }) {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    async function loadProcesses() {
      const data = await getProcesses();
      setProcesses(data);
    }
    loadProcesses();
  }, []);

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
        <h1>Importar Campos de Processo Seletivo</h1>
        <h2>Selecione um processo para importar os campos</h2>
        <List>
          { processesElements }
        </List>
        <Button onClick={onClose} type="button">Fechar</Button>
      </ModalContainer>
    </ModalBackground>
  );
}