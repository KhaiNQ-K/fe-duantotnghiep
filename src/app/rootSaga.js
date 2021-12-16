import authSaga from 'components/Admin/Auth/authSaga';
import customerSaga from 'components/Admin/Customers/CustomerSaga';
import dentistSaga from 'components/Admin/Dentists/DentistSaga';
import { all } from 'redux-saga/effects';
import communesSaga from './communes/communesSaga';
import districtSaga from './districts/districSaga';
import provinceSaga from './provinceSaga';

export function* rootSaga() {
  yield all([
    authSaga(),
    dentistSaga(),
    customerSaga(),
    provinceSaga(),
    districtSaga(),
    communesSaga(),
  ]);
}
