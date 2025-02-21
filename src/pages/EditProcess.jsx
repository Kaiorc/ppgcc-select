import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getProcess, updateProcess, processHasApplications } from "../../services/firebase/firebase-firestore"
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
    min-width: 300px; // Adicionando min-width
    
    @media (max-width: 1024px) {
        max-width: 900px;
    }

    @media (max-width: 768px) {
        max-width: 100%;
    }

    @media (max-width: 480px) {
        max-width: 100%;
        
    }

    @media (max-width: 345px) {
        padding: 0.25em;
        margin: 1em 0.5em;
    }
`

const EditProcessFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 0 1em 1em 1em;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;

    & input, textarea {
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

const ResearchFieldRequiredLabel = styled(BoldLabel)`
    display: flex;
    align-items: center;
    gap: 5px;
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

const TableHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

const RedButton = styled(Button)`
  background-color: red;
  color: white;

  &:hover {
    background-color: darkred;
  }
`

const ResearchFieldMessage = styled.p`
    color: red;
    margin-top: 0;
`

const ErrorMessage = styled.p`
    color: red;
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
        researchFieldRequired: false,
        startDate: "",
        endDate: "",
        endAnalysisDate: "", 
        registrationFieldsInfo: []
    })

    const [hasApplications, setHasApplications] = React.useState(false)

    const navigate = useNavigate()
    const { id } = useParams()

    React.useEffect(() => {
        async function loadProcess() {
            const data = await getProcess(id)
            setSelectionProcessData(data)
            const applications = await processHasApplications(id)
            // console.log("hasApplications", applications)
            setHasApplications(applications)
        }
        loadProcess()
    }, [id])
    
    React.useEffect(() => {
        if (selectionProcessData.endDate) {
            const endDate = new Date(selectionProcessData.endDate)
            endDate.setDate(endDate.getDate() + 10)
            setSelectionProcessData(prevSelectionProcessData => ({
                ...prevSelectionProcessData,
                endAnalysisDate: endDate.toISOString().split('T')[0]
            }))
        }
    }, [selectionProcessData.endDate])

    const [isImportModalOpen, setIsImportModalOpen] = React.useState(false)
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = React.useState(false)
    const [fieldBeingEdited, setFieldBeingEdited] = React.useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            // Destructuring do id do objeto do getDoc() do Firebase e 
            // criando um novo objeto sem o id para evitar redundância
            const { id, ...dataWithoutId } = selectionProcessData
            await updateProcess(id, dataWithoutId)
            console.log("Processo editado com sucesso!")
            navigate(`/processes/${id}`, { replace: true })
        } catch (error) {
            console.error("Erro ao editar processo: ", error)
        }
    }

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        if (name === "endDate" && new Date(value) <= new Date(selectionProcessData.startDate)) {
            alert("A data de término deve ser maior que a data de início.")
            return
        }
        setSelectionProcessData(prevSelectionProcessData => ({
            ...prevSelectionProcessData,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    function handleAddField(field) {
        const isDuplicate = selectionProcessData.registrationFieldsInfo.some(existingField => existingField.name === field.name);
        if (isDuplicate) {
            alert("Um campo com esse nome já existe.");
            return;
        }
        setSelectionProcessData(prevSelectionProcessData => ({
            ...prevSelectionProcessData,
            registrationFieldsInfo: [...prevSelectionProcessData.registrationFieldsInfo, field]
        }));
    }

    function handleImportFields(process) {
        const newFields = process.registrationFieldsInfo.filter(importedField => 
            !selectionProcessData.registrationFieldsInfo.some(existingField => existingField.name === importedField.name)
        );

        if (newFields.length < process.registrationFieldsInfo.length) {
            alert("Alguns campos não foram importados porque já existem.");
        }

        setSelectionProcessData(prevSelectionProcessData => ({
            ...prevSelectionProcessData,
            registrationFieldsInfo: [
                ...prevSelectionProcessData.registrationFieldsInfo,
                ...newFields
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
                        <BoldLabel htmlFor="name">
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
                        </BoldLabel>
                        <BoldLabel htmlFor="places">
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
                        </BoldLabel>
                        <BoldLabel htmlFor="miniDescription">
                            Mini descrição
                            <Input
                                name="miniDescription"
                                onChange={handleChange}
                                type="text"
                                placeholder="Mini Descrição"
                                value={selectionProcessData.miniDescription}
                                aria-label="Mini Descrição"
                                maxLength="60"
                                required
                            />
                        </BoldLabel>
                        <BoldLabel htmlFor="description">
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
                        </BoldLabel>
                        <ResearchFieldRequiredLabel htmlFor="researchFieldRequired">
                            <Input
                                name="researchFieldRequired"
                                onChange={handleChange}
                                type="checkbox"
                                placeholder="Linha de pesquisa obrigatória"
                                checked={selectionProcessData.researchFieldRequired}
                                aria-label="Linha de pesquisa obrigatória"
                                disabled={hasApplications ? true : false}
                            />
                            Seleção de linha de pesquisa é obrigatória?
                        </ResearchFieldRequiredLabel>
                        {
                            hasApplications && (
                                <ResearchFieldMessage>O campo acima não pode ser alterado, pois o processo seletivo já possui inscritos</ResearchFieldMessage>
                            )
                        }
                        <BoldLabel htmlFor="startDate">
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
                        </BoldLabel>
                        <BoldLabel htmlFor="endDate">
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
                        </BoldLabel>
                        <BoldLabel htmlFor="endAnalysisDate">
                            Data limite da análise de inscrição
                            <p>Essa data é automaticamente 10 dias após a data de término de inscrição</p>
                            <Input
                                name="endAnalysisDate"
                                onChange={handleChange}
                                type="date"
                                placeholder="Data limite da análise de inscrição"
                                value={selectionProcessData.endAnalysisDate}
                                aria-label="Data limite da análise de inscrição"
                                required
                                disabled
                            />
                        </BoldLabel>
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
                        columnsNames={["NOME", "TIPO", "OBRIGATÓRIO"]} 
                        data={selectionProcessData.registrationFieldsInfo.map(field => ({
                            NOME: field.name,
                            TIPO: mapFieldType(field.type),
                            OBRIGATÓRIO: field.required ? "Sim" : "Não"
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