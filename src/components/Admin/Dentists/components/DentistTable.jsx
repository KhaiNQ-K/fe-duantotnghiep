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
              <TableCell>ID</TableCell>
              <TableCell></TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dentistList.map((dentist) => (
              <TableRow key={dentist.id}>
                <TableCell>{dentist.id}</TableCell>
                <TableCell>
                  {
                    <img
                      style={{ width: '150px', height: '100px' }}
                      src={
                        'http://localhost:8080/api/v1/files/download/image?filename=' +
                        dentist.image
                      }
                      alt="image"
                    />
                  }
                </TableCell>
                <TableCell>{dentist.fullName}</TableCell>
                <TableCell>{dentist.gender ? 'Nam' : 'Nữ'}</TableCell>
                <TableCell>
                  {dentist.communes.name +
                    ' ' +
                    dentist.communes.districts.name +
                    ' ' +
                    dentist.communes.districts.provinces.name}
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    className={classes.edit}
                    color="primary"
                    onClick={() => onEdit?.(dentist)}
                  >
                    Edit
                  </Button>

                  <Button size="small" color="secondary" onClick={() => handleRemoveClick(dentist)}>
                    Remove
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
