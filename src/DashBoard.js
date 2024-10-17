import React, {useCallback, useEffect, useState} from 'react';
import { Text, SafeAreaView, StyleSheet,TextInput,View,Button,TouchableOpacity  } from 'react-native';
import Lottie from 'lottie-react-native';
import WeatherDisplay from './WeatherDisplay'; 
import WeatherForecast from './WeatherForecast';
import WeatherHistory from './WeatherHistory';
import {useDispatch, useSelector} from 'react-redux';
// import LiveWeatherDataRequest from './Redux/slices/slices.js'
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function App() {
 const dispatch = useDispatch();
const user = useSelector((state) => state?.auth);
 const [weatherData, setWeatherData] = useState(null);
 const [weatherForecastData, setWeatherForecastData] = useState(null);
 const [weatherDataHistory, setWeatherDataHistory] = useState(null);
 const [searchQuery, setSearchQuery] = useState('');
 
 const [showWeatherHistory, setShowWeatherHistory] = useState(false);
 
 const [showWeatherForeCast, setShowWeatherForeCast] = useState(false);

 
 
 const [location, setLocation] = useState(null);
 
 const [locationErrorMessage, setLocationErrorMessage] = useState(null);

//  console.log('location',location)
  // console.log('locationErrorMessage data',locationErrorMessage)
  // console.log('User data',user)
  // console.log('weatherData',weatherData)
// console.log("weatherForecastData",weatherForecastData)
// console.log('weatherDataHistory',weatherDataHistory)

  useEffect(() => {
    const getWeatherData = async () => {
    const url = `https://apps.org.in/weather/live/`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log("API Response data :",data); // Use the data in your app

    setWeatherData(data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};
getWeatherData();
    // dispatch(LiveWeatherDataRequest());
  }, [dispatch]);



   useEffect(() => {
    const getWeatherForeCastData = async () => {
    const url = `https://apps.org.in/weather/forecast/`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log("API Response forecast data :",data); // Use the data in your app

    setWeatherForecastData(data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

getWeatherForeCastData();
    // dispatch(LiveWeatherDataRequest());
  }, []);



 useEffect(() => {
    const getWeatherDataHistory = async () => {
    const url = `https://apps.org.in/weather/history/`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
        // console.log("API Response data History:", data);

        setWeatherDataHistory(data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};
getWeatherDataHistory();
    // dispatch(LiveWeatherDataRequest());
  }, []);




useEffect(()=>{
    
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status",status)
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      console.log('currentLocation',currentLocation)
      setLocation(currentLocation.coords);
      setLocationErrorMessage(null);
    } catch (error) {
      console.log('error',error)
      setLocationErrorMessage(error.message);
    }
  };

  getCurrentLocation();
},[])



  const clearSearch = () => {
    setSearchQuery(''); 
  };



  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search city..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Icon name="clear" size={24} color="#999" />
          </TouchableOpacity>
        )}
      </View>
    
        {searchQuery? <Text style={styles.searchDataEmpty}>City Not Found</Text>:
        <>
{showWeatherHistory?
<WeatherHistory 
location={weatherDataHistory?.location}
 historical_weather={weatherDataHistory?.historical_weather}
weatherHistoryData={weatherDataHistory}/>
:   showWeatherForeCast ? 

<WeatherForecast
  location={{
    city: weatherForecastData?.location?.city || 'Unknown City', // Provide a default value if city is undefined
    country: weatherForecastData?.location?.country || 'Unknown Country', // Provide a default value if country is undefined
  }}
  daily_forecast={weatherForecastData?.daily_forecast || []} // Provide a default value (empty array) if daily_forecast is undefined
/>

:

 
<WeatherDisplay weatherData={weatherData} />
}
      

</>
        }
 <View style={styles.buttonContainer}>
        <Button title={showWeatherHistory ? 'Current Weather' :"Weather History"} onPress={() =>{showWeatherHistory ?setShowWeatherHistory(false) :setShowWeatherHistory(true),setShowWeatherForeCast(false)}} />
        <Button title={showWeatherForeCast?'Current Weather':"Weather Forecast"} onPress={() => {showWeatherForeCast ? setShowWeatherForeCast(false): setShowWeatherForeCast(true),setShowWeatherHistory(false)}} />
      </View>

     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: 'skyblue',
    padding: 8,
    // alignContent:'center',
    // alignItem:'center',
   top:50,
  },
  animationStyle:{
    position:'absolute'
  },
   searchDataEmpty: {
  fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color:'red'
  },
    buttonContainer: {
    flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-between', // Space between buttons
    padding:20,
    marginBottom:30,
  },
   inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  clearIcon: {
    padding: 5,
  },
});
