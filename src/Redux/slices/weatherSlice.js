import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  LiveWeatherData:null,
};

const weatherSlice = createSlice({
  initialState,
  name: 'weather',
  reducers: {
    
    LiveWeatherDataRequest(state, action) {
      console.log('LiveWeatherData action', action.payload);
      state.isLoading = true;
      state.error = false;
    },
    LiveWeatherDataSucess(state, action) {
      state.LiveWeatherData = action.payload;
      console.log('LiveWeatherData success', action.payload);
      state.isLoading = false;
      state.error = false;
    },
    LiveWeatherDataFailure(state, action) {
      console.log('LiveWeatherData failure', action.payload);
      state.isLoading = false;
      state.error = true;
    },
 
   
   
  },
});
export const {
  LiveWeatherDataRequest,
  LiveWeatherDataSucess,
  LiveWeatherDataFailure
} = weatherSlice.actions;

export default weatherSlice.reducer;
