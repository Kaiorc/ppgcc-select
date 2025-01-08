import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getApplications, loadProcess } from "../../firebase/firebase-firestore"
import styled from "styled-components"
import Box from "../components/Box"
import ApplicationsTable from "../components/ApplicationsTable"

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

const TablesContainer = styled.div`

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

    useEffect(() => {
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

    function handleView(uid) {
        navigate(`view/${uid}`)
    }

    function handleEvaluate(index) {
        const application = applications[index]
        // Implementar lógica para avaliar a aplicação
        console.log("Avaliar aplicação:", application)
    }

    const tablesElements = Object.keys(groupedApplications).map(researchArea => (
        <div key={researchArea}>
            <h2>{researchArea}</h2>
            <ApplicationsTable 
                columnsNames={["Nome", "ID do Usuário", "Data de Criação", "Status"]} 
                data={groupedApplications[researchArea].map(application => ({
                    Nome: application.name,
                    "ID do Usuário": application.uid,
                    "Data de Criação": application.createdAt,
                    Status: application.status
                }))}
                onView={handleView}
                onEvaluate={handleEvaluate}
            />
        </div>
    ))

    return (
        <>
            {selectionProcess && (
                <>
                    <h1>Inscrições</h1>
                    <InfoContainer>
                    <h3>Número de vagas:</h3>
                    <p>{selectionProcess.places}</p>
                    </InfoContainer>
                    <InfoContainer>
                    <h3>Data de início de inscrição:</h3>
                    <p>{selectionProcess.startDate}</p>
                    </InfoContainer>
                    <InfoContainer>
                    <h3>Data limite de inscrição:</h3>
                    <p>{selectionProcess.endDate}</p>
                    </InfoContainer>
                    <InfoContainer>
                    <h3>Data limite de análise de inscrição:</h3>
                    <p>{selectionProcess.endAnalysisDate}</p>
                    </InfoContainer>
                    { isApplicationsEmpty ? (
                        <p>Ainda não há inscrições nesse processo seletivo</p>
                    ) : (
                        <TablesContainer>
                            {tablesElements}
                        </TablesContainer>
                    )}
                </>
            )}
        </>
    )   
}