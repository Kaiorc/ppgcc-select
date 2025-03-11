import React from 'react'
import ReactLoading from 'react-loading'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { getSpecificProcessNews, updateProcessNews } from '../../services/firebase/firebase-firestore'
import styled from 'styled-components'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import Box from '../components/Box'
import Button from '../components/Button'

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 5em; 
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

const NewsFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    width: 100%;
    padding: 1em;
`

const BoldLabel = styled.label`
    font-weight: bold;
    width: 50%;

    & p {
        margin: 0;
        font-weight: normal;
        font-size: 1em;
        color: #008442;
    }

    & input {
        margin: 0.2em 0 0 0;
    }
    
    & textarea {
        margin: 0.2em 0 0 0;
    }

    @media (max-width: 1024px) {
        width: 70%;
    }
    
    @media (max-width: 768spx) {
        width: 90%;
    }

    @media (max-width: 425px) {
        width: 100%;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    gap: 1em;
    margin: 0.5em 1em 0.5 1em;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        flex-wrap: wrap-reverse;
    }
`

export default function EditNews() {
    const [loading, setLoading] = React.useState(true)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm()

    const { processId, newsId } = useParams()

    const navigate = useNavigate()

    React.useEffect(() => {
        async function loadData() {
            try {
                const news = await getSpecificProcessNews(processId, newsId)
                // Caso a função retorne com sucesso, preenche os campos do formulário
                setValue("title", news.title || "")
                setValue("body", news.body || "")
                setLoading(false)
            } catch (error) {
                console.error("Erro ao carregar o aviso:", error)
                // Se ocorrer erro (por exemplo, aviso não encontrado), redireciona para a página de erro
                navigate("/not-found", { replace: true })
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [processId, newsId, setValue, navigate])

    async function onSubmit(data) {
        try {
            await updateProcessNews(processId, newsId, data)
            navigate(`/processes/${processId}/news/${newsId}`, { replace: true })
        }
        catch (error) {
            console.error(error)
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
        <Box>
            <TitleContainer>
                <h1>EDITAR ATUALIZAÇÃO</h1>
            </TitleContainer>
            <NewsFormContainer onSubmit={handleSubmit(onSubmit)}>
                <BoldLabel htmlFor="title">
                    Título
                    <Input
                        {...register("title", { required: true })}
                        name="title"
                        type="text"
                        placeholder="Título"
                        aria-label="Título"
                        required
                    />
                </BoldLabel>
                <BoldLabel htmlFor="body">
                    Corpo da mensagem
                    <TextArea
                        {...register("body", { required: true })}
                        label="Corpo da mensagem"
                        name="body"
                        type=""
                        placeholder="Corpo da mensagem"
                        aria-label="Corpo da mensagem"
                        maxLength="4000"
                        required
                    />
                </BoldLabel>
                <ButtonContainer>
                    <Link to={`/processes/${processId}/news/${newsId}`}>
                        <Button type="button">
                            CANCELAR
                        </Button>
                    </Link>
                    <Button type="submit">EDITAR ATUALIZAÇÃO</Button>
                </ButtonContainer>
            </NewsFormContainer>
        </Box>
    )
}