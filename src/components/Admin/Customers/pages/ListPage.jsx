import { makeStyles } from '@material-ui/core';
import { LinearProgress, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import customerApi from 'api/customerApi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import CustomerTable from '../components/CustomerTable';
import { customerAction, selectCustomerList, selectCustomerLoading } from '../CustomerSlice';
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
  const match = useRouteMatch();
  const history = useHistory();
  const customerList = useSelector(selectCustomerList);
  const loading = useSelector(selectCustomerLoading);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(customerAction.fetchCustomerList());
  }, [dispatch]);
  const handleEditCustomer = async (customer) => {
    history.push(`${match.url}/${customer.id}`);
  };
  const handleRemoveCustomer = async (dentist) => {
    console.log(dentist);
    try {
      // Remove student API
      await customerApi.delete(dentist?.id || '');
      toast.success('Xoá người dùng thành công!');
      // Trigger to re-fetch student list with current filter
      const newCustomerList = customerList.filter((val) => {
        return val.id != dentist.id;
      });
      dispatch(customerAction.setFiler(newCustomerList));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch customer', error);
    }
  };
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };
  //get current dentist
  const indexOfLastCustomer = page * rowsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - rowsPerPage;
  const currentCustomer = customerList.slice(indexOfFirstCustomer, indexOfLastCustomer);
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Quản lý khách hàng</Typography>
      </Box>

      {/* <Box mb={3}>
    <StudentFilters
      filter={filter}
      cityList={cityList}
      onChange={handleFilterChange}
      onSearchChange={handleSearchChange}
    />
  </Box> */}

      <CustomerTable
        customerList={currentCustomer}
        onEdit={handleEditCustomer}
        onRemove={handleRemoveCustomer}
      />

      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(customerList.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

ListPage.propTypes = {};

export default ListPage;
