import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import PpgccSymbol from "../assets/images/symbol-ppgcc.png"
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
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    // const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    // const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();
    
    async function onSubmit(data) {
        console.log(data)
        try {
            await authLogInWithEmail(data.email, data.password, navigate, setIsLoggedIn)
            // await authLogInWithEmail(data.email, data.password, navigate, setIsLoggedIn)
            navigate("/processes")
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
                <h1>Login</h1>
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