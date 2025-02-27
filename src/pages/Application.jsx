import React from "react"
import ReactLoading from 'react-loading'
import { useParams, useLocation, Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { styled } from "styled-components"
import { loadProcess, addApplication, userHasApplication } from "../../services/firebase/firebase-firestore"
import { uploadFileToStorage } from "../../services/appwrite/appwrite-storage"
import useAuth from "../hooks/useAuth"
import { researchAreas } from "../../config"
import Input from "../components/Input"
import Select from "../components/Select"
import Button from "../components/Button"
import Box from "../components/Box"

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 2em;
`

const ApplicationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
`

const TitleContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1em 4em;
    border-radius: 8px 8px 0 0;
    background-color: #008442;

    & h1 {
        text-transform: uppercase;
        text-align: center;
    }
`

const ApplicationFormContainer = styled.form`
    padding: 0 1em 1em 1em;
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

const FileInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &.with-file {
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        & input {
            padding-bottom: 2.5rem;
        }
    }
        
    input {
        flex: 1;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    gap: 1em;
    margin-top: 0.5em;
    flex-wrap: wrap;
    @media (max-width: 320px) {
        flex-wrap: wrap-reverse;
    }
`

const RedButton = styled(Button)`
    background: red;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    border-radius: 8px;
`

const BoldLabel = styled.label`
    font-weight: bold;
`

const RedSpan = styled.span`
    color: red;
    margin-left: 40px;
`

function validateFile(value) {
    if (!value || !value[0]) return true
    const file = value[0]
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
    const maxSize = 2 * 1024 * 1024 // "O arquivo deve ter no máximo 2MB."
    
    if (!allowedTypes.includes(file.type)) {
        return "Tipo de arquivo não suportado."
    }
    
    if (file.size > maxSize) {
        return "O arquivo deve ter no máximo 2MB."
    }
    
    return true
}

function isWithinApplicationPeriod(startDate, endDate) {
    const now = new Date()
    return now >= new Date(startDate) && now <= new Date(endDate)
}

export default function Application() {
    const [selectionProcess, setSelectionProcess] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    
    const { register, handleSubmit, watch, resetField, formState: { errors } } = useForm({ defaultValues: { researchArea: "" } })
    const { displayName, uid, userEmail } = useAuth()



    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function loadData() {
            const process = await loadProcess(id)
            setSelectionProcess(process)

            // Verificar se está fora do período de inscrição
            if (!isWithinApplicationPeriod(process.startDate, process.endDate)) {
                alert("As inscrições não estão abertas no momento.");
                navigate(`/processes/${id}`);
            }

            // Verificar se o usuário já está inscrito
            const isRegistered = await userHasApplication(id, uid)
            if (isRegistered) {
                alert("Você já está inscrito neste processo.");
                navigate(`/processes/${id}`);
            }

            setLoading(false)
        }
        loadData()
    }, [id, navigate, uid])

    function isResearchAreaSelected() {
        const value = watch("researchArea");
        return value !== undefined && value !== "";
    }

    // console.log(isResearchAreaSelected())
    // console.log(selectionProcess)
    // console.log(watch())	
    
    // Função responsável por processar os dados do formulário quando ele é submetido. Ela faz uma
    // cópia dos dados do formulário, verifica se algum campo é um input do tipo file, e se for,
    // substitui a lista de arquivos pelo primeiro arquivo (tratamento necessário para o envio
    // ao serviço de cloud).
    async function onSubmit(data) {
        try {
            // Cria uma cópia dos dados do formulário
            const formData = { ...data }
            // Verifica se o valor é uma lista de arquivos
            for (const key in formData) {
                // Verifica se o valor associado à chave é uma lista de arquivos (FileList)
                if (formData[key] instanceof FileList) {
                    // Pega o primeiro arquivo da lista
                    const file = formData[key][0]
                    if (file) {
                        // Upload no Appwrite Storage e obtém o fileId
                        const fileId = await uploadFileToStorage(file)
                        // Substitui o arquivo pelo fileId
                        formData[key] = fileId
                    }
                }
            }

            // Filtra os dados do formulário para remover valores undefined
            const filteredData = Object.fromEntries(
                Object.entries(formData).filter(([_, value]) => value !== undefined)
            )
        
            console.log(filteredData)

            // Envia os dados processados para a função addApplication
            await addApplication(id, filteredData, displayName, uid, userEmail)
            navigate(`/processes/${id}`, { replace: true })
        } catch (error) {
            console.error("Erro fazer inscrição: ", error)
            setError(error)
            alert("Erro ao fazer inscrição: " + error.message)
        }
    }

    // Array de JSX.Element que contém os campos do formulário de inscrição de um processo.
    // Cada campo é um label que contém um input (com validação), um botão para limpar o campo (caso seja 
    // um input do tipo file), e uma mensagem de erro (caso exista).
    const inputElements = selectionProcess?.registrationFieldsInfo?.map((info) => {
        const isFile = info.type === "file";
    
        const validationRules = isFile
            ? {
                  required: info.required ? `${info.name} é obrigatório.` : false,
                  validate: validateFile,
              }
            : {
                  required: info.required ? `${info.name} é obrigatório.` : false,
              };
    
        const fieldValue = watch(info.name);
        const isModified = fieldValue && fieldValue.length > 0;
    
        return (
            <BoldLabel htmlFor={info.name} key={info.name}>
                {info.name}
                {info.required && <RedSpan>*Obrigatório</RedSpan>}
    
                {isFile ? (
                        <FileInputContainer className={isModified ? "with-file" : ""}>
                            <Input
                                {...register(info.name, validationRules)}
                                name={info.name}
                                type="file"
                                aria-label={info.name}
                                required={info.required}
                            />
                            {isModified && (
                                <RedButton type="button" onClick={() => resetField(info.name)}>
                                    LIMPAR
                                </RedButton>
                            )}
                        </FileInputContainer>
                    ) : (
                        <Input
                            {...register(info.name, validationRules)}
                            name={info.name}
                            type={info.type}
                            placeholder={info.name}
                            aria-label={info.name}
                            required={info.required}
                        />
                    )
                }
    
                {errors[info.name] && <RedSpan>{errors[info.name].message}</RedSpan>}
            </BoldLabel>
        )
    })

    return (
        <ApplicationContainer>
            <Box>
                <TitleContainer>
                    <h1>INSCRIÇÃO</h1>
                </TitleContainer>
                { loading ? 
                        <LoaderContainer>
                            <ReactLoading 
                                type={"spinningBubbles"}
                                color={"#008442"}
                                height={"40%"}
                                width={"40%"}
                            />
                        </LoaderContainer>
                    :
                        <ApplicationFormContainer onSubmit={handleSubmit(onSubmit)}>
                            <h2>DADOS DO CANDIDATO</h2>
                                <InputContainer>
                                {selectionProcess?.researchFieldRequired ? (
                                    <BoldLabel htmlFor="researchArea">
                                        Linha de Pesquisa
                                        <Select
                                            optionPlaceholder="Selecione a linha de pesquisa desejada"
                                            optionsArray={researchAreas}
                                            {...register("researchArea", { required: "Linha de pesquisa é obrigatória." })}
                                            name="researchArea"
                                            required
                                        />
                                    </BoldLabel>
                                    ) : (
                                        inputElements
                                    )}
                                    {selectionProcess?.researchFieldRequired && isResearchAreaSelected() && inputElements}
                                </InputContainer>
                                {(!selectionProcess?.researchFieldRequired || isResearchAreaSelected()) && (
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
                                    )
                                }
                        </ApplicationFormContainer>
                }       
            </Box>
        </ApplicationContainer>
    )
}