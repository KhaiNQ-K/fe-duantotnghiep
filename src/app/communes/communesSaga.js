import { call, put, takeEvery } from '@redux-saga/core/effects';
import communeApi from 'api/communeApi';
import { communesAction } from './communesSlice';
function* fetchCommunesList(action) {
  try {
    const response = yield call(communeApi.getByDistrict, action.payload);
    yield put(communesAction.fetchCommunesListSuccess(response.data));
  } catch (error) {
    console.log('Failed to fetch city list', error);
    yield put(communesAction.fetchCommunesFaild());
  }
}

export default function* communesSaga() {
  yield takeEvery(communesAction.fetchCommunesList.type, fetchCommunesList);
}
