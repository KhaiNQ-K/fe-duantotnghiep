import { makeStyles } from '@material-ui/core';
import { LinearProgress, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dentistApi from 'api/dentistApi';
import scheduletimeApi from 'api/scheduletimeApi';
import { selectProvinceList } from 'app/provinceSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import toastifyAlert from 'utils/toastify';
import DentistFilters from '../components/DentistFilters';
import DentistTable from '../components/DentistTable';
import { dentistAction, selectDentistList, selectDentistLoading } from '../DentistSlice';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));
function ListPage(props) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    province: null,
    name: null,
  });
  const match = useRouteMatch();
  const history = useHistory();
  const dentistList = useSelector(selectDentistList);
  const loading = useSelector(selectDentistLoading);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(dentistAction.fetchDentistList());
  }, [dispatch]);
  const provinceList = useSelector(selectProvinceList);
  const handleEditDentist = async (student) => {
    history.push(`${match.url}/${student.id}`);
  };
  const handleRemoveDentist = async (dentist) => {
    try {
      // Remove student API
      await dentistApi.remove(dentist?.id || '');
      toast.success('Xoá bác sĩ thành công!');
      // Trigger to re-fetch student list with current filter
      const newDentistList = dentistList.filter((val) => {
        return val.id != dentist.id;
      });
      dispatch(dentistAction.setFilter(newDentistList));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch student', error);
    }
  };
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  const handleClickScheduleTime = async () => {
    await scheduletimeApi.add();
    toastifyAlert.success('Tạo lịch thành công!');
  };
  //get current dentist
  const indexOfLastDentist = page * rowsPerPage;
  const indexOfFirstDentist = indexOfLastDentist - rowsPerPage;
  const currentDentist = dentistList.slice(indexOfFirstDentist, indexOfLastDentist);
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Quản lý nha sĩ</Typography>
        <Button onClick={handleClickScheduleTime}>Tạo lịch làm việc cho nha sĩ</Button>
      </Box>

      <DentistTable
        dentistList={currentDentist}
        onEdit={handleEditDentist}
        onRemove={handleRemoveDentist}
        page={page}
        rowsPerPage={rowsPerPage}
      />

      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(dentistList.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

ListPage.propTypes = {};

export default ListPage;
