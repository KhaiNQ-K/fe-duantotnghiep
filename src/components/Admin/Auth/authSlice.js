import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      console.log('logging');
      state.logging = true;
    },
    loginSuccess(state, action) {
      console.log('login success');
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action) {
      console.log('login failed');
      state.logging = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});
//Actions

export const authActions = authSlice.actions;

//Selectors

export const selectIsLogged = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;
export const selectCurrentUser = (state) => state.auth.currentUser;
//Reducer
const authReducer = authSlice.reducer;
export default authReducer;
