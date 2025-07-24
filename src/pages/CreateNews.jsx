import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { addProcessNews, getProcess } from '../../services/firebase/firebase-firestore'
import styled from 'styled-components'
import useAuth from '../hooks/useAuth'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import Box from '../components/Box'
import Button from '../components/Button'

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
// Componente principal da página de criação de notícias
export default function CreateNews() {
    // Hook do React Hook Form para gerenciar o formulário
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    // Estado para controlar o carregamento do envio do formulário
    const [submitLoading, setSubmitLoading] = React.useState(false)

    // Hook do React Router para obter o ID do processo a partir dos parâmetros da URL e para navegação
    const { processId } = useParams()
    const navigate = useNavigate()

    // Hook personalizado para obter informações do usuário autenticado
    const { displayName } = useAuth()

    // Verifica se o processo existe assim que o componente monta
    React.useEffect(() => {
        async function checkProcessExists() {
            const process = await getProcess(processId)
            // Redireciona o usuário para a página de erro se o processo não existir
            if (!process) {
                navigate("/not-found", { replace: true })
            }
        }
        checkProcessExists()
    }, [processId, navigate])

    // Função para lidar com o envio do formulário
    async function onSubmit(data) {
        // console.log(data)
        // Tenta adicionar a notícia ao processo com os dados do formulário
        // e o nome do usuário autenticado 
        try {
            setSubmitLoading(true)
            await addProcessNews(processId, displayName, data)
            navigate(`/processes/${processId}/news`, { replace: true })
        }
        catch (error) {
            console.error(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <Box>
            <TitleContainer>
                <h1>ADICIONAR ATUALIZAÇÃO</h1>
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
                    <Link to={`/processes/${processId}/news`}>
                        <Button type="button">
                            CANCELAR
                        </Button>
                    </Link>
                    <Button type="submit" loading={submitLoading}>
                        ADICIONAR ATUALIZAÇÃO
                    </Button>
                </ButtonContainer>
            </NewsFormContainer>
        </Box>
    )
}