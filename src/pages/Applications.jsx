import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import styled from "styled-components"
import { getApplications, loadProcess } from "../../services/firebase/firebase-firestore"
import { formatFirestoreDate } from "../utils/formatters/formatters"
import PpgccLogo from "../assets/images/logo-ppgcc.png"
import UeceLogo from "../assets/images/logo-uece.png"
import PpgccSelectLogoTop from "../assets/images/logo-ppgcc-select-top-cropped.png"
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

// Função para agrupar as inscrições por área de pesquisa
function groupByResearchArea(data) {
    return data.reduce((acc, application) => {
        // Acessa researchArea dentro de candidateProvidedData, com fallback caso não exista
        const researchArea = application.candidateProvidedData?.researchArea || 'Sem área de pesquisa'
        if (!acc[researchArea]) {
            acc[researchArea] = []
        }
        acc[researchArea].push(application)
        return acc
    }, {})
}

// Função para formatar a data de criação das inscrições
function formatCreatedAt(data) {
    return data.map(info => ({
        ...info,
        createdAt: new Date(info.createdAt.seconds * 1000).toLocaleDateString()
    }))
}

// Função para formatar os dados das inscrições para exibição na tabela
function formatApplicationData(applications) {
    return applications.map(application => ({
        NOME: application.name,
        "EMAIL DO USUÁRIO": application.userEmail,
        "DATA DE CRIAÇÃO": application.createdAt,
        STATUS: application.status,
        uid: application.uid
    }))
}

// Função para verificar se o estado de inscrições está vazio
function isApplicationsStateEmpty(applications) {
    return applications.length === 0 || (applications.length === 1 && applications[0].uid === "placeholder")
}

// Componente principal da página de aplicações
export default function Applications() {
    // Estados para armazenar as inscrições e o processo de seleção
    const [applications, setApplications] = React.useState([])
    const [selectionProcess, setSelectionProcess] = React.useState(null)

    // Hooks do React Router para obter o ID do processo seletivo a partir dos parâmetros da URL
    // e para navegação entre páginas
    const { processId } = useParams()
    const navigate = useNavigate()

    // Hook do React para carregar os dados do processo seletivo e as inscrições quando o componente é montado
    React.useEffect(() => {
        // Função assíncrona para carregar os dados do processo seletivo e as inscrições
        async function loadData() {
            const process = await loadProcess(processId)
            setSelectionProcess(process)
            // Se o processo não existir, o usuário é redirecionado para a página de erro
            if (!process) {
                navigate("/not-found", { replace: true })
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

    // Função para lidar com a navegação para a página de avaliação de uma inscrição
    function handleEvaluate(uid) {
        // console.log("UID recebido no handleEvaluate:", uid)
        navigate(`evaluate/${uid}`)
    }

    // Função para exportar a lista das inscrições deferidas em PDF
    function handleExportResult() {
        if (!selectionProcess) return
      
        const doc = new jsPDF()
        const pageWidth = doc.internal.pageSize.getWidth()
      
        doc.setFillColor(0, 132, 66) // verde (#008442)
        doc.rect(0, 0, pageWidth, 65, "F") // altura 65
        
        // Largura e altura das imagens
        const ppgccWidth = 70, ppgccHeight = 22
        const ppgccSelectWidth = 70, ppgccSelectHeight = 38
        const ueceWidth = 65, ueceHeight = 22
      
        // Espaço entre as imagens
        const spacingBetweenImages = 0.1
      
        // Soma total das larguras das três imagens + espaços
        const totalImagesWidth =
          ppgccWidth + ppgccSelectWidth + ueceWidth +
          spacingBetweenImages * 2
      
        // Posição X inicial para que as imagens fiquem centralizadas
        const startX = (pageWidth - totalImagesWidth) / 2
        // Posição Y onde as imagens ficarão
        const yPos = 2
      
        // Adiciona as imagens individualmente, usando as larguras e alturas definidas
        doc.addImage(UeceLogo, "PNG", startX, yPos, ueceWidth, ueceHeight)
        doc.addImage(
          PpgccSelectLogoTop,
          "PNG",
          startX + ueceWidth + spacingBetweenImages,
          yPos,
          ppgccSelectWidth,
          ppgccSelectHeight
        )
        doc.addImage(
          PpgccLogo,
          "PNG",
          startX + ueceWidth + ppgccSelectWidth + spacingBetweenImages * 2,
          yPos,
          ppgccWidth,
          ppgccHeight
        )
      
        // Define texto em branco e em negrito
        doc.setTextColor(255, 255, 255)
        doc.setFont(undefined, "bold")
      
        // Aumenta o tamanho da fonte para dar mais destaque ao nome do processo
        doc.setFontSize(24)
        // Posição Y do título (um pouco abaixo das imagens)
        const textY = 50
        doc.text(selectionProcess.name.toUpperCase(), pageWidth / 2, textY, {
          align: "center"
        })
      
        // Texto secundário com fonte um pouco menor
        doc.setFontSize(20)
        doc.text("CLASSIFICADOS PARA A PRÓXIMA FASE", pageWidth / 2, textY + 10, {
          align: "center"
        })
      
        // Reseta a cor do texto para preto
        doc.setTextColor(0, 0, 0)
      
        // Ajusta o startY da tabela para ficar mais afastada do cabeçalho
        let yPosition = textY + 20 // espaço extra entre texto e tabela
      
        // Filtra os candidatos deferidos
        const deferredCandidates = applications.filter(app => app.status === "Deferida")
        const tableColumns = ["NOME", "EMAIL"]
        const tableRows = deferredCandidates.map(candidate => [candidate.name, candidate.userEmail])
      
        autoTable(doc, {
          head: [tableColumns],
          body: tableRows,
          startY: yPosition,
          theme: "grid",
          tableLineColor: [240, 133, 46],
          tableLineWidth: 0.5,
          styles: {
            fontSize: 12,
            halign: "center"
          },
          headStyles: {
            fillColor: [0, 132, 66],
            textColor: 255,
            halign: "center",
            fontStyle: "bold",
            fontSize: 14
          },
          bodyStyles: {
            fillColor: "#f5f5f5",
            halign: "center",
            fontStyle: "bold"
          },
          didDrawCell: function (data) {
            const { cell, column, row, table } = data
            const doc = data.doc
            // Customização de bordas em verde
            if (row.index < table.body.length - 1) {
              doc.setDrawColor(0, 132, 66)
              doc.setLineWidth(0.5)
              doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height)
            }
            if (column.index < table.columns.length - 1) {
              doc.setDrawColor(0, 132, 66)
              doc.setLineWidth(0.5)
              doc.line(cell.x + cell.width, cell.y, cell.x + cell.width, cell.y + cell.height)
            }
          }
        })
      
        // Salva o PDF
        doc.save(`Resultado - Classificados da Primeira Fase - ${selectionProcess.name}.pdf`)
    }

    // Verifica se o processo seletivo requer agrupamento por área de pesquisa
    const isGrouped = selectionProcess?.researchFieldRequired
    // Agrupa as inscrições por área de pesquisa, se necessário, caso contrário, coloca todas as inscrições
    // em uma única chave vazia
    const groupedApplications = isGrouped ? groupByResearchArea(applications) : { "": applications }

    // Formata os dados das inscrições para exibição na tabela
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
                            A EXPORTAÇÃO DA LISTA DE APROVADOS SERÁ LIBERADA APENAS QUANDO TODAS AS INSCRIÇÕES DO PROCESSO SELETIVO FOREM ANALISADAS 
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