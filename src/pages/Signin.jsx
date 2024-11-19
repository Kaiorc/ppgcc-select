import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import PpgccSymbol from "../assets/images/symbol-ppgcc.png";
import { styled } from "styled-components";
import Box from "../components/Box";
import Input from "../components/Input";
import Button from "../components/Button";

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

export default function Signin() {

    const [signinFormData, setSigninFormData] = React.useState({ email: "", password: "", confirmPassword: "" })
    // const [status, setStatus] = React.useState("idle")
    // const [error, setError] = React.useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        console.log(signinFormData)
    }

    function handleChange(event) {
        const {name, value} = event.target
        setSigninFormData(prevSigninFormData => ({
            ...prevSigninFormData,
            [name]: value
        }))
    }

    const handleCancel = (event) => {
        event.preventDefault();
        console.log('Ação cancelada');
        setSigninFormData({
          email: '',
          password: '',
          confirmPassword: '',
        });
      };

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
                    <ButtonContainer>
                        <Link to="..">
                            <Button>
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