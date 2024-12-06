import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import PpgccSymbol from "../assets/images/symbol-ppgcc.png"
import { styled } from "styled-components"
import Box from "../components/Box"
import Input from "../components/Input"
import Button from "../components/Button"
import { authCreateAccountWithEmail } from "../../firebase/firebase-authentication"

const SigninContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SigninHeader = styled.div`
    background-color: #008442;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px 8px 0 0;
`

const SigninFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 2em;
    width: 22vw;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 4em;
    margin-top: 1em;
`

const PpgccSymbolImg = styled.img`
    width: 8vw;
    height: 16vh;
`

const ErrorMessage= styled.p`
    color: red;
`

export default function Signin() {

    const [signinFormData, setSigninFormData] = React.useState({ name: "", email: "", password: "", confirmPassword: "" })
    // const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const navigate = useNavigate()

    function validateForm() {
        if (!signinFormData.name || !signinFormData.email || !signinFormData.password || !signinFormData.confirmPassword) {
            setError("Todos os campos são obrigatórios.")
            return false
        }
        if (signinFormData.password !== signinFormData.confirmPassword) {
            setError("As senhas não coincidem.")
            return false
        }
        setError(null)
        return true
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (validateForm()) {
            authCreateAccountWithEmail(signinFormData.name, signinFormData.email, signinFormData.password, navigate)
                .catch((error) => {
                    setError("Falha ao fazer o cadastro. Verifique suas credenciais.")
                    console.error(error.message)
                });
        }
    }

    function handleChange(event) {
        const {name, value} = event.target
        setSigninFormData(prevSigninFormData => ({
            ...prevSigninFormData,
            [name]: value
        }))
    }

    return (
        <SigninContainer>
            <Box>
                <SigninHeader>
                    <PpgccSymbolImg 
                        src={PpgccSymbol} 
                        alt='Simbolo do PPGCC' 
                        className="logo-img"
                    />
                </SigninHeader>
                <h1>Criar Conta</h1>
                <SigninFormContainer onSubmit={handleSubmit}>
                    <InputContainer>
                        <Input
                            name="name"
                            onChange={handleChange}
                            type="text"
                            placeholder="Nome"
                            value={signinFormData.name}
                            aria-label="Nome"
                            required
                        />
                        <Input
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            value={signinFormData.email}
                            aria-label="Email"
                            required
                        />
                        <Input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Senha"
                            value={signinFormData.password}
                            aria-label="Senha"
                            required
                        />
                        <Input
                            name="confirmPassword"
                            onChange={handleChange}
                            type="password"
                            placeholder="Confirmar senha"
                            value={signinFormData.confirmPassword}
                            aria-label="Confirmar senha"
                            required
                        />
                    </InputContainer>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <ButtonContainer>
                        <Link to="..">
                            <Button type="button">
                                CANCELAR
                            </Button>
                        </Link>
                        <Button type="submit">
                            CRIAR CONTA
                        </Button>
                    </ButtonContainer>
                </SigninFormContainer>
            </Box>
        </SigninContainer>
    )
}