import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import useAuth from "../hooks/useAuth"
import PpgccSymbol from "../assets/images/symbol-ppgcc.png"
import Box from "../components/Box"
import Input from "../components/Input"
import Button from "../components/Button"
import { authLogInWithEmail } from "../../services/firebase/firebase-authentication"

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
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

const ErrorMessage= styled.p`
    color: red;
`

export default function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    // const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    // const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const navigate = useNavigate()
    const { setIsLoggedIn, isLoggedIn } = useAuth()
    
    React.useEffect(() => {
        if (isLoggedIn) {
            navigate("/processes", { replace: true })
        }
    }, [isLoggedIn, navigate])

    async function onSubmit(data) {
        console.log(data)
        try {
            await authLogInWithEmail(data.email, data.password, setIsLoggedIn)
            // await authLogInWithEmail(data.email, data.password, navigate, setIsLoggedIn)
            navigate("/processes", { replace: true })
        } catch(error) {
            setError("Falha ao fazer login. Verifique suas credenciais.")
            console.error(error.message);
        }
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
                <h1>LOGIN</h1>
                <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Email"
                        aria-label="Email"
                        required
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    <Input
                        {...register("password", { required: "Senha é obrigatória." })}
                        name="password"
                        type="password"
                        placeholder="Senha"
                        aria-label="Senha"
                        required
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
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