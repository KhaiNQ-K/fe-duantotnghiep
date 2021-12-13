// import { applyMiddleware, createStore } from "redux";
// import createSagaMiddleware from "redux-saga";
// import logger from "redux-logger";
// import rootReducer from "./rootReducer";

import { configureStore } from '@reduxjs/toolkit';
import provinceReducer from './provinceSlice';
import { combineReducers } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './rootSaga';
import districtReducer from './districts/districtSlice';
import communesReducer from './communes/communesSlice';
import dentistReducer from 'components/Admin/Dentists/DentistSlice';
import customerReducer from 'components/Admin/Customers/CustomerSlice';
import authReducer from 'components/Admin/Auth/authSlice';
// const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware];

// if (process.env.NODE_ENV === "development") {
//   middlewares.push(logger);
// }

// const store = createStore(rootReducer, applyMiddleware(...middlewares));
// sagaMiddleware.run(rootSaga);
// export default store;
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  province: provinceReducer,
  district: districtReducer,
  communes: communesReducer,
  dentist: dentistReducer,
  customer: customerReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
