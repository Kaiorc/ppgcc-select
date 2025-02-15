import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import useAuth from "../hooks/useAuth"
import PpgccSymbol from "../assets/images/symbol-ppgcc.png"
import Box from "../components/Box"
import Input from "../components/Input"
import Button from "../components/Button"
import { authCreateAccountWithEmail } from "../../services/firebase/firebase-authentication"

const SigninContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1rem;
`

const SigninHeader = styled.div`
    background-color: #008442;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px 8px 0 0;
    padding: 1rem;
`

const SigninFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    width: 100%;
    max-width: 400px;

    @media (max-width: 480px) {
        padding: 1rem;
    }
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
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1em;
    width: 100%;
`

const PpgccSymbolImg = styled.img`
    width: 100px;
    height: auto;
    max-width: 20vw;

    @media (max-width: 480px) {
        width: 80px;
    }
`

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.875rem;
    text-align: center;
`

export default function Signin() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    // const [signinFormData, setSigninFormData] = React.useState({ name: "", email: "", password: "", confirmPassword: "" })
    // const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)

    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate("/processes", { replace: true })
        }
    }, [isLoggedIn, navigate])
    
    function validatePasswordsMatch(value) {
        if (value !== watch("password")) {
            return "As senhas não coincidem."
        }
    }

    async function onSubmit(data) {
        console.log(data)
        try{
            await authCreateAccountWithEmail(data.name, data.email, data.password)
            navigate("/processes")
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                setError("Este email já está em uso. Por favor, use outro email.")
            } else {
                setError("Falha ao fazer o cadastro. Verifique suas credenciais.")
            }
            console.error(error.message)
            // setError(error.message)	
        }
    }

    // function validateForm() {
    //     if (!signinFormData.name || !signinFormData.email || !signinFormData.password || !signinFormData.confirmPassword) {
    //         setError("Todos os campos são obrigatórios.")
    //         return false
    //     }
    //     if (signinFormData.password !== signinFormData.confirmPassword) {
    //         setError("As senhas não coincidem.")
    //         return false
    //     }
    //     setError(null)
    //     return true
    // }

    // function handleSubmit(event) {
    //     event.preventDefault()
    //     if (validateForm()) {
    //         authCreateAccountWithEmail(signinFormData.name, signinFormData.email, signinFormData.password, navigate)
    //             .catch((error) => {
    //                 setError("Falha ao fazer o cadastro. Verifique suas credenciais.")
    //                 console.error(error.message)
    //             });
    //     }
    // }

    // function handleChange(event) {
    //     const {name, value} = event.target
    //     setSigninFormData(prevSigninFormData => ({
    //         ...prevSigninFormData,
    //         [name]: value
    //     }))
    // }

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
                <SigninFormContainer onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <Input
                            {...register("name", { required: "Nome é obrigatório." })}
                            name="name"
                            // onChange={handleChange}
                            type="text"
                            placeholder="Nome"
                            // value={signinFormData.name}
                            aria-label="Nome"
                            required
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        <Input
                            {...register("email", {
                                required: "Email é obrigatório.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email inválido.",
                                },
                            })}
                            name="email"
                            // onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            // value={signinFormData.email}
                            aria-label="Email"
                            required
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        <Input
                            {...register("password", { required: "Senha é obrigatória." })}
                            name="password"
                            // onChange={handleChange}
                            type="password"
                            placeholder="Senha"
                            // value={signinFormData.password}
                            aria-label="Senha"
                            required
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        <Input
                            {...register("confirmPassword", {
                                required: "Confirmação de senha é obrigatória.",
                                validate: validatePasswordsMatch,
                            })}
                            name="confirmPassword"
                            // onChange={handleChange}
                            type="password"
                            placeholder="Confirmar senha"
                            // value={signinFormData.confirmPassword}
                            aria-label="Confirmar senha"
                            required
                        />
                        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
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