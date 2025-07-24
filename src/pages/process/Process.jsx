import React from "react"
import ReactLoading from 'react-loading'
import { Link, NavLink, useNavigate, useParams, useLocation, Outlet } from "react-router-dom"
import { loadProcess, getUserApplication, userHasApplication, deleteProcess, deleteApplication } from "../../../services/firebase/firebase-firestore"
import { deleteFile } from "../../../services/appwrite/appwrite-storage"
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

// Função para verificar se o processo seletivo está dentro do período de inscrição
function isWithinApplicationPeriod(startDate, endDate) {
    const now = new Date()
    return now >= new Date(startDate) && now <= new Date(endDate)
}

// Componente principal que renderiza os detalhes de um processo seletivo, exibindo informações,
// botões de ação e uma lista de atualizações
export default function Process() {
    // Estado para armazenar o processo seletivo selecionado
    const [selectionProcess, setSelectionProcess] = React.useState(null)
    // Estado para verificar se o usuário está registrado no processo seletivo
    const [isUserRegistered, setIsUserRegistered] = React.useState(false)

    // Estado para controlar o carregamento dos dados, inicialmente, o estado de
    // carregamento é verdadeiro para exibir o loader
    const [loading, setLoading] = React.useState(true)
    // Estado para controlar a abertura do modal de deleção
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    // const [error, setError] = React.useState(null)
    // Estado para armazenar o erro de deleção, se ocorrer
    const [deleteError, setDeleteError] = React.useState(null);

    // Obtém o ID do processo seletivo da URL
    const { processId } = useParams()
    // Obtém a localização atual
    const location = useLocation()
    // Hook para navegação entre rotas
    const navigate = useNavigate()
    // Hook para verificar se o usuário tem a função de administrador
    const isAdmin = useRole()
    // Hook para obter o ID do usuário autenticado
    const { uid } = useAuth()

    // useEffect para carregar os dados do processo seletivo quando o componente é montado e sempre que o 
    // processId ou uid mudar. Se o processo não existir, o usuário é redirecionado para a página de erro,
    // se o usuário não for um administrador, verifica se ele já está registrado no processo seletivo, se 
    // o processo for encontrado, o estado de carregamento é definido como falso.
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

    // Função para verificar se o usuário está registrado no processo seletivo e se o período de inscrição está aberto.
    function checkSelectionProcessAndApplicationPeriod() {
        if (!selectionProcess) return false
        return isWithinApplicationPeriod(selectionProcess.startDate, selectionProcess.endDate)
    }

    //Variável que determina se os botões de administrador devem ser exibidos.
    const hasAdminButtons = isAdmin
    // Variável que determina se os botões de candidato devem ser exibidos.
    const hasUserButton = !isAdmin && !isUserRegistered && checkSelectionProcessAndApplicationPeriod()
    // Variável que determina se o título deve ser centralizado.
    const shouldCenterTitle = !hasAdminButtons && !hasUserButton && !isUserRegistered

    // Função para deleção do processo
    async function handleDeleteProcess() {
        try {
            await deleteProcess(processId)
            // Após a deleção, você pode redirecionar o usuário para outra rota, se necessário
            navigate("/processes")
        } catch (error) {
            setDeleteError(error.message);
            console.error("Erro ao deletar processo:", error)
        }
    }

    // Função para deleção da inscrição do candidato
    async function handleDeleteApplication() {
        try {
            // Busca os dados da inscrição do candidato
            const applicationInfo = await getUserApplication(processId, uid)
            console.log("Dados da inscrição:", applicationInfo)
        
            // Acessa os arquivos enviados dentro de candidateProvidedData
            const candidateData = applicationInfo.candidateProvidedData
        
            // Verifica se é um objeto (se for, significa que é um arquivo que foi enviado na inscrição) e
            // deleta o arquivo do armazenamento do Appwrite
            if (candidateData && typeof candidateData === 'object') {
                for (const [field, fileData] of Object.entries(candidateData)) {
                    // Ignora campos que não sejam objetos com "format" e "id"
                    if (fileData && typeof fileData === 'object' && fileData.format && fileData.id) {
                        console.log(`Tentando deletar arquivo para o campo "${field}" com id: ${fileData.id}`)
                        await deleteFile(fileData.id)
                        console.log(`Arquivo para o campo "${field}" deletado com sucesso!`)
                    }
                }
            }
        
            // Deleta a inscrição do Firebase somente após a exclusão dos arquivos
            await deleteApplication(processId, uid)
            navigate("/processes")
        } catch (error) {
            console.error("Erro ao deletar inscrição:", error)
            setDeleteError(error.message)
        }
    } 

    // Se o carregamento estiver em andamento, exibe um loader
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
                                        <RedButton onClick={() => setIsModalOpen(true)}>
                                            EXCLUIR
                                        </RedButton>
                                    </TitleButtonContainer>
                                ) : (
                                    isUserRegistered ? (
                                        <TitleButtonContainer>
                                            <RedButton 
                                                type="button"
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                CANCELAR INSCRIÇÃO
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