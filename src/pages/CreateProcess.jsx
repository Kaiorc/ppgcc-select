import React, { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import Box from "../components/Box";
import Table from "../components/Table";
import RegistrationFieldModal from "../components/RegistrationFieldModal";
import ImportProcessFieldModal from "../components/ImportProcessFieldModal";
import { createProcess } from "../../api";

const CreateProcessBox = styled(Box)`
    padding: 1em;
`;

const CreateProcessFormContainer = styled.form`
    
`;

const InputContainer = styled.div`
    & input[type=date] {
        margin-top: 0;
    };
`;

const ButtonContainer = styled.div`

`;

const TableHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const RedButton = styled(Button)`
  background-color: red;
  color: white;

  &:hover {
    background-color: darkred;
  }
`;

export default function CreateProcess() {
    const [processFormData, setProcessFormData] = useState({
        name: "", 
        places: "",
        miniDescription: "", 
        description: "",
        startDate: "",
        endDate: "",
        endAnalysisDate: "", 
        registrationFieldsInfo: []
    });

    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await createProcess(processFormData);
            console.log("Processo criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar processo: ", error);
        }
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setProcessFormData(prevProcessFormData => ({
            ...prevProcessFormData,
            [name]: value
        }));
    }

    const handleAddField = (field) => {
        setProcessFormData(prevProcessFormData => ({
            ...prevProcessFormData,
            registrationFieldsInfo: [...prevProcessFormData.registrationFieldsInfo, field]
        }));
    };

    const handleImportFields = (process) => {
        setProcessFormData(prevProcessFormData => ({
            ...prevProcessFormData,
            registrationFieldsInfo: [
                ...prevProcessFormData.registrationFieldsInfo,
                ...process.registrationFieldsInfo
            ]
        }));
        setIsImportModalOpen(false);
    };

    return (
        <CreateProcessBox>
            <h1>CRIAR PROCESSO SELETIVO</h1>
            <CreateProcessFormContainer onSubmit={handleSubmit}>
                <h2>DADOS MÍNIMOS OBRIGATÓRIOS</h2>
                    <InputContainer>
                        <Input
                            name="name"
                            onChange={handleChange}
                            type="text"
                            placeholder="Nome"
                            value={processFormData.name}
                            aria-label="Nome"
                            required
                        />
                        <Input
                            name="places"
                            onChange={handleChange}
                            type="number"
                            min= "1"
                            placeholder="Número de vagas"
                            value={processFormData.places}
                            aria-label="Número de Vagas"
                            required
                        />
                        <Input
                            name="miniDescription"
                            onChange={handleChange}
                            type="text"
                            placeholder="Mini Descrição"
                            value={processFormData.miniDescription}
                            aria-label="Mini Descrição"
                            required
                        />
                        <TextArea
                            name="description"
                            onChange={handleChange}
                            type="text"
                            placeholder="Descrição"
                            value={processFormData.description}
                            aria-label="Descrição"
                            required
                        />
                        <label htmlFor="startDate">
                            Data de início de inscrição
                            <Input
                                name="startDate"
                                onChange={handleChange}
                                type="date"
                                placeholder="Data de início"
                                value={processFormData.startDate}
                                aria-label="Data de início"
                                required
                            />
                        </label>
                        <label htmlFor="endDate">
                            Data de término de inscrição
                            <Input
                                name="endDate"
                                onChange={handleChange}
                                type="date"
                                placeholder="Data de término"
                                value={processFormData.endDate}
                                aria-label="Data de término"
                                required
                            />    
                        </label>
                        <label htmlFor="endAnalysisDate">
                            Data de limite da análise de inscrição
                            <Input
                                name="endAnalysisDate"
                                onChange={handleChange}
                                type="date"
                                placeholder="Data de término da análise"
                                value={processFormData.endAnalysisDate}
                                aria-label="Data de término da análise"
                                required
                            />
                        </label>
                    </InputContainer>
                    <TableHeaderContainer>
                        <h2>DADOS SOLICITADOS AO CANDIDATO</h2>
                        <ButtonContainer>
                            <Button type="button" onClick={() => setIsImportModalOpen(true)}>
                                IMPORTAR
                            </Button>
                            <Button type="button" onClick={() => setIsRegistrationModalOpen(true)}>
                                + CAMPO
                            </Button>
                        </ButtonContainer>
                    </TableHeaderContainer>
                    <Table 
                        columnsNames={["Nome", "Tipo", "Obrigatório"]} 
                        data={processFormData.registrationFieldsInfo.map(field => ({
                            Nome: field.name,
                            Tipo: field.type,
                            Obrigatório: field.required ? "Sim" : "Não"
                        }))} 
                    />
                    <ButtonContainer>
                        <Link to="/processes">
                            <Button type="button">
                                CANCELAR
                            </Button>
                        </Link>
                        <Button type="submit">
                            CRIAR
                        </Button>
                        <Button type="button" onClick={() => console.log(processFormData)}>
                            CONSOLAR LOGAR 
                        </Button>
                    </ButtonContainer>
                {
                    isRegistrationModalOpen && (
                        <RegistrationFieldModal 
                            onClose={() => setIsRegistrationModalOpen(false)} 
                            onSave={handleAddField} 
                        />
                    )
                }
                {
                    isImportModalOpen && (
                        <ImportProcessFieldModal 
                            onClose={() => setIsImportModalOpen(false)} 
                            onImport={handleImportFields} 
                        />
                    )
                }
            </CreateProcessFormContainer>
        </CreateProcessBox>
    );
}