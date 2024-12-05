import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getProcess, updateProcess } from "../../api"
import { Link } from "react-router-dom"
import Input from "../components/Input"
import TextArea from "../components/TextArea"
import Button from "../components/Button"
import Box from "../components/Box"
import Table from "../components/Table"
import RegistrationFieldModal from "../components/RegistrationFieldModal"
import ImportProcessFieldModal from "../components/ImportProcessFieldModal"

const EditProcessBox = styled(Box)`
    padding: 1em;
`

const EditProcessFormContainer = styled.form`
    
`

const InputContainer = styled.div`
    /* & input[type=date] { */
    & input, textarea {
        margin-top: 0;
    };
`

const ButtonContainer = styled.div`

`

const TableHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const RedButton = styled(Button)`
  background-color: red;
  color: white;

  &:hover {
    background-color: darkred;
  }
`

function mapFieldType(type) {
    switch(type) {
        case 'text':
            return 'Texto';
        case 'number':
            return 'Número';
        case 'date':
            return 'Data';
        case 'email':
            return 'Email';
        case 'file':
            return 'Arquivo';
        default:
            return type;
    }
}

export default function EditProcess() {

    const [selectionProcessData, setSelectionProcessData] = React.useState({
        name: "", 
        places: "",
        miniDescription: "", 
        description: "",
        startDate: "",
        endDate: "",
        endAnalysisDate: "", 
        registrationFieldsInfo: []
    })

    const { id } = useParams()

    React.useEffect(() => {
        async function loadProcess() {
            const data = await getProcess(id)
            setSelectionProcessData(data)
        }
        loadProcess()
    }, [id])

    const [isImportModalOpen, setIsImportModalOpen] = React.useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = React.useState(false);
    const [fieldBeingEdited, setFieldBeingEdited] = React.useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            // Destructuring do id do objeto do getDoc() do Firebase e 
            // criando um novo objeto sem o id para evitar redundância
            const { id, ...dataWithoutId } = selectionProcessData;
            await updateProcess(id, dataWithoutId);
            console.log("Processo editado com sucesso!");
        } catch (error) {
            console.error("Erro ao editar processo: ", error);
        }
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setSelectionProcessData(prevSelectionProcessData => ({
            ...prevSelectionProcessData,
            [name]: value
        }));
    }

    function handleAddField(field) {
        setSelectionProcessData(prevSelectionProcessData => ({
            ...prevSelectionProcessData,
            registrationFieldsInfo: [...prevSelectionProcessData.registrationFieldsInfo, field]
        }));
    }

    function handleImportFields(process) {
        setSelectionProcessData(prevSelectionProcessData => ({
            ...prevSelectionProcessData,
            registrationFieldsInfo: [
                ...prevSelectionProcessData.registrationFieldsInfo,
                ...process.registrationFieldsInfo
            ]
        }));
        setIsImportModalOpen(false);
    }

    function handleDeleteField(index) {
        setSelectionProcessData(prevSelectionProcessData => ({
            ...prevSelectionProcessData,
            registrationFieldsInfo: prevSelectionProcessData.registrationFieldsInfo.filter((_, i) => i !== index)
        }))
    }

    function handleEditField(index) {
        setFieldBeingEdited({ ...selectionProcessData.registrationFieldsInfo[index], index })
        setIsEditModalOpen(true)
    }

    function handleSaveEditedField(editedField) {
        setSelectionProcessData(prevSelectionProcessData => {
            const updatedFields = [...prevSelectionProcessData.registrationFieldsInfo]
            updatedFields[editedField.index] = editedField
            return {
                ...prevSelectionProcessData,
                registrationFieldsInfo: updatedFields
            }
        })
        setIsEditModalOpen(false)
    }

    return (
        <EditProcessBox>
            <h1>EDITAR PROCESSO SELETIVO</h1>
            <EditProcessFormContainer onSubmit={handleSubmit}>
                <h2>DADOS MÍNIMOS OBRIGATÓRIOS</h2>
                    <InputContainer>
                        <label htmlFor="name">
                            Nome
                            <Input
                                name="name"
                                onChange={handleChange}
                                type="text"
                                placeholder="Nome"
                                value={selectionProcessData.name}
                                aria-label="Nome"
                                required
                            />
                        </label>
                        <label htmlFor="places">
                            Número de vagas
                            <Input
                                name="places"
                                onChange={handleChange}
                                type="number"
                                min= "1"
                                placeholder="Número de vagas"
                                value={selectionProcessData.places}
                                aria-label="Número de Vagas"
                                required
                            />
                        </label>
                        <label htmlFor="miniDescription">
                            Mini descrição
                            <Input
                                name="miniDescription"
                                onChange={handleChange}
                                type="text"
                                placeholder="Mini Descrição"
                                value={selectionProcessData.miniDescription}
                                aria-label="Mini Descrição"
                                required
                            />
                        </label>
                        <label htmlFor="description">
                            Descrição
                            <TextArea
                                name="description"
                                onChange={handleChange}
                                type="text"
                                placeholder="Descrição"
                                value={selectionProcessData.description}
                                aria-label="Descrição"
                                required
                            />
                        </label>
                        <label htmlFor="startDate">
                            Data de início de inscrição
                            <Input
                                name="startDate"
                                onChange={handleChange}
                                type="date"
                                placeholder="Data de início"
                                value={selectionProcessData.startDate}
                                aria-label="Data de início"
                                required
                            />
                        </label>
                        <label htmlFor="endDate">
                            Data de término de inscrição
                            <Input
                                name="endDate"
                                onChange={handleChange}
                                type="date"
                                placeholder="Data de término"
                                value={selectionProcessData.endDate}
                                aria-label="Data de término"
                                required
                            />    
                        </label>
                        <label htmlFor="endAnalysisDate">
                            Data de limite da análise de inscrição
                            <Input
                                name="endAnalysisDate"
                                onChange={handleChange}
                                type="date"
                                placeholder="Data de término da análise"
                                value={selectionProcessData.endAnalysisDate}
                                aria-label="Data de término da análise"
                                required
                            />
                        </label>
                    </InputContainer>
                    <TableHeaderContainer>
                        <h2>DADOS SOLICITADOS AO CANDIDATO</h2>
                        <ButtonContainer>
                            <Button 
                                type="button"
                                onClick={() => setIsImportModalOpen(true)}
                            >
                                IMPORTAR
                            </Button>
                            <Button 
                                type="button" 
                                onClick={() => setIsRegistrationModalOpen(true)}
                            >
                                + CAMPO
                            </Button>
                        </ButtonContainer>
                    </TableHeaderContainer>
                    <Table 
                        columnsNames={["Nome", "Tipo", "Obrigatório"]} 
                        data={selectionProcessData.registrationFieldsInfo.map(field => ({
                            Nome: field.name,
                            Tipo: mapFieldType(field.type),
                            Obrigatório: field.required ? "Sim" : "Não"
                        }))}
                        onEditField={handleEditField}
                        onDeleteField={handleDeleteField}
                    />
                    <ButtonContainer>
                        <Link to={`/processes/${id}`}>
                            <Button type="button">
                                CANCELAR
                            </Button>
                        </Link>
                        <Button type="submit">
                            CONFIRMAR
                        </Button>
                    </ButtonContainer>
                {
                    isRegistrationModalOpen && (
                        <RegistrationFieldModal 
                            onClose={() => setIsRegistrationModalOpen(false)} 
                            onSave={handleAddField} 
                        />
                    )
                }
                {
                    isImportModalOpen && (
                        <ImportProcessFieldModal 
                            onClose={() => setIsImportModalOpen(false)} 
                            onImport={handleImportFields} 
                        />
                    )
                }
                {
                    isEditModalOpen && (
                        <RegistrationFieldModal 
                            onClose={() => setIsEditModalOpen(false)} 
                            onSave={handleSaveEditedField} 
                            fieldToEdit={fieldBeingEdited}
                        />
                    )
                }
            </EditProcessFormContainer>
        </EditProcessBox>
    );
}