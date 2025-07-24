import React from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import PpgccSymbol from "../assets/images/symbol-ppgcc.png"
import Box from "../components/Box"
import Input from "../components/Input"
import Button from "../components/Button"
import { authSendPasswordResetEmail } from "../../services/firebase/firebase-authentication"

const ForgottenPasswordContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
`

const ForgottenPasswordHeader = styled.div`
    background-color: #008442;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px 8px 0 0;
`

const Title = styled.h1`
    text-align: center;
`

const ForgottenPasswordFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 2em;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    gap: 1em;
    margin: 1em 1em 0 1em;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        flex-wrap: wrap-reverse;
    }
`

const PpgccSymbolImg = styled.img`
    width: 20vw;
    max-width: 120px;
    height: auto;
    @media (max-width: 768px) {
        width: 30vw;
    }
`

const Message = styled.p`
    color: green;
    text-align: center;
`

const BoldMessage = styled.b`
    color: green;
    text-transform: uppercase;
    text-align: center;
`

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.875rem;
    text-align: center;
`

// Componente que renderiza a página de recuperação de senha
export default function ForgottenPassword() {
    // Utiliza o hook useForm do react-hook-form para gerenciar o formulário,
    // registra os campos do formulário e define as regras de validação
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [success, setSuccess] = React.useState(null)
    
    // Função que é chamada quando o formulário é enviado
    async function onSubmit(data) {
        setError(null)
        setSuccess(null)
        // Envia o e-mail de recuperação utilizando a função authSendPasswordResetEmail e
        // exibe mensagens de erro ou sucesso conforme o resultado da operação
        try {
            setLoading(true)
            // Chama a função que envia o e-mail de recuperação
            await authSendPasswordResetEmail(data.email)
            setSuccess("Verifique sua caixa de entrada para as instruções de recuperação")
        } catch (error) {
            console.error(error.message)
            setError("Falha ao enviar o e-mail. Verifique se o endereço está correto")
        } finally {
            setLoading(false)
        }
    }

    return (
        <ForgottenPasswordContainer>
            <Box>
                <ForgottenPasswordHeader>
                    <PpgccSymbolImg 
                        src={PpgccSymbol} 
                        alt='Símbolo do PPGCC' 
                        className="logo-img"
                    />
                </ForgottenPasswordHeader>
                <Title>RECUPERAR SENHA</Title>
                <ForgottenPasswordFormContainer onSubmit={handleSubmit(onSubmit)}>
                    <BoldMessage>Digite seu e-mail para receber as instruções de recuperação</BoldMessage>
                    <InputContainer>
                        <Input
                            {...register("email", {
                                required: "Email é obrigatório.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email inválido.",
                                },
                            })}
                            name="email"
                            type="email"
                            placeholder="Digite seu email"
                            aria-label="Email"
                            required
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </InputContainer>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <Message>{success}</Message>}
                    <ButtonContainer>
                        <Link to="/">
                            <Button type="button">
                                CANCELAR
                            </Button>
                        </Link>
                        <Button type="submit" loading={loading}>
                            ENVIAR
                        </Button>
                    </ButtonContainer>
                </ForgottenPasswordFormContainer>
            </Box>
        </ForgottenPasswordContainer>
    )
}
