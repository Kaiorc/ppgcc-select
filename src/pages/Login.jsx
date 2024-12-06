import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import PpgccSymbol from "../assets/images/symbol-ppgcc.png"
import { styled } from "styled-components"
import Box from "../components/Box"
import Input from "../components/Input"
import Button from "../components/Button"
import useAuth from "../hooks/useAuth"
import { authLogInWithEmail } from "../../firebase/firebase-authentication"

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LoginHeader = styled.div`
    background-color: #008442;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px 8px 0 0;
`

const LoginFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 2em;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
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

export default function Login() {

    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    // const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    function validateForm() {
        if (!loginFormData.email || !loginFormData.password) {
            setError("Por favor, preencha todos os campos.")
            return false
        }
        setError(null)
        return true
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (validateForm()) {
            authLogInWithEmail(loginFormData.email, loginFormData.password, navigate, setIsLoggedIn)
                .catch((error) => {
                    setError("Falha ao fazer login. Verifique suas credenciais.")
                    console.error(error.message);
                })
        }
    }

    function handleChange(event) {
        const { name, value } = event.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError(null)
    }

    return (
        <LoginContainer>
            <Box>
                <LoginHeader>
                    <PpgccSymbolImg 
                        src={PpgccSymbol} 
                        alt='Símbolo do PPGCC' 
                        className="logo-img"
                    />
                </LoginHeader>
                <h1>Login</h1>
                <LoginFormContainer onSubmit={handleSubmit}>
                    <Input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                        value={loginFormData.email}
                        aria-label="Email"
                        required
                    />
                    <Input
                        name="password"
                        onChange={handleChange}
                        type="password"
                        placeholder="Senha"
                        value={loginFormData.password}
                        aria-label="Senha"
                        required
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <ButtonContainer>
                        <Link to="/signin">
                            <Button type="button">
                                CRIAR CONTA
                            </Button>
                        </Link>
                        <Button type="submit">
                            ENTRAR
                        </Button>
                    </ButtonContainer>
                </LoginFormContainer>
            </Box>
        </LoginContainer>
    )
}