import React from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import { styled } from "styled-components"
import { getProcess } from "../../firebase/firebase-firestore"
import Input from "../components/Input"
import Button from "../components/Button"
import Box from "../components/Box"

const ApplicationBox = styled(Box)`
    padding: 1em;
`

const ApplicationFormContainer = styled.form`
    
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* & input[type=date] { */
    & input, textarea {
        margin-top: 0;
    };
    & input[type="file"] {
        
    }
`

const ButtonContainer = styled.div`

`

const RequiredSpan = styled.span`
    color: red;
    margin-left: 40px;
`

export default function Application() {
    const [applicationFormData, setApplicationFormData] = React.useState({})
    const [selectionProcess, setSelectionProcess] = React.useState()
    // const [loading, setLoading] = React.useState(false)
    // const [error, setError] = React.useState(null)

    const { id } = useParams()
    const location = useLocation()

    React.useEffect(() => {
        async function loadProcess() {
            const data = await getProcess(id)
            setSelectionProcess(data)
        }
        loadProcess()
    }, [id])

    async function handleSubmit(event) {
        event.preventDefault();
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setApplicationFormData(prevApplicationFormData => ({
            ...prevApplicationFormData,
            [name]: value
        }))
        console.log(applicationFormData)
    }

    const inputElements = selectionProcess?.registrationFieldsInfo?.map((info) => {
        return (
            <label 
                htmlFor={info.name}
                key={info.name}
            >
                {info.name}
                {info.required && <RequiredSpan>*Obrigatório</RequiredSpan>}
                <Input
                    name={info.name}
                    onChange={handleChange}
                    type={info.type}
                    placeholder={info.name}
                    value={applicationFormData[info.name] || ""}
                    aria-label={info.name}
                    required={info.required}
                />
            </label>
        )
    })

    return (
        <ApplicationBox>
            <h1>INSCRIÇÃO</h1>
            <ApplicationFormContainer onSubmit={handleSubmit}>
                <h2>DADOS DO CANDIDATO</h2>
                    <InputContainer>
                        { inputElements }
                    </InputContainer>
                    <ButtonContainer>
                        <Link to="/processes">
                            <Button type="button">
                                CANCELAR
                            </Button>
                        </Link>
                        <Button type="submit">
                            ENVIAR
                        </Button>
                    </ButtonContainer>
            </ApplicationFormContainer>
        </ApplicationBox>
    )
}