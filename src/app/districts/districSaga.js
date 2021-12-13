import { call, put, takeEvery } from '@redux-saga/core/effects';
import districtApi from 'api/districtApi';
import { districtAction } from './districtSlice';
function* fetchDistrictList(action) {
  try {
    console.log(action);
    const response = yield call(districtApi.getByProvinces, action.payload);
    yield put(districtAction.fetchDistrictListSuccess(response.data));
  } catch (error) {
    console.log('Failed to fetch city list', error);
    yield put(districtAction.fetchDistrictFaild());
  }
}

export default function* districtSaga() {
  yield takeEvery(districtAction.fetchDistrictList.type, fetchDistrictList);
}
