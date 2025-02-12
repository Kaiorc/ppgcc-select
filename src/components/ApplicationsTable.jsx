import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`

const TableHead = styled.thead`
  background-color: #f2f2f2;
`

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`

const TableRow = styled.tr`

`

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`

export default function ApplicationsTable({ columnsNames, data, onEvaluate }) {
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
                    <TableCell>
                        <Button 
                          type="button"
                          onClick={() => onEvaluate(row.uid)}>
                            AVALIAR
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </tbody>
    </StyledTable>
  )
}