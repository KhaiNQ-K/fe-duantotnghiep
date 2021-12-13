import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  list: [],
};
const CustomerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    fetchCustomerList(state) {
      state.loading = true;
    },
    fetchCustomerListSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchCustomerFaild(state) {
      state.loading = false;
    },
    setFiler(state, action) {
      state.list = action.payload;
    },
  },
});

//Action
export const customerAction = CustomerSlice.actions;

//Selectors
export const selectCustomerList = (state) => state.customer.list;

export const selectCustomerLoading = (state) => state.customer.loading;
const customerReducer = CustomerSlice.reducer;

export default customerReducer;
