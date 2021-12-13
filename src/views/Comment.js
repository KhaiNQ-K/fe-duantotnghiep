import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { FormGroup, Input, Card, CardHeader, Row, Col } from 'reactstrap';
import PanelHeader from 'commons/PanelHeader/PanelHeader';
import commentApi from 'api/commentApi';

const columns = [
  { id: 'id', label: 'Id', minWidth: 50, align: 'center' },
  { id: 'content', label: 'Nội dung', minWidth: 120, align: 'center' },
  {
    id: 'image',
    label: 'Ảnh',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'createAt',
    label: 'Ngày đăng',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'postsId',
    label: 'Bài viết',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'accountsId',
    label: 'Người đăng bình luận',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'deleteAt',
    label: 'Active',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];
function Comment() {
  const initValue = {
    id: '',
    content: '',
    image: '',
    createAt: '',
    postsId: '',
    accountsId: '',
    deleteAt: 0,
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listComment, setListComment] = useState([initValue]);
  const [active, setActive] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    commentApi
      .getAll()
      .then((response) => {
        const { data } = response;
        setListComment(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error, error.response);
      });
  }, []);

  const hanldeOnChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setActive(value);
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <div>
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
                              <TableCell style={{ textAlign: 'center' }}>Thao tác</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listComment
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
                                      } else if (column.id == 'deleteAt') {
                                        return (
                                          <TableCell key={column.id} align={column.align}>
                                            <input
                                              name="active"
                                              type="checkbox"
                                              checked={value}
                                              onChange={(e) => setActive(e.target.value)}
                                            />
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
                                    <TableCell>
                                      <Button variant="contained" color="info">
                                        <EditIcon />
                                        Cập nhật
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
                        count={listComment.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </div>
                </Box>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Comment;
