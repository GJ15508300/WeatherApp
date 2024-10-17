import axios from 'axios';

export function liveWeather() {
  return axios.post('https://apps.org.in/weather/live/');
}



