import React from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'

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

export default function RegistrationFieldModal({ onClose, onSave, fieldToEdit }) {
  const [fieldData, setFieldData] = React.useState({
    name: '',
    type: 'text',
    required: false
  })

  React.useEffect(() => {
    if (fieldToEdit) {
      setFieldData({
        name: fieldToEdit.name,
        type: fieldToEdit.type,
        required: fieldToEdit.required,
        index: fieldToEdit.index
      })
    }
  }, [fieldToEdit])

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFieldData(prevFieldData => ({
      ...prevFieldData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function handleSave() {
    onSave(fieldData)
    onClose()
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <h2>{ fieldToEdit ? 'EDITAR CAMPO' : 'ADICIONAR CAMPO' }</h2>
        <Input
          type="text"
          name="name"
          placeholder="Nome do Campo"
          value={fieldData.name}
          onChange={handleChange}
        />
        <Select
          name="type"
          value={fieldData.type}
          onChange={handleChange}
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
            name="required"
              type="checkbox"
              checked={fieldData.required}
              onChange={handleChange}
            />
            Obrigatório
          </label>
        </CheckboxContainer>
        <Button 
          type="button"
          onClick={onClose}
        >
          CANCELAR
        </Button>
        <Button
          type="button"
          onClick={handleSave}
        >
          SALVAR
        </Button>
      </ModalContainer>
    </ModalBackground>
  );
}