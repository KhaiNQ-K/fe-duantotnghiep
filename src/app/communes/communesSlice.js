import { createSlice, createSelector } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  list: [],
};
const communesSlice = createSlice({
  name: 'communes',
  initialState,
  reducers: {
    fetchCommunesList(state) {
      state.loading = true;
    },
    fetchCommunesListSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchCommunesFaild(state) {
      state.loading = false;
    },
  },
});

//Action
export const communesAction = communesSlice.actions;

//Selectors
export const selectCommunesList = (state) => state.communes.list;

export const selectCommunesOptions = createSelector(selectCommunesList, (communesList) =>
  communesList.map((communes) => ({
    label: communes.name,
    value: communes.id,
  }))
);
const communesReducer = communesSlice.reducer;

export default communesReducer;
