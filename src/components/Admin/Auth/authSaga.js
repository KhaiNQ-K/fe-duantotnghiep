import authApi from 'api/authApi';
import { useHistory } from 'react-router-dom';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions } from './authSlice';
function* handleLogin(payload) {
  try {
    const res = yield call(authApi.login(payload));
    console.log(res);
    // localStorage.setItem('access_token', res.data.token);
    //yield put(authActions.loginSuccess(payload));
  } catch (error) {
    yield put(authActions.loginFailed(error.message));
  }
}
function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}
export function* authSaga() {
  yield fork(watchLoginFlow);
}
