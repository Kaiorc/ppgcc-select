import React from "react"
import ReactLoading from 'react-loading'
import { Link, NavLink, useNavigate, useParams, useLocation, Outlet } from "react-router-dom"
import { loadProcess, userHasApplication, deleteProcess, deleteApplication } from "../../../services/firebase/firebase-firestore"
import styled from "styled-components"
import useAuth from "../../hooks/useAuth"
import useRole from "../../hooks/useRole"
import Button from "../../components/Button"
import Box from "../../components/Box"
import DeleteModal from "../../components/DeleteModal"

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
    display: ${({ $gridLayout }) => $gridLayout ? 'grid' : 'flex'};
    ${({ $gridLayout }) => $gridLayout && `
        grid-template-columns: repeat(2, auto);
        grid-template-rows: repeat(2, auto);
        gap: 1em;
        justify-items: center;
        align-items: center;
    `}
    align-items: center;
    gap: 1em;

    @media (max-width: 600px) {
        flex-direction: column;
        width: 100%;
        gap: 0.4em;
    }

    @media (max-width: 320px) {
        display: flex;
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

const RedButton = styled(Button)`
  background-color: red;
  color: white;

  &:hover {
    background-color: darkred;
  }
`

const RegisteredMessage = styled.p`
    color: white;
    text-align: center;
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
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    // const [error, setError] = React.useState(null)
    const [deleteError, setDeleteError] = React.useState(null);

    const { processId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const isAdmin = useRole()
    const { uid } = useAuth()

    React.useEffect(() => {
        async function loadData() {
            const process = await loadProcess(processId)
            // Se o processo não existir, o usuário é redirecionado para a página de erro
            if (!process) {
                navigate("/not-found")
                return
            }
            setSelectionProcess(process)
            if (!isAdmin && uid) {
                const registered = await userHasApplication(processId, uid)
                setIsUserRegistered(registered)
            }
            setLoading(false)
            console.log("Processo carregado:", process)
        }
        loadData()
    }, [processId, uid])

    function checkSelectionProcessAndApplicationPeriod() {
        if (!selectionProcess) return false
        return isWithinApplicationPeriod(selectionProcess.startDate, selectionProcess.endDate)
    }

    const hasAdminButtons = isAdmin
    const hasUserButton = !isAdmin && !isUserRegistered && checkSelectionProcessAndApplicationPeriod()
    const shouldCenterTitle = !hasAdminButtons && !hasUserButton && !isUserRegistered

    // Função para deleção do processo
    async function handleDeleteProcess() {
        try {
            await deleteProcess(id)
            // Após a deleção, você pode redirecionar o usuário para outra rota, se necessário
            navigate("/processes")
        } catch (error) {
            setDeleteError(error.message);
            console.error("Erro ao deletar processo:", error)
        }
    }

    async function handleDeleteApplication() {
        try {
            await deleteApplication(processId, uid)
            // Após a deleção,o usuário é redirecionado para outra rota
            navigate("/processes")
        } catch (error) {
            setDeleteError(error.message);
            console.error("Erro ao deletar inscrição:", error)
        }
    }

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
                                <TitleButtonContainer $gridLayout>
                                    <Link to="applications">
                                        <Button>INSCRIÇÕES</Button>
                                    </Link>
                                    <Link to="create-news">
                                        <Button>+ATUALIZAÇÃO</Button>
                                    </Link>
                                    <Link to="edit-process">
                                        <Button>EDITAR</Button>
                                    </Link>
                                    <RedButton onClick={() => setIsModalOpen(true)}>EXCLUIR</RedButton>
                                </TitleButtonContainer>
                            ) : (
                                isUserRegistered ? (
                                    <TitleButtonContainer>
                                        <RedButton 
                                            type="button"
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            DESINSCREVER-SE
                                        </RedButton>
                                        <RegisteredMessage aria-live="polite">
                                            VOCÊ JÁ ESTÁ INSCRITO(A)
                                        </RegisteredMessage>
                                    </TitleButtonContainer>
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
                            to={`/processes/${processId}`}
                            end
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            INFORMAÇÕES
                        </NavLink>
                        <NavLink
                            to={`/processes/${processId}/news`}
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            ATUALIZAÇÕES
                        </NavLink>
                    </ListNav>
                    <Outlet context={{ selectionProcess }}/>
                </ProcessDetailBox>
                )
            }
            {isModalOpen && (
                <DeleteModal 
                    setIsModalOpen={setIsModalOpen}
                    handleDelete={isAdmin ? handleDeleteProcess : handleDeleteApplication}
                    error={deleteError}
                />
            )}
        </ProcessDetailContainer>
    )
}