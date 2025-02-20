import React from "react"
import DOMPurify from "dompurify"
import { Link, useParams, useLocation, Outlet } from "react-router-dom"
import { loadProcess, userHasApplication } from "../../../services/firebase/firebase-firestore"
import { formatFirestoreDate, formatProcessDescription } from "../../../formatters/formatters"
import styled from "styled-components"
import useAuth from "../../hooks/useAuth"
import useRole from "../../hooks/useRole"
import Button from "../../components/Button"

const ProcessDetailContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
`

const ProcessDetailBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 2em;
    padding: 1em;
    border-radius: 8px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    max-width: 900px; /* Para evitar que fique muito largo em telas grandes */
    width: 100%;

    @media (max-width: 768px) {
        margin: 1em;
        padding: 1em;
    }

    @media (max-width: 480px) {
        margin: 0.5em;
        padding: 0.8em;
    }
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({ isCentered }) => (isCentered ? "center" : "space-between")};
    width: 100%;
    flex-wrap: wrap;

    h1 {
        text-transform: uppercase;
    }

    @media (max-width: 600px) {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
`

const TitleButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;

    @media (max-width: 600px) {
        flex-direction: column;
        width: 100%;
    }
`

const InfoGrid = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h3 {
        margin-bottom: 0;
        font-size: 1.2rem;
    }

    p {
        margin-top: 0.3rem;
        font-size: 1.2rem;
    }

    @media (max-width: 768px) {
        h3 {
            font-size: 1rem;
        }

        p {
            font-size: 1rem;
        }
    }
`

const RegisteredMessage = styled.p`
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
    background-color: #006734;
    padding: 0.8rem;
    border-radius: 20px;

    @media (max-width: 600px) {
        font-size: 1rem;
        text-align: center;
    }
`

function isWithinApplicationPeriod(startDate, endDate) {
    const now = new Date()
    return now >= new Date(startDate) && now <= new Date(endDate)
}

export default function ProcessDetail() {
    const [selectionProcess, setSelectionProcess] = React.useState(null)
    const [isUserRegistered, setIsUserRegistered] = React.useState(false)
    // const [loading, setLoading] = React.useState(false)
    // const [error, setError] = React.useState(null)

    const { id } = useParams()
    const location = useLocation()
    const isAdmin = useRole()
    const { uid } = useAuth()

    React.useEffect(() => {
        async function loadData() {
            const process = await loadProcess(id)
            setSelectionProcess(process)
            if (uid) {
                const registered = await userHasApplication(id, uid)
                setIsUserRegistered(registered)
            }
        }
        loadData()
    }, [id, uid])

    function checkSelectionProcessAndApplicationPeriod() {
        if (!selectionProcess) return false
        return isWithinApplicationPeriod(selectionProcess.startDate, selectionProcess.endDate)
    }

    const hasAdminButtons = isAdmin
    const hasUserButton = !isAdmin && !isUserRegistered && checkSelectionProcessAndApplicationPeriod()
    const shouldCenterTitle = !hasAdminButtons && !hasUserButton && !isUserRegistered

    console.log("hasAdminButtons: ", hasAdminButtons)
    console.log("isUserRegistered: ", isUserRegistered)
    console.log("checkSelectionProcessAndApplicationPeriod: ", checkSelectionProcessAndApplicationPeriod())
    console.log("hasUserButton: ", hasUserButton)
    console.log("shouldCenterTitle: ", shouldCenterTitle)

    console.log(selectionProcess)
    console.log(location)
    console.log(id)
    
    return (
        <ProcessDetailContainer>
            {selectionProcess && (
                <ProcessDetailBox>
                    <TitleContainer $isCentered={shouldCenterTitle}>
                        <h1>{selectionProcess.name}</h1>
                        {
                            hasAdminButtons ? (
                                <TitleButtonContainer>
                                    <Link to="applications">
                                        <Button>INSCRIÇÕES</Button>
                                    </Link>
                                    <Link to="edit-process">
                                        <Button>EDITAR</Button>
                                    </Link>
                                </TitleButtonContainer>
                            ) : (
                                isUserRegistered ? (
                                    <RegisteredMessage aria-live="polite">
                                        VOCÊ JÁ ESTÁ INSCRITO(A)
                                    </RegisteredMessage>
                                ) : (
                                    hasUserButton && (
                                        <TitleButtonContainer>
                                            <Link to="application">
                                                <Button>INSCREVER-SE</Button>
                                            </Link>
                                        </TitleButtonContainer>
                                    )
                                )
                            )
                        }
                    </TitleContainer>
                    <InfoGrid>
                        <InfoContainer>
                            <h3>Número de vagas:</h3>
                            <p> {selectionProcess.places}</p>
                        </InfoContainer>
                        <InfoContainer>
                            <h3>Data de início de inscrições:</h3>
                            <p> {formatFirestoreDate(selectionProcess.startDate)}</p>
                        </InfoContainer>
                        <InfoContainer>
                            <h3>Data de encerramento de inscrições:</h3>
                            <p> {formatFirestoreDate(selectionProcess.endDate)}</p>
                        </InfoContainer>
                        <InfoContainer>
                            <h3>Data de encerramento de análise de inscrições:</h3>
                            <p> {formatFirestoreDate(selectionProcess.endAnalysisDate)}</p>
                        </InfoContainer>
                    </InfoGrid>
                    <InfoContainer>
                        <h3>Descrição:</h3>
                        <p 
                            dangerouslySetInnerHTML={{ 
                                __html: DOMPurify.sanitize(formatProcessDescription(selectionProcess.description)) 
                            }} 
                        />
                    </InfoContainer>
                </ProcessDetailBox>
            )}
        </ProcessDetailContainer>
    )
}