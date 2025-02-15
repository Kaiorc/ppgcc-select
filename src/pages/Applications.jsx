import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getApplications, loadProcess } from "../../services/firebase/firebase-firestore"
import { formatFirestoreDate } from "../../formatters/formatters"
import styled from "styled-components"
import Box from "../components/Box"
import ApplicationsTable from "../components/ApplicationsTable"

const ApplicationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
    width: 100%;
    margin-bottom: 1em;
    padding: 1em;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        text-align: center;
    }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media (max-width: 768px) {
        align-items: center;
    }
    & h3 {
        margin-bottom: 0;
    }
    & p {
        margin-top: 0;
    }
`

const TablesContainer = styled.div`
    padding: 0 1em 1em 1em;
`

const EmptyApplicationMessage = styled.p`
    color: #008442;
    font-weight: bold;
    padding: 0 1em 1em 1em;
    text-align: center;
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

function isApplicationsStateEmpty(applications) {
    return applications.length === 0 || (applications.length === 1 && applications[0].uid === "placeholder")
}

export default function Applications() {
    const [applications, setApplications] = React.useState([])
    const [selectionProcess, setSelectionProcess] = React.useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function loadData() {
            const applications = await getApplications(id)
            const formattedApplications = formatCreatedAt(applications)
            setApplications(formattedApplications)
            const process = await loadProcess(id)
            setSelectionProcess(process)
        }
        loadData()
    }, [id])

    console.log("applications", applications)

    const groupedApplications = groupByResearchArea(applications)

    const isApplicationsEmpty = isApplicationsStateEmpty(applications)

    function handleEvaluate(uid) {
        console.log("UID recebido no handleEvaluate:", uid)
        navigate(`evaluate/${uid}`)
    }

    const tablesElements = Object.keys(groupedApplications).map(researchArea => (
        <div key={researchArea}>
            <h2>{researchArea}</h2>
            <ApplicationsTable 
                columnsNames={["NOME", "EMAIL DO USUÁRIO", "DATA DE CRIAÇÃO", "STATUS"]} 
                data={groupedApplications[researchArea].map(application => ({
                    NOME: application.name,
                    "EMAIL DO USUÁRIO": application.userEmail,
                    "DATA DE CRIAÇÃO": application.createdAt,
                    STATUS: application.status,
                    uid: application.uid
                }))}
                onEvaluate={handleEvaluate}
            />
        </div>
    ))

    return (
        <ApplicationsContainer>
            {selectionProcess && (
                <Box>
                    <h1>INSCRIÇÕES</h1>
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
                    { isApplicationsEmpty ? (
                        <EmptyApplicationMessage>AINDA NÃO HÁ INSCRIÇÕES NESSE PROCESSO SELETIVO</EmptyApplicationMessage>
                    ) : (
                        <TablesContainer>
                            {tablesElements}
                        </TablesContainer>
                    )}
                </Box>
            )}
        </ApplicationsContainer>
    )   
}