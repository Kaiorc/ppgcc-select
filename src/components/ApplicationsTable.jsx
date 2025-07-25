import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const StyledTableContainer = styled.div`
    width: 100%;
    padding: 0 1rem 1rem 1rem;
    overflow-x: auto; 
    isolation: isolate;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 600px;
`

const TableHead = styled.thead`
  background-color: #f2f2f2;
`

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  color: white;
  background-color: #008442;
`

const TableRow = styled.tr`

`

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-weight: bold;
`

// Componente que renderiza a tabela de inscrições, recebendo os nomes das colunas, os dados e a função de avaliação 
export default function ApplicationsTable({ columnsNames, data, onEvaluate }) {
  return (
    <StyledTableContainer>
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
    </StyledTableContainer>
  )
}