import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

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
`

const ModalContainer = styled.div`
  background-color: white;
  padding: 2em;
  border-radius: 8px;
  width: 300px;
`

const CheckboxContainer = styled.div`
  margin-bottom: 1em;
`

export default function RegistrationFieldModal({ onClose, onSave }) {
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('text');
  const [isRequired, setIsRequired] = useState(false);

  const handleSave = () => {
    onSave({ name: fieldName, type: fieldType, required: isRequired });
    onClose();
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <h2>ADICIONAR CAMPO</h2>
        <Input
          type="text"
          placeholder="Nome do Campo"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
        <Select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
        >
          <option value="text">Texto</option>
          <option value="number">Número</option>
          <option value="date">Data</option>
          <option value="email">Email</option>
          <option value="file">Arquivo</option>
        </Select>
        <CheckboxContainer>
          <label>
            <input
              type="checkbox"
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
            />
            Obrigatório
          </label>
        </CheckboxContainer>
        <Button onClick={onClose}>CANCELAR</Button>
        <Button onClick={handleSave}>SALVAR</Button>
      </ModalContainer>
    </ModalBackground>
  );
}