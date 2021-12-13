import { call, put, takeEvery } from '@redux-saga/core/effects';
import provinceApi from 'api/provinceApi';
import { provinceAction } from './provinceSlice';
function* fetchProvinceList() {
  try {
    const response = yield call(provinceApi.getAll);
    yield put(provinceAction.fetchProvinceListSuccess(response.data));
  } catch (error) {
    console.log('Failed to fetch city list', error);
    yield put(provinceAction.fetchProvinceFaild());
  }
}

export default function* provinceSaga() {
  yield takeEvery(provinceAction.fetchProvinceList.type, fetchProvinceList);
}
