import React from "react"
import { useParams } from "react-router-dom"
import { getUserApplication, updateApplicationStatus } from "../../services/firebase/firebase-firestore"
import { formatTimestamp } from "../../formatters/formatters"
import styled from "styled-components"
import Select from "../components/Select"
import Input from "../components/Input"
import Box from "../components/Box"
import Button from "../components/Button"

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;   
    & h3 {
        margin-bottom: 0;
    }
    & p {
        margin-top: 0;
    }
`

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
`

const TableHead = styled.thead`
    background-color: #f2f2f2;
`

const TableHeader = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
`

const TableRow = styled.tr``

const TableCell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
`

export default function EvaluateApplication() {
    const [application, setApplication] = React.useState(null)
    const [checkboxes, setCheckboxes] = React.useState({})
    const [selectedStatus, setSelectedStatus] = React.useState("")
    const { processId, uid } = useParams()

    const hiddenTableFields = ["uid", "id", "status", "createdAt", "name", "userEmail", "researchArea"]

    React.useEffect(() => {
        async function loadData() {
            try {
                const applicationInfo = await getUserApplication(processId, uid)
                setApplication(applicationInfo)
                // Inicializa o estado selectedStatus com o valor do status atual da inscrição no Firestore
                setSelectedStatus(applicationInfo.status)
    
                // Filtra apenas os campos visíveis para criar checkboxes e inicializa 
                // checkboxes com todos os valores como false
                const initialCheckboxes = Object.keys(applicationInfo)
                    .filter(key => !hiddenTableFields.includes(key))
                    .reduce((acc, key) => {
                        acc[key] = false
                        return acc
                    }, {})
                setCheckboxes(initialCheckboxes)
            } catch (error) {
                console.error("Erro ao carregar a inscrição: ", error)
            }
        }
        loadData()
    }, [processId, uid])
    
    function handleCheckboxChange(key) {
        setCheckboxes(prevCheckboxes => ({
            ...prevCheckboxes,
            [key]: !prevCheckboxes[key]
        }))
    }
    
    function areAllChecked() {
        console.log("Checkboxes:", checkboxes) // Debug
        return Object.values(checkboxes).every(checked => checked === true)
    }
    
    async function handleUpdateStatus() {
        if (areAllChecked() && selectedStatus) {
            try {
                await updateApplicationStatus(processId, uid, selectedStatus)
                alert("Status da inscrição atualizado com sucesso!")
            } catch (error) {
                console.error("Erro ao atualizar o status da inscrição: ", error)
                alert("Erro ao atualizar o status da inscrição.")
            }
        }
    }

    if (!application) {
        return <p>Carregando...</p>
    }

    function formatValue (key, value) {
        if (typeof value === 'string' && value.startsWith("https://cloud.appwrite.io/v1/storage/buckets/")) {
            return (
                <Button onClick={() => window.open(value, "_blank")}>
                    VISUALIZAR DOCUMENTO
                </Button>
            )
        } else if (typeof value === 'object' && value !== null) {
            if (value.seconds && value.nanoseconds) {
                formatTimestamp(value)
            }
            return JSON.stringify(value)
        }
        return value
    }

    const applicationElements = Object.entries(application)
        .filter(([key]) => !hiddenTableFields.includes(key))
        .map(([key, value]) => (
            <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{formatValue(key, value)}</TableCell>
                <TableCell>
                    <Input 
                        type="checkbox" 
                        checked={checkboxes[key] || false} 
                        onChange={() => handleCheckboxChange(key)} 
                    />
                </TableCell>
            </TableRow>
        ))

    return (
        <Box>
            <h1>DETALHES DA INSCRIÇÃO</h1>
            <InfoGrid>
                <InfoContainer>
                    <h3>Nome do Candidato:</h3>
                    <p>{application.name}</p>
                </InfoContainer>
                <InfoContainer>
                    <h3>Email do Candidato:</h3>
                    <p>{application.userEmail}</p>
                </InfoContainer>
                {application.researchArea && (
                    <InfoContainer>
                        <h3>Área de pesquisa:</h3>
                        <p>{application.researchArea}</p>
                    </InfoContainer>
                )}
                <InfoContainer>
                    <h3>Data de inscrição:</h3>
                    <p>{formatTimestamp(application.createdAt)}</p>
                </InfoContainer>
                <InfoContainer>
                    <h3>Status da inscrição:</h3>
                    <p>{application.status}</p>
                </InfoContainer>
            </InfoGrid>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableHeader>DADO SOLICITADO</TableHeader>
                        <TableHeader>DADO FORNECIDO</TableHeader>
                        <TableHeader>VERIFICADO</TableHeader>
                    </TableRow>
                </TableHead>
                <tbody>
                    {applicationElements}
                </tbody>
            </StyledTable>
            {areAllChecked() && (
                <>
                    <Select
                        value={selectedStatus}
                        onChange={(event) => setSelectedStatus(event.target.value)}
                        optionPlaceholder="Selecione o novo status"
                        optionsArray={["Não analisada", "Indeferida", "Deferida"]}
                    />
                    <Button 
                        type="button" 
                        onClick={handleUpdateStatus} 
                        disabled={!selectedStatus}
                    >
                        MODIFICAR STATUS
                    </Button>
                </>
            )}
        </Box>
    )
}