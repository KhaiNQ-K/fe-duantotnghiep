import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  list: [],
};
const DentistSlice = createSlice({
  name: 'dentist',
  initialState,
  reducers: {
    fetchDentistList(state) {
      state.loading = true;
    },
    fetchDentistListSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchDentistFaild(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.list = action.payload;
    },
  },
});

//Action
export const dentistAction = DentistSlice.actions;

//Selectors
export const selectDentistList = (state) => state.dentist.list;

export const selectDentistLoading = (state) => state.dentist.loading;
const dentistReducer = DentistSlice.reducer;

export default dentistReducer;
