import React from "react"
import ReactLoading from 'react-loading'
import { Link, useParams, useNavigate } from "react-router-dom"
import { formatTimestamp, formatProcessDescription } from "../../utils/formatters/formatters"
import { getSpecificProcessNews, deleteProcessNews } from "../../../services/firebase/firebase-firestore"
import DOMPurify from "dompurify"
import styled from "styled-components"
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
    padding: 5em;
`

const NewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 2em;

    @media (max-width: 768px) {
        padding: 0;
    }
    
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 100%;
    border-radius: 8px 8px 0 0;
    flex-wrap: wrap;
    background-color: #008442;

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 600px) {
        gap: 1rem;
        text-align: center;
    }
`

const News = styled.h3`
    text-transform: uppercase;
    color: white;
    margin: 0;
    font-size: 1.5rem;
    padding: 0.5em 1em;
    border-radius: 20px;
    background-color: #F0852E;
`

const Title = styled.h1`
    text-transform: uppercase;
    color: white;
    font-size: 2.0rem;
    border-radius: 20px;
    background-color: #F0852E;
    padding: 0.5em;
    margin: 0.2em 0;

    @media (max-width: 600px) {
        font-size: 1.8rem;
    }
`

const ProcessName = styled.h3`
    text-transform: uppercase;
    color: white;
    margin: 0.5em 1em;
    font-size: 1.5rem;

    @media (max-width: 600px) {
        font-size: 1.2rem;
    }
`

const AllInfoContainer = styled.div`
    padding: 1em;
    width: 100%;
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;

    @media (max-width: 600px) {
        flex-direction: column;
        width: 100%;
        gap: 0.4em;
    }
`

const ProcessNewsInfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 0 1em 0;

    @media (max-width: 600px) {
        flex-direction: column;
        gap: 1rem;
    }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
        margin: 0;
        padding-bottom: 0.5em;
        font-size: 1rem;
        text-transform: uppercase;

        @media (max-width: 600px) {
            font-size: 0.9rem;
        }
    }
`

const Info = styled.h4`
    font-size: 1.2rem;
    margin: 0;

    @media (max-width: 600px) {
        font-size: 1rem;
    }
`

const Body = styled.p`
    font-size: 1.2rem;
    margin: 0;
    line-height: 1.5;

    @media (max-width: 600px) {
        font-size: 1.2rem;
    }
`

const RedButton = styled(Button)`
  background-color: red;
  color: white;

  &:hover {
    background-color: darkred;
  }
`

// Componente principal para exibir os detalhes de um aviso específico de um processo
export default function ProcessNewsDetail() {
    // Estado para armazenar os dados do aviso
    const [news, setNews] = React.useState(null)

    // Estados para controle de carregamento e modal
    const [loading, setLoading] = React.useState(true)
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [deleteError, setDeleteError] = React.useState(null);

    // Hooks do React Router para obter parâmetros da URL e navegação
    const { processId, newsId } = useParams()
    const navigate = useNavigate()

    // Hook personalizado para verificar se o usuário tem a função de administrador
    const isAdmin = useRole()

    // usoEffect para carregar os dados do aviso específico quando o componente é montado
    React.useEffect(() => {
        async function loadData() {
            try {
                const newsData = await getSpecificProcessNews(processId, newsId)
                setNews(newsData)
            } catch (error) {
                console.error("Erro ao obter detalhes do aviso:", error)
                // Redireciona para a página de erro se o processo ou o aviso não existir
                navigate("/not-found", { replace: true })
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [processId, newsId, navigate])
    
    // Função para lidar com a exclusão do aviso
    async function handleDelete() {
        try {
            await deleteProcessNews(processId, newsId)
            navigate(`/processes/${processId}/news`, { replace: true })
        } catch (error) {
            console.error("Erro ao excluir aviso:", error)
        }
    }

    // Verifica se o usuário é um administrador para exibir os botões de exclusão e edição
    const hasAdminButtons = isAdmin

    // Exibe um spinner de carregamento enquanto os dados estão sendo carregados
    if(loading) {
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
        <NewsContainer>
            <Box>
                <TitleContainer>
                    <News>AVISO</News>
                    <Title>{news.title}</Title>
                    <ProcessName>{processId}</ProcessName>
                    {hasAdminButtons && (
                            <ButtonContainer>
                                <RedButton onClick={() => setIsModalOpen(true)}>EXCLUIR</RedButton>
                                <Link to={`/processes/${processId}/news/${newsId}/edit-news`}>
                                    <Button>EDITAR</Button>
                                </Link>
                            </ButtonContainer>
                        )
                    }
                </TitleContainer>
                <AllInfoContainer>
                    <ProcessNewsInfoContainer>
                        <InfoContainer>
                            <h3>Publicado em:</h3>
                            <Info>{formatTimestamp(news.createdAt)}</Info>
                        </InfoContainer>
                        {news.updatedAt && (
                            <InfoContainer>
                                <h3>Editado em:</h3>
                                <Info>{formatTimestamp(news.updatedAt)}</Info>
                            </InfoContainer>
                        )}
                        <InfoContainer>
                            <h3>Publicado por:</h3>
                            <Info>{news.publisherName}</Info>
                        </InfoContainer>
                    </ProcessNewsInfoContainer>
                    <Body
                        dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(formatProcessDescription(news.body)) 
                        }} 
                    />
                </AllInfoContainer>
            </Box>
            {isModalOpen && (
                <DeleteModal 
                    setIsModalOpen={setIsModalOpen}
                    handleDelete={handleDelete}
                    error={deleteError}
                />
            )}
        </NewsContainer>
    )
}