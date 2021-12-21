import { Button, makeStyles } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
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
import React, { useState } from 'react';
const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));

function DentistTable({ dentistList, onEdit, onRemove }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState({});
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveClick = (dentist) => {
    setSelectedDentist(dentist);
    setOpen(true);
  };
  const handleRemoveConfirm = (dentist) => {
    onRemove?.(dentist);
    setOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Giới tính</TableCell>
              <TableCell align="center">Địa chỉ</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dentistList.map((dentist) => (
              <TableRow key={dentist.id}>
                <TableCell align="center">{dentist.id}</TableCell>
                <TableCell align="center">
                  {
                    <img
                      style={{ width: '150px', height: '100px' }}
                      src={`${process.env.REACT_APP_API}/files/download/image?filename=${dentist.image}`}
                      alt="image"
                    />
                  }
                </TableCell>
                <TableCell align="center">{dentist.fullName}</TableCell>
                <TableCell align="center">{dentist.gender ? 'Nam' : 'Nữ'}</TableCell>
                <TableCell align="center">
                  {dentist.communes.name +
                    ' ' +
                    dentist.communes.districts.name +
                    ' ' +
                    dentist.communes.districts.provinces.name}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    className={classes.edit}
                    color="primary"
                    onClick={() => onEdit?.(dentist)}
                  >
                    Sửa
                  </Button>

                  <Button size="small" color="secondary" onClick={() => handleRemoveClick(dentist)}>
                    Xóa
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
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xoá nha sĩ này "{selectedDentist?.name}". <br />
            Hành động này &apos;không thể quay lại
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleRemoveConfirm(selectedDentist)}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
          <Button onClick={handleClose} color="default" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DentistTable.propTypes = {};

export default DentistTable;
