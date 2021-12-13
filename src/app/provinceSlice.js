import { createSlice, createSelector } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  list: [],
};
const provinceSlice = createSlice({
  name: 'province',
  initialState,
  reducers: {
    fetchProvinceList(state) {
      state.loading = true;
    },
    fetchProvinceListSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
      // state.loading = false;
      //state.list = action.payload;
    },
    fetchProvinceFaild(state) {
      state.loading = false;
    },
  },
});

//Action
export const provinceAction = provinceSlice.actions;

//Selectors
export const selectProvinceList = (state) => state.province.list;

export const selectProvinceOptions = createSelector(selectProvinceList, (provinceList) =>
  provinceList.map((province) => ({
    label: province.name,
    value: province.id,
  }))
);
const provinceReducer = provinceSlice.reducer;

export default provinceReducer;
