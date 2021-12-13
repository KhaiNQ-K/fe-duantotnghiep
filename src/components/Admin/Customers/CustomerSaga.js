import { call, put, takeLatest } from '@redux-saga/core/effects';
import { customerAction } from './CustomerSlice';
import customerApi from 'api/customerApi';

function* fetchCustomerList(action) {
  try {
    const response = yield call(customerApi.getAll, action.payload);
    console.log(response);
    yield put(customerAction.fetchCustomerListSuccess(response.data));
  } catch (error) {
    console.log('Failed to fetch customer list', error);
    yield put(customerAction.fetchCustomerFaild());
  }
}
export default function* customerSaga() {
  yield takeLatest(customerAction.fetchCustomerList.type, fetchCustomerList);
}
