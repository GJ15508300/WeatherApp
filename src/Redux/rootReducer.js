import {combineReducers} from 'redux';
import authReducer from './slices/weatherSlice';
// import dashboardReducer from './slices/dashSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  // dashboard: dashboardReducer,
});

export default rootReducer;
