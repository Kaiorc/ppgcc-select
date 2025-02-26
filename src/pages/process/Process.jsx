import React from "react"
import ReactLoading from 'react-loading'
import { Link, NavLink, useParams, useLocation, Outlet } from "react-router-dom"
import { loadProcess, userHasApplication } from "../../../services/firebase/firebase-firestore"
import { formatFirestoreDate, formatProcessDescription } from "../../../formatters/formatters"
import styled from "styled-components"
import DOMPurify from "dompurify"
import useAuth from "../../hooks/useAuth"
import useRole from "../../hooks/useRole"
import Button from "../../components/Button"
import Box from "../../components/Box"

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 5em; 
`

const ProcessDetailContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
`

const ProcessDetailBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 2em;
    border-radius: 8px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    max-width: 900px; /* Para evitar que fique muito largo em telas grandes */
    width: 100%;

    @media (max-width: 768px) {
        margin: 1em;
    }

    @media (max-width: 480px) {
        margin: 0.5em;
    }
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({ isCentered }) => (isCentered ? "center" : "space-between")};
    padding: 1rem;
    width: 100%;
    border-radius: 8px 8px 0 0;
    flex-wrap: no-wrap;
    background-color: #008442;

    h1 {
        text-transform: uppercase;
        color: white;
    }

    @media (max-width: 768px) {
        flex-wrap: no-wrap;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
        gap: 0.4em;
    }
`

const ListNav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: white;
    background-color: #008442;
    flex-wrap: no-wrap;

    a {
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        padding: 1rem;   
        width: 100%;
        background-color: #006734;
        border-right: 2px solid #F0852E;
        border-left: 2px solid #F0852E;

        &:hover {
            background-color: #F0852E;
            transition-duration: 0.2s;
        }
        &:active {
            background-color: #A45516;
        }
    }

    a.active {
        color: white;
        background-color: #F0852E;
    }

    @media (max-width: 320px) {
        a {
            padding: 0.5rem;
            border-right: none;
            border-left: none;
            border-bottom: 2px solid #F0852E;
        }
    }
`

const RegisteredMessage = styled.p`
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
    background-color: #F0852E;
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

export default function Process() {
    const [selectionProcess, setSelectionProcess] = React.useState(null)
    const [isUserRegistered, setIsUserRegistered] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    // const [error, setError] = React.useState(null)

    const { id } = useParams()
    const location = useLocation()
    const isAdmin = useRole()
    const { uid } = useAuth()

    React.useEffect(() => {
        async function loadData() {
            const process = await loadProcess(id)
            setSelectionProcess(process)
            if (!isAdmin && uid) {
                const registered = await userHasApplication(id, uid)
                setIsUserRegistered(registered)
            }
            setLoading(false)
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

    console.log("Process.jsx - selectionProcess", selectionProcess)
    console.log(location)
    console.log(id)

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
                                    <Link to="create-news">
                                        <Button>+ATUALIZAÇÃO</Button>
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
                    <ListNav>
                        <NavLink
                            to={`/processes/${id}`}
                            end
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            INFORMAÇÕES
                        </NavLink>
                        <NavLink
                            to={`/processes/${id}/news`}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            ATUALIZAÇÕES
                        </NavLink>
                    </ListNav>
                    <Outlet context={{ selectionProcess }}/>
                </ProcessDetailBox>
                )
            }
        </ProcessDetailContainer>
    )
}