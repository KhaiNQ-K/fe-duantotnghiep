import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

function TableDetailBooking({ title, customerBooking }) {
  console.log(customerBooking);
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Họ và tên</TableCell>
            <TableCell align="center">Địa chỉ</TableCell>
            <TableCell align="center">Tổng đơn</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customerBooking.map((customer, idx) => (
            <TableRow key={idx}>
              <TableCell align="center">{customer.name}</TableCell>
              <TableCell align="center">{customer.diachi}</TableCell>
              <TableCell align="center">{customer.tongdon}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableDetailBooking.propTypes = {};

export default TableDetailBooking;
