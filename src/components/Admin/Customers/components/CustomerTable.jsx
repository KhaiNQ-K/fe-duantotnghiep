import { makeStyles } from '@material-ui/core';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Button } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import React, { useState } from 'react';
const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));

function CustomerTable({ customerList, onEdit, onRemove, onAddVoucher }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveClick = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };
  const handleRemoveConfirm = (customer) => {
    onRemove?.(customer);
    setOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"> ID</TableCell>
              <TableCell></TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Giới tính</TableCell>
              <TableCell align="center">Địa chỉ</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customerList.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell align="center">{customer.id}</TableCell>
                <TableCell align="center">
                  {
                    <img
                      style={{ width: '100px', height: '100px' }}
                      src={
                        'http://localhost:8080/api/v1/files/download/image?filename=' +
                        customer.image
                      }
                      alt="image"
                    />
                  }
                </TableCell>
                <TableCell align="center">{customer.fullname}</TableCell>
                <TableCell align="center">{customer.gender ? 'Nam' : 'Nữ'}</TableCell>
                <TableCell align="center">
                  {customer.communes.name +
                    ' ' +
                    customer.communes.districts.name +
                    ' ' +
                    customer.communes.districts.provinces.name}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    className={classes.edit}
                    color="primary"
                    onClick={() => onEdit?.(customer)}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="small"
                    className={classes.edit}
                    color="primary"
                    onClick={() => onAddVoucher?.(customer)}
                  >
                    Tặng voucher
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleRemoveClick(customer)}
                  >
                    Xoá
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xoá người dùng?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xoá người dùng này? "{selectedCustomer?.fullname}". <br />
            Hành động này &apos;không thể quay lại.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleRemoveConfirm(selectedCustomer)}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Xóa
          </Button>
          <Button onClick={handleClose} color="default" variant="outlined">
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

CustomerTable.propTypes = {};

export default CustomerTable;
