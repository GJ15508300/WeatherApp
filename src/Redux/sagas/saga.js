import {put, takeLatest} from 'redux-saga/effects';
import {
liveWeather,
} from '../../Services/Api/index';
import {
LiveWeatherDataRequest,
LiveWeatherDataSucess,
LiveWeatherDataFailure
} from '../slices/weatherSlice';

export function* callLiveWeather(action) {
  console.log('Dispatched action:', action); 
  try {
    const response = yield liveWeather(action.payload);
    yield put(LiveWeatherDataSucess(response));
  } catch (e) {
    yield put(LiveWeatherDataFailure(e));
  }
}

export function* authSaga() {
  // console.log('LiveWeatherDataRequest:', LiveWeatherDataRequest); 
  yield takeLatest(LiveWeatherDataRequest.type, callLiveWeather);
 
}
