import React from 'react';
import styled from 'styled-components';
import Button from './Button';

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
  text-align: left;
`;

const TableRow = styled.tr`

`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const RedButton = styled(Button)`
  background-color: red;
  color: white;

  &:hover {
    background-color: darkred;
  }
`

export default function Table({ columnsNames, data }) {
  return (
    <StyledTable>
        <TableHead>
            <TableRow>
                {columnsNames.map((col, index) => (
                    <TableHeader key={index}>
                        {col}
                    </TableHeader>
                ))}
                <TableHeader>
                    Ações
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
                    <TableCell>
                        <Button type="button">
                            EDITAR
                        </Button>
                        <RedButton type="button">
                            EXCLUIR
                        </RedButton>
                    </TableCell>
                </TableRow>
            ))}
        </tbody>
    </StyledTable>
  );
}