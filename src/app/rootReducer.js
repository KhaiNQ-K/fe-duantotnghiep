import accountReducer from 'components/Admin/Account/redux/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  account: accountReducer
});

export default rootReducer;
