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
import voucherApi from 'api/voucherApi';

const columns = [
  { id: 'id', label: 'Id', minWidth: 50 },
  { id: 'content', label: 'Nội dung', minWidth: 100 },
  {
    id: 'image',
    label: 'Ảnh',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'sale',
    label: 'Giảm giá',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'start',
    label: 'Ngày bắt đầu',
    minWidth: 150,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'end',
    label: 'Ngày Kết thúc',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'createAt',
    label: 'Ngày tạo',
    minWidth: 150,
    align: 'right',
    format: (value) => value.toFixed(2),
  }
];

export default function VoucherList( {handleChange, listVoucher, setListVoucher} ) {
  const initValue = {id: '', title: '', content: '', image: '', accounts: '', deleteAt: 0};
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
      voucherApi.delete(data.id, data)
    }
  }

  return (
      <div>
        <Button variant="contained" onClick={ e => handleChange(e, "1", initValue)} style={{marginBottom: '1em'}}>
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
                    <TableCell style={{ minWidth: 250 }}>
                        Thao tác
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listVoucher
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            if(column.id == "image") {
                              return <TableCell key={column.id} align={column.align}> 
                                        <img src={"http://localhost:8080/api/v1/files/download/image?filename=" + column.format && typeof value === 'number'
                                          ? column.format(value)
                                          : value} alt="" />
                                    </TableCell>
                            }else {
                              return (
                                  <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                              )
                            }
                            })}
                            <TableCell style={{ minWidth: 150 }}>
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
                count={listVoucher.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </div>
  );
}
