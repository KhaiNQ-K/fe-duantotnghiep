import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import { Col, FormGroup, Input, Row } from 'reactstrap';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'accounts', label: 'Account', minWidth: 50 },
  { id: 'fullName', label: 'Họ tên', minWidth: 100 },
  { id: 'cccd', label: 'CCCD/CMT', minWidth: 100 },
  {
    id: 'telephone',
    label: 'Số điện thoại',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'birthday',
    label: 'Ngày sinh',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'gender',
    label: 'Giới tính',
    minWidth: 150,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'communes',
    label: 'Địa chỉ',
    minWidth: 150,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'image',
    label: 'Ảnh',
    minWidth: 150,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'exp',
    label: 'Kinh nghiệm',
    minWidth: 150,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

export default function DentistList({ handleChange, listDentist, setListDentist }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const initValue = {
    id: '',
    accounts: '',
    image: '',
    cccd: '',
    fullName: '',
    birthday: '',
    gender: '',
    communes: '',
    telephone: '',
    exp: '',
    createAt: '',
    updateAt: new Date(),
    deleteAt: 0,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={(e) => handleChange(e, '1')}
        style={{ marginBottom: '1em' }}
      >
        <AddIcon />
        Thêm
      </Button>

      <Row style={{ marginTop: '1%' }}>
        <Col className="pr-1" md="12">
          <FormGroup>
            <Input label={<SearchIcon />} type="text" placeholder="Search" />
          </FormGroup>
        </Col>
      </Row>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell style={{ minWidth: 250 }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listDentist
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id == 'image') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <img
                                style={{ width: '150px', height: '100px' }}
                                src={
                                  'http://localhost:8080/api/v1/files/download/image?filename=' +
                                  value
                                }
                                alt="image"
                              />
                            </TableCell>
                          );
                        } else if (column.id == 'accounts') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value).email
                                : value.email}
                            </TableCell>
                          );
                        } else if (column.id == 'communes') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value.name +
                                ' ' +
                                value.districts.name +
                                ' ' +
                                value.districts.provinces.name}
                            </TableCell>
                          );
                        } else if (column.id == 'gender') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value ? 'Nam' : 'Nữ'}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                      <TableCell style={{ minWidth: 150 }}>
                        <Button
                          variant="contained"
                          color="info"
                          onClick={(e) => handleChange(e, '1', row)}
                        >
                          <EditIcon />
                          Sửa
                        </Button>
                        <Button variant="contained" color="error" style={{ marginLeft: '1em' }}>
                          <DeleteIcon />
                          Xoá
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={listDentist.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
