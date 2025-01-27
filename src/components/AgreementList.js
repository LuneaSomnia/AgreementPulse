import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getDaysUntilExpiration } from '../utils/dateUtils';

function AgreementList({ agreements }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Expiration</TableCell>
            <TableCell>Days Until Expiration</TableCell>
            <TableCell>Health Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agreements.map((agreement) => (
            <TableRow key={agreement.id}>
              <TableCell>{agreement.title}</TableCell>
              <TableCell>{agreement.status}</TableCell>
              <TableCell>{agreement.expirationDate}</TableCell>
              <TableCell>{getDaysUntilExpiration(agreement.expirationDate)}</TableCell>
              <TableCell>{agreement.healthScore}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AgreementList;
