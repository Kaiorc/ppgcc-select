import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const TableRow = styled.tr`

`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const ButtonCell = styled(TableCell)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

const RedButton = styled(Button)`
  background-color: red;
  color: white;

  &:hover {
    background-color: darkred;
  }
`

// Componente que renderiza uma tabela com ações de edição e exclusão. Recebe os nomes das colunas, os dados e as funções de edição e exclusão como props.
export default function Table({ columnsNames, data, onEditField, onDeleteField }) {
  return (
    <StyledTable>
        <TableHead>
            <TableRow>
                {columnsNames.map((column, index) => (
                    <TableHeader key={index}>
                        {column}
                    </TableHeader>
                ))}
                <TableHeader>
                    AÇÕES
                </TableHeader>
            </TableRow>
        </TableHead>
        <tbody>
            {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                    {columnsNames.map((col, colIndex) => (
                        <TableCell key={colIndex}>
                            {row[col]}
                        </TableCell>
                    ))}
                    <ButtonCell>
                        <Button 
                          type="button"
                          onClick={() => onEditField(rowIndex)}>
                            EDITAR
                        </Button>
                        <RedButton 
                          type="button"
                          onClick={() => onDeleteField(rowIndex)}>
                            EXCLUIR
                        </RedButton>
                    </ButtonCell>
                </TableRow>
            ))}
        </tbody>
    </StyledTable>
  )
}