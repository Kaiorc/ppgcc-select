import React from "react"
import ReactLoading from 'react-loading'
import { useNavigate, useParams } from "react-router-dom"
import { getUserApplication, updateApplicationStatus } from "../../services/firebase/firebase-firestore"
import { formatTimestamp, formatFirestoreDate } from "../utils/formatters/formatters"
import styled from "styled-components"
import Select from "../components/Select"
import Input from "../components/Input"
import Box from "../components/Box"
import Button from "../components/Button"

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 5em; 
`

const EvaluateApplicationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const EvaluateApplicationBox = styled(Box)`
    width: 100%;
    max-width: 1500px;
    min-width: 300px; 
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

const Title = styled.h1`
    text-align: center;
`

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    
    padding: 0 1rem 1rem 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;   
    & h3 {
        margin-bottom: 0;
    }
    & p {
        font-size: 1.2rem;
        margin-top: 0;
    }
`

const StatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    & h2 {
        margin: 0;
        text-align: center;
    }
`

function getStatusColor(status) {
    switch (status) {
        case "Não analisada":
            return "#F0852E"; // Laranja
        case "Indeferida":
            return "red"; // Vermelho
        case "Deferida":
            return "#006734"; // Verde
        default:
            return "#006734"; // Verde adicionado como padrão
    }
}

const Status = styled.p`
    text-transform: uppercase;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    background-color: ${props => getStatusColor(props.$status)};
    padding: 0.8rem;
    border-radius: 20px;

    @media (max-width: 600px) {
        font-size: 1rem;
        text-align: center;
    }
`

const StyledTableContainer = styled.div`
    width: 90%;
    padding: 0 1rem 1rem 1rem;
    overflow-x: auto;
    isolation: isolate;
`

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    min-width: 600px;
    max-width: 100%;
`

const SelectWrapper = styled.div`
    width: 100%;
    max-width: 300px;
    padding: 0 1rem;

    @media (max-width: 768px) {
        max-width: 100%;
    }
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 1rem;
    margin-bottom: 1em;

    & button {
        max-width: 300px;
        width: 100%;

        @media (max-width: 768px) {
            max-width: 100%;
        }
    }
`

const TableHead = styled.thead`
    background-color: #f2f2f2;
`

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  color: white;
  background-color: #008442;
`

const TableRow = styled.tr`

`

const TableCell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    font-weight: bold;
`

const BoldGreenMessage = styled.p`
    color: #008442;
    font-weight: bold;
    padding: 0 1em;
    margin: 0;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.2em;
    }   
`

// Componente principal da página de avaliação da inscrição
export default function EvaluateApplication() {
    // Estados para armazenar a inscrição, carregamento, status e checkboxes      
    const [application, setApplication] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [selectedStatus, setSelectedStatus] = React.useState("")
    const [checkboxes, setCheckboxes] = React.useState({})

    // Obtém os parâmetros da URL e o hook de navegação
    const { processId, uid } = useParams()
    const navigate = useNavigate()

    // Define os campos que não devem ser exibidos na tabela
    const hiddenTableField = ["researchArea"]

    // useEffect para carregar os dados da inscrição quando o componente é montado
    React.useEffect(() => {
        // Função assíncrona para carregar os dados da inscrição
        async function loadData() {
            try {
                const applicationInfo = await getUserApplication(processId, uid)
                if (!applicationInfo) {
                    // Se não houver inscrição (ou processo inexistente), redireciona para a página de erro
                    navigate("/not-found", { replace: true })
                    return
                }
                setApplication(applicationInfo)
                // Inicializa o estado selectedStatus com o valor do status atual da inscrição no Firestore
                setSelectedStatus(applicationInfo.status)
    
                // Filtra apenas os campos visíveis para criar checkboxes e inicializa 
                // checkboxes com todos os valores como false
                const initialCheckboxes = Object.keys(applicationInfo.candidateProvidedData)
                    .filter(key => !hiddenTableField.includes(key))
                    .reduce((acc, key) => {
                        acc[key] = false
                        return acc
                    }, {})
                setCheckboxes(initialCheckboxes)
                setLoading(false)
            } catch (error) {
                console.error("Erro ao carregar a inscrição: ", error)
                navigate("/not-found", { replace: true })
            }
        }
        loadData()
    }, [processId, uid])

    // Função para formatar o valor de cada campo
    function formatValue(key, value) {
        if (value && typeof value === 'object' && value.format && value.id) {
            return (
                <Button 
                    onClick={() => handleViewDocument(value.format, value.id)}
                >
                    VISUALIZAR DOCUMENTO
                </Button>
            )
        } else if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
            // Verifica se o valor é uma string no formato de data YYYY-MM-DD
            return formatFirestoreDate(value)
        } else if (typeof value === 'object' && value !== null) {
            if (value.seconds && value.nanoseconds) {
            formatTimestamp(value)
            }
            return JSON.stringify(value)
        }
        return value
    }

    // Função para lidar com a visualização de documentos
    function handleViewDocument(fileFormat, fileId) {
        // Redireciona para a rota '/viewdocument' passando a URL via state
        navigate(`/processes/${processId}/applications/evaluate/${uid}/view-document`, { state: { fileFormat: fileFormat, fileId: fileId } })
    }
    
    // Função para lidar com mudanças nos checkboxes
    function handleCheckboxChange(key) {
        setCheckboxes(prevCheckboxes => ({
            ...prevCheckboxes,
            [key]: !prevCheckboxes[key]
        }))
    }
    
    // Função para verificar se todos os checkboxes estão marcados
    function areAllChecked() {
        console.log("Checkboxes:", checkboxes)
        return Object.values(checkboxes).every(checked => checked === true)
    }
    
    // Função para lidar com a atualização do status da inscrição
    async function handleUpdateStatus() {
        if (areAllChecked() && selectedStatus) {
            try {
                await updateApplicationStatus(processId, uid, selectedStatus)
                setApplication(prev => ({ ...prev, status: selectedStatus }))
            } catch (error) {
                console.error("Erro ao atualizar o status da inscrição: ", error)
                alert("Erro ao atualizar o status da inscrição.")
            }
        }
    }

    // Se estiver carregando, exibe um loader
    if(loading){
        return (
            <Box>
                <LoaderContainer>
                    <ReactLoading 
                        type={"spinningBubbles"}
                        color={"#008442"}
                        height={"10%"}
                        width={"10%"}
                    />
                </LoaderContainer>
            </Box>
        )
    }

    // Mapeia os dados da inscrição para exibição na tabela, filtrando os campos ocultos
    const applicationElements = Object.entries(application.candidateProvidedData)
        .filter(([key]) => !hiddenTableField.includes(key))
        .map(([key, value]) => {
            const checkboxId = `checkbox-${key}`
            return (
            <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{formatValue(key, value)}</TableCell>
                <TableCell>
                    <Input 
                        id={checkboxId}
                        type="checkbox" 
                        checked={checkboxes[key] || false} 
                        onChange={() => handleCheckboxChange(key)} 
                    />
                    <label htmlFor={checkboxId} style={{ marginLeft: "0.5em" }}>
                        <span className="sr-only">{`Verificar ${key}`}</span>
                    </label>
                </TableCell>
            </TableRow>
        )
    })

    return (
        <EvaluateApplicationContainer>
            <EvaluateApplicationBox>
                <TitleContainer>
                    <Title>DETALHES DA INSCRIÇÃO</Title>
                </TitleContainer>
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
                </InfoGrid>
                <StatusContainer>
                    <h2>STATUS DA INSCRIÇÃO:</h2>
                    <Status aria-live="polite" $status={application.status}>
                        {application.status}
                    </Status>
                    <BoldGreenMessage>O STATUS PODERÁ SER ALTERADO APÓS VERIFICAR TODOS OS DADOS</BoldGreenMessage>
                </StatusContainer>
                {areAllChecked() && (
                    <>
                        <SelectWrapper>
                            <Select
                                value={selectedStatus}
                                onChange={(event) => setSelectedStatus(event.target.value)}
                                optionPlaceholder="Selecione o novo status"
                                optionsArray={["Não analisada", "Indeferida", "Deferida"]}
                                />
                        </SelectWrapper>
                        <ButtonWrapper>
                            <Button 
                                type="button" 
                                onClick={handleUpdateStatus} 
                                disabled={!selectedStatus}
                                >
                                MODIFICAR STATUS
                            </Button>
                        </ButtonWrapper>
                    </>
                )}
                <StyledTableContainer>
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
                </StyledTableContainer>
            </EvaluateApplicationBox>
        </EvaluateApplicationContainer>
    )
}