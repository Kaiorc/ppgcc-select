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
  border-radius: 8px;
  width: 300px;
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
  padding: 1em;

  & h1 {
      text-transform: uppercase;
      text-align: center;
  }
`

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1em 1em 1em;
  & input, select {
      margin-top: 0;
  }
`

const BoldLabel = styled.label`
  font-weight: bold;
  & p {
      margin: 0;
      font-weight: normal;
      font-size: 1em;
      color: #008442;
  }
`

const RequiredLabel = styled(BoldLabel)`
  display: flex;
  align-items: center;
  gap: 5px;
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
  & input[type="checkbox"] {
      margin: 0;
  }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1em;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

// Componente que renderiza o modal de registro de campos. Recebe as responsáveis por abrir e salvar o modal,
// além de um campo para editar, caso exista. 
export default function RegistrationFieldModal({ onClose, onSave, fieldToEdit }) {
  // Estado local para armazenar os dados do campo
  const [fieldData, setFieldData] = React.useState({
    name: '',
    type: 'text',
    required: false
  })

  // useEffect para inicializar os dados do campo se fieldToEdit estiver definido
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

  // Função para lidar com as mudanças nos campos do formulário
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFieldData(prevFieldData => ({
      ...prevFieldData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  // Função para salvar os dados do campo e fechar o modal
  function handleSave() {
    onSave(fieldData)
    onClose()
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <TitleContainer>
          <h2>{ fieldToEdit ? 'EDITAR CAMPO' : 'ADICIONAR CAMPO' }</h2>
        </TitleContainer>
        <SettingsContainer>
          <BoldLabel htmlFor='name'>
            Nome do campo:
            <Input
              type="text"
              name="name"
              placeholder="Nome do Campo"
              value={fieldData.name}
              onChange={handleChange}
            />
          </BoldLabel>
          <BoldLabel htmlFor='type'>
            Tipo de entrada do campo:
            <Select
              name="type"
              value={fieldData.type}
              onChange={handleChange}
              optionPlaceholder="Selecione o tipo de entrada"
            >
              <option value="text">Texto</option>
              <option value="number">Número</option>
              <option value="date">Data</option>
              <option value="email">Email</option>
              <option value="file">Arquivo</option>
            </Select>
          </BoldLabel>
          <CheckboxContainer>
            <RequiredLabel htmlFor='required'>
              <Input
                name="required"
                type="checkbox"
                checked={fieldData.required}
                onChange={handleChange}
              />
              Obrigatório
            </RequiredLabel>
          </CheckboxContainer>
          <ButtonContainer>
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
          </ButtonContainer>
        </SettingsContainer>
      </ModalContainer>
    </ModalBackground>
  )
}