import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import styled from "styled-components"
import { getApplications, loadProcess } from "../../services/firebase/firebase-firestore"
import { formatFirestoreDate } from "../utils/formatters/formatters"
import Box from "../components/Box"
import Button from "../components/Button"
import ApplicationsTable from "../components/ApplicationsTable"

const ApplicationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TitleContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 8px 8px 0 0;
    background-color: #008442;

    & h1 {
        text-transform: uppercase;
        text-align: center;
    }
`

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
    
    padding: 0 1em;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        text-align: center;
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
        margin-top: 0;
    }

    @media (max-width: 768px) {
        align-items: center;
        font-size: 1.2em;
    }   
`

const TablesContainer = styled.div`
    padding: 0 1em 1em 1em;

    & h2 {
        text-align: center;
    }
`

const InfoMessage = styled.h1`
    text-align: center;
`

const BoldGreenMessage = styled.p`
    color: #008442;
    font-weight: bold;
    padding: 0 1em 1em 1em;
    margin: 0;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.2em;
    }   
`

function groupByResearchArea(data) {
    return data.reduce((acc, application) => {
        const { researchArea } = application
        if (!acc[researchArea]) {
            acc[researchArea] = []
        }
        acc[researchArea].push(application)
        return acc
    }, {})
}

function formatCreatedAt(data) {
    return data.map(info => ({
        ...info,
        createdAt: new Date(info.createdAt.seconds * 1000).toLocaleDateString()
    }))
}

function formatApplicationData(applications) {
    return applications.map(application => ({
        NOME: application.name,
        "EMAIL DO USUÁRIO": application.userEmail,
        "DATA DE CRIAÇÃO": application.createdAt,
        STATUS: application.status,
        uid: application.uid
    }))
}

function isApplicationsStateEmpty(applications) {
    return applications.length === 0 || (applications.length === 1 && applications[0].uid === "placeholder")
}

export default function Applications() {
    const [applications, setApplications] = React.useState([])
    const [selectionProcess, setSelectionProcess] = React.useState(null)

    const { processId } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function loadData() {
            const process = await loadProcess(processId)
            setSelectionProcess(process)
            // Se o processo não existir, o usuário é redirecionado para a página de erro
            if (!process) {
                navigate("/not-found")
                return
            }
            const applications = await getApplications(processId)
            const formattedApplications = formatCreatedAt(applications)
            setApplications(formattedApplications)
        }
        loadData()
    }, [processId])

    // Verifica se não há inscrições no processo seletivo
    const isApplicationsEmpty = isApplicationsStateEmpty(applications)

    // Verifica se todas as inscrições foram avaliadas (status diferente de "Não analisada")
    const allEvaluated = applications.length > 0 && applications.every(app => app.status !== "Não analisada")

    function handleEvaluate(uid) {
        console.log("UID recebido no handleEvaluate:", uid)
        navigate(`evaluate/${uid}`)
    }

    // Função para exportar a lista das inscrições deferidas em PDF
    function handleExportResult() {
        if (!selectionProcess) return

        const doc = new jsPDF()
        const pageWidth = doc.internal.pageSize.getWidth()

        // Desenha um header com fundo verde
        doc.setFillColor(0, 132, 66) // cor verde (#008442) em RGB
        doc.rect(0, 0, pageWidth, 30, "F") // retângulo preenchido com altura de 35

        // Define texto em branco, negrito e centralizado no header
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(26)
        doc.setFont(undefined, 'bold')
        // Converte o nome do processo para maiúsculo
        doc.text(selectionProcess.name.toUpperCase(), pageWidth / 2, 15, { align: "center" })

        doc.setFontSize(16)
        doc.text("CLASSIFICADOS PARA A PRÓXIMA FASE", pageWidth / 2, 25, { align: "center" })

        // Reseta a cor do texto para preto para o restante do documento
        doc.setTextColor(0, 0, 0)

        // Inicia abaixo do header
        let yPosition = 35

        // Filtra os candidatos com inscrição deferida
        const deferredCandidates = applications.filter(app => app.status === "Deferida")
        const tableColumns = ["NOME", "EMAIL"]
        const tableRows = deferredCandidates.map(candidate => [candidate.name, candidate.userEmail])
        
        // Cria a tabela com os candidatos deferidos
        autoTable(doc, {
            head: [tableColumns],
            body: tableRows,
            startY: yPosition,
            theme: "grid",
            tableLineColor: [240, 133, 46],  // Define a cor laranja para as bordas
            tableLineWidth: 0.5,            // Ajusta a largura das bordas
            styles: {
                fontSize: 12,     // Tamanho da fonte padrão na tabela
                halign: 'center'  // Centraliza o texto nas células
            },
            headStyles: {
                fillColor: [0, 132, 66], // Cabeçalho verde
                textColor: 255,          // Texto branco no cabeçalho
                halign: 'center',        // Centraliza o texto no cabeçalho
                fontStyle: 'bold',       // Texto em negrito no cabeçalho
                fontSize: 14             // Fonte do cabeçalho um pouco maior
            },
            bodyStyles: {
                fillColor: "#f5f5f5", // Fundo das células em #f5f5f5
                halign: 'center',     // Centraliza o texto nas células
                fontStyle: 'bold'     // Texto em negrito no corpo da tabela
            },
            didDrawCell: function(data) {
                const { cell, column, row, table } = data;
                const doc = data.doc;
                // Se não for a última linha, redesenha a borda inferior da célula em verde
                if (row.index < table.body.length - 1) {
                    doc.setDrawColor(0, 132, 66); // verde
                    doc.setLineWidth(0.5);
                    doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
                }
                // Se não for a última coluna, redesenha a borda direita da célula em verde
                if (column.index < table.columns.length - 1) {
                    doc.setDrawColor(0, 132, 66); // verde
                    doc.setLineWidth(0.5);
                    doc.line(cell.x + cell.width, cell.y, cell.x + cell.width, cell.y + cell.height);
                }
            }
        })

        // Salva o PDF
        doc.save(`Resultado - ${selectionProcess.name}.pdf`)
    }

    const isGrouped = selectionProcess?.researchFieldRequired;
    const groupedApplications = isGrouped ? groupByResearchArea(applications) : { "": applications };

    const tablesElements = Object.keys(groupedApplications).map(researchArea => (
        <div key={researchArea}>
            {researchArea && <h2>{researchArea}</h2>}
            <ApplicationsTable 
                columnsNames={["NOME", "EMAIL DO USUÁRIO", "DATA DE CRIAÇÃO", "STATUS"]} 
                data={formatApplicationData(groupedApplications[researchArea])}
                onEvaluate={handleEvaluate}
            />
        </div>
    ))

    return (
        <ApplicationsContainer>
            <Box>
                {selectionProcess && (
                    <>  
                        <TitleContainer>
                            <h1>{selectionProcess.name}</h1>
                        </TitleContainer>
                        <h2>DETALHES</h2>
                        <BoldGreenMessage>
                            A EXPORTAÇÃO DA LISTA DE APROVADOS SERÁ LIBERADA APENAS QUANDO TODA AS INSCRIÇÕES DO PROCESSO SELETIVO FOREM ANALISADAS 
                        </BoldGreenMessage>
                        { !isApplicationsEmpty && allEvaluated && (
                            <Button onClick={handleExportResult}>
                                EXPORTAR RESULTADO
                            </Button>
                        )}
                        <InfoGrid>
                            <InfoContainer>
                                <h3>Número de vagas:</h3>
                                <p>{selectionProcess.places}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <h3>Data de início de inscrição:</h3>
                                <p>{formatFirestoreDate(selectionProcess.startDate)}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <h3>Data limite de inscrição:</h3>
                                <p>{formatFirestoreDate(selectionProcess.endDate)}</p>
                            </InfoContainer>
                            <InfoContainer>
                                <h3>Data limite de análise de inscrição:</h3>
                                <p>{formatFirestoreDate(selectionProcess.endAnalysisDate)}</p>
                            </InfoContainer>
                        </InfoGrid>
                        <InfoMessage>INSCRIÇÕES</InfoMessage>
                        { isApplicationsEmpty ? (
                                <BoldGreenMessage>AINDA NÃO HÁ INSCRIÇÕES NESSE PROCESSO SELETIVO</BoldGreenMessage>
                            ) : (
                                <TablesContainer>
                                    {tablesElements}
                                </TablesContainer>
                            )
                        }
                        </>
                    )}
            </Box>
        </ApplicationsContainer>
    )   
}