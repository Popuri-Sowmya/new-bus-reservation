import { combineReducers } from 'redux';
import busReducer from './busReducer';
import searchReducer from './searchReducer';
import seatSelectionReducer from './seatSelectionReducer';
import authReducer from './authReducer';

console.log("inside combined reducers")
const rootReducer = combineReducers({
  bus: busReducer,
  search: searchReducer,
  seatSelection: seatSelectionReducer,
  auth: authReducer
});

export default rootReducer;