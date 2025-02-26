import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { addProcessNews } from '../../services/firebase/firebase-firestore'
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

export default function CreateNews() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const { id } = useParams()

    const navigate = useNavigate()

    const { displayName } = useAuth()

    async function onSubmit(data) {
        console.log(data)
        try {
            await addProcessNews(id, displayName, data)
            navigate(`/processes/${id}/news`, { replace: true })
        }
        catch (error) {
            console.error(error)
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
                <Button type="submit">ADICIONAR ATUALIZAÇÃO</Button>
            </NewsFormContainer>
        </Box>
    )
}