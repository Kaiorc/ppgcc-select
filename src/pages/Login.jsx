import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { styled } from "styled-components";
import PpgccSymbol from "../assets/images/symbol-ppgcc.png";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    margin: 2em 8em 10em 8em;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
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

export default function Login() {

    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    // const [status, setStatus] = React.useState("idle")
    // const [error, setError] = React.useState(null)

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <LoginContainer>
            <LoginBox>
                <LoginHeader>
                    <PpgccSymbolImg 
                        src={PpgccSymbol} 
                        alt='logo' 
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
                            />
                        <Input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Senha"
                            value={loginFormData.password}
                            />
                        <ButtonContainer>
                            <Button>
                                CRIAR CONTA
                            </Button>
                            <Button>
                                ENTRAR
                            </Button>
                        </ButtonContainer>
                    </LoginFormContainer>
            </LoginBox>
        </LoginContainer>
    )
}