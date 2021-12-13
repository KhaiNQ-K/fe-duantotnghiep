import { call, put, takeLatest } from '@redux-saga/core/effects';
import dentistApi from 'api/dentistApi';
import { dentistAction } from './DentistSlice';

function* fetchDentistList(action) {
  try {
    const response = yield call(dentistApi.getAll, action.payload);
    yield put(dentistAction.fetchDentistListSuccess(response.data));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(dentistAction.fetchDentistFaild());
  }
}

export default function* dentistSaga() {
  yield takeLatest(dentistAction.fetchDentistList.type, fetchDentistList);
}
