import authApi from 'api/authApi';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import history from 'utils/history';
import { authActions } from './authSlice';

function* handleLogin(payload) {
  try {
    //yield delay(1000);
    //localStorage.setItem('access_token', 'fake_token');
    const res = yield call(authApi.login, payload);
    localStorage.setItem('access_token', res.data.token);

    if (Boolean(localStorage.getItem('access_token'))) {
      const response = yield call(authApi.getUserLogin);
      localStorage.setItem('role', response.data.rolesId);
      yield put(authActions.loginSuccess(response.data));
      // redirect to admin page
      yield history.push('/admin/dashboard');
    }
  } catch (error) {
    console.log(error);
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  console.log('watch logout');
  yield delay(500);
  localStorage.removeItem('access_token');
  // redirect to login page
  yield history.push('/login');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    } else {
      yield take(authActions.logout.type);
      yield call(handleLogout);
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
