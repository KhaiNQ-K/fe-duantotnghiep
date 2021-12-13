import { createSlice, createSelector } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  list: [],
};
const districtSlice = createSlice({
  name: 'district',
  initialState,
  reducers: {
    fetchDistrictList(state) {
      state.loading = true;
    },
    fetchDistrictListSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchDistrictFaild(state) {
      state.loading = false;
    },
  },
});

//Action
export const districtAction = districtSlice.actions;

//Selectors
export const selectDistrictList = (state) => state.district.list;

export const selectDistrictOptions = createSelector(selectDistrictList, (districtList) =>
  districtList.map((district) => ({
    label: district.name,
    value: district.id,
  }))
);
const districtReducer = districtSlice.reducer;

export default districtReducer;
