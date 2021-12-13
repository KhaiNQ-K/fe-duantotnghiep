import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { dentistAction } from '../DentistSlice';

function DentistFilters({ provinceList, filter, onChange, onSearchChange }) {
  const dispatch = useDispatch();
  const handleProvinceChange = (e) => {
    if (!onChange) return;
    const newFilter = {
      ...filter,
      province: e.target.value,
    };
    onChange(newFilter);
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput id="searchByName" label="Search by name" endAdornment={<Search />} />
          </FormControl>
        </Grid>
        {/*               defaultValue={filter.name_like}
              onChange={handleSearchChange}
              inputRef={searchRef} */}
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              label="Filter by city"
              defaultValue={filter.province || 'all'}
              onChange={handleProvinceChange}
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>

              {provinceList.map((city, idx) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth>
            Clear
            {/* onClick={handleClearFilter} */}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

DentistFilters.propTypes = {};

export default DentistFilters;
