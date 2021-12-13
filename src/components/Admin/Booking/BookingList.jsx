import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {
    FormGroup,
    Input,
    Row,
    Col
  } from "reactstrap";
import bookingApi from 'api/bookingApi';

const columns = [
  { id: 'id',label : 'Id', minWidth: 50, align: 'center', },
  { id: 'dentistProfile', label: 'Bác sĩ', minWidth: 120, align: 'center' },
  {
    id: 'customerProfile',
    label: 'Khách hàng',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'bookingDate',
    label: 'Ngày đặt lịch',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  // {
  //   id: 'scheduleTime',
  //   label: 'Giờ đặt',
  //   minWidth: 100,
  //   align: 'center',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'description',
    label: 'Lời nhắn',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }
];

export default function BookingList({handleChange, listBooking, setListBooking}) {
  const initValue = {
    id: '',
    dentistProfile: '',
    customerProfile: '',
    bookingDate: '',
    description: '',
    status: '',
    scheduleTime: '',
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteHandle = (data) => {
    const confirm = window.confirm("Bạn muốn xoá bản ghi này!")
    if(confirm) {
      data.deleteAt = true
      console.log(data.id, data)
      bookingApi.delete(data.id, data)
    }
  }

  return (
      <div>
        <Button variant="contained" onClick={ e => handleChange(e, "1")} style={{marginBottom: '1em'}}>
            <AddIcon />
            Thêm
        </Button>
        
        <Row style={{marginTop: '1%'}}>
            <Col className="pr-1" md="12">
                <FormGroup>
                
                <Input
                    label={<SearchIcon />}
                    type="text" placeholder="Search"
                />
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
                    <TableCell style={{textAlign: 'center'}}>
                        Thao tác
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listBooking
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            if(column.id == "dentistProfile") {
                              return <TableCell key={column.id} align={column.align}>
                              {value.fullname}
                              </TableCell>
                            }else if(column.id == "customerProfile"){
                              return <TableCell key={column.id} align={column.align}>
                              {value.fullname}
                              </TableCell>
                            }else {
                              return (
                                  <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                              );
                            }})}
                            <TableCell>
                            <Button variant="contained" color="info" onClick={ e => handleChange(e, "1", row)}>
                                <EditIcon />
                                Sửa
                            </Button>
                            <Button variant="contained" color="error" style={{marginLeft: '1em'}} onClick={(e) => deleteHandle(row)}>
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
                count={listBooking.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </div>
  );
}
