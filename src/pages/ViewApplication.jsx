import React from "react"
import { Link, useParams, useLocation, Outlet } from "react-router-dom"
import { getUserApplication } from "../../firebase/firebase-firestore"
import styled from "styled-components"
import useAuth from "../hooks/useAuth"
import Box from "../components/Box"
import Button from "../components/Button"

// const ProcessDetailBox = styled(Box)`
//     &&{
//         background-color: #f5f5f5;
//     }
// `

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

function formatCreatedAt(data) {
    return data.map(info => ({
        ...info,
        createdAt: new Date(info.createdAt.seconds * 1000).toLocaleDateString()
    }))
}

export default function ViewApplication() {
    const [application, setApplication] = React.useState(null)
    // const [loading, setLoading] = React.useState(false)
    // const [error, setError] = React.useState(null)

    const { processId, uid } = useParams()
    const location = useLocation()

    React.useEffect(() => {
        async function loadData() {
            try {
                const applicationInfo = await getUserApplication(processId, uid)
                setApplication(applicationInfo)
            } catch (error) {
                console.error("Erro ao carregar a inscraição: ", error)
            }
        }
        loadData()
    }, [processId, uid])

    // React.useEffect(() => {
    //     loadProcess(id, setSelectionProcess)
    // }, [id])

    console.log(typeof application)
    console.log(application)
    console.log
    console.log("location: " + location)
    console.log("processId: " + processId)
    console.log("uid: " + uid)
    
    if (!application) {
        return <p>Carregando...</p>
    }

    const renderValue = (value) => {
        if (value && typeof value === 'object') {
            if (value.seconds && value.nanoseconds) {
                // Supondo que seja um objeto de data do Firestore
                const date = new Date(value.seconds * 1000)
                return date.toLocaleString()
            }
            return JSON.stringify(value)
        }
        return value
    }

    const applicationElements = Object.entries(application).map(([key, value]) => (
        <InfoContainer key={key}>
            <h3>{key}:</h3>
            <p>{renderValue(value)}</p>
        </InfoContainer>
    ))

    return (
        <Box>
            <h1>Detalhes da Inscrição</h1>
            {applicationElements}
        </Box>
    )
}