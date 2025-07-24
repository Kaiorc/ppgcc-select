import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { authLogInWithEmail, authSignInWithGoogle } from "../../services/firebase/firebase-authentication"
import { styled } from "styled-components"
import useAuth from "../hooks/useAuth"
import PpgccSymbol from "../assets/images/symbol-ppgcc.png"
import GoogleIcon from "../assets/images/icon-google.png"
import Box from "../components/Box"
import Input from "../components/Input"
import Button from "../components/Button"

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

const Hr = styled.hr`
    width: 100%;
    height: 2px;
    border: none;
    border-radius: 20px;
    background-color: #F0852E;
`

const GoogleButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    width: 100%;
`

const GoogleIconImg = styled.img`
  width: clamp(16px, 1.8vw, 20px);
  height: auto;   
  margin-bottom: 0.2em; 
`

const ForgottenPassword = styled.p`
    color: #008442;
    text-align: center;
    margin-top: 1em;
    font-size: 0.9em;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

const ErrorMessage= styled.p`
    color: red;
`

// Componente que renderiza a página de login
export default function Login() {
    // Hook do React Hook Form para gerenciar o formulário
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    // const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    // const [status, setStatus] = React.useState("idle")
    // Estados para controle de carregamento e erro
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    // Hook do React Router para navegação
    const navigate = useNavigate()

    // Hook personalizado para autenticação
    const { setIsLoggedIn, isLoggedIn } = useAuth()
    
    // useEffect para redirecionar usuários já logados
    React.useEffect(() => {
        if (isLoggedIn) {
            navigate("/processes", { replace: true })
        }
    }, [isLoggedIn, navigate])

    // Função para lidar com o login com Google
    async function handleGoogleLogin() {
        // Redireciona o usuário para o login com Google
        try {
            const user = await authSignInWithGoogle()
            // console.log("Usuário logado:", user)
            setIsLoggedIn(true)
            navigate("/processes", { replace: true })
        } catch (error) {
            console.error("Erro no login com Google:", error)
        }
    }

    // Função para lidar com o envio do formulário de login
    async function onSubmit(data) {
        // Tenta fazer login com email e senha
        try {
            setLoading(true)
            await authLogInWithEmail(data.email, data.password, setIsLoggedIn)
            // await authLogInWithEmail(data.email, data.password, navigate, setIsLoggedIn)
            navigate("/processes", { replace: true })
        } catch(error) {
            setError("Falha ao fazer login. Verifique suas credenciais.")
            console.error(error.message);
        } finally {
            setLoading(false)
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
                        <Button type="submit" loading={loading}>
                            ENTRAR
                        </Button>
                    </ButtonContainer>
                    <Hr />
                    <GoogleButton
                        type="button"
                        onClick={handleGoogleLogin}
                    >
                        <GoogleIconImg src={GoogleIcon} alt="Google" />
                        ENTRAR COM O GOOGLE
                    </GoogleButton>
                    <Link to="/forgotten-password">
                        <ForgottenPassword>
                            ESQUECI MINHA SENHA
                        </ForgottenPassword>
                    </Link>
                </LoginFormContainer>
            </Box>
        </LoginContainer>
    )
}