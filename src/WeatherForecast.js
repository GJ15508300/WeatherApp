
import { View, Text, StyleSheet, FlatList } from 'react-native';

import Lottie from 'lottie-react-native';


const WeatherForecast = ({ location, daily_forecast }) => {
  // Check if the forecast data is available
  if (!daily_forecast || daily_forecast.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No weather data available.</Text>
      </View>
    );
  }


  const getBackgroundColor = (weatherCondition) => {
  switch (weatherCondition) {
    case 'Sunny':
      return '#ffe135'; // Yellow for sunny
    case 'Rainy':
      return '#a0c4ff'; // Light blue for rainy
    case 'Cloudy':
      return '#77b1d4'; // Gray for cloudy
      case 'Partly Cloudy':
      return '#90d5ff';
    default:
      return '#D3D3D3'; // Default white background
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.location}>
        Weather Forecast for {location.city}, {location.country}
      </Text>
      <FlatList
        data={daily_forecast}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
         <View style={[styles.forecastItem, { backgroundColor: getBackgroundColor(item.weather_conditions) }]}>
    
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.weatherCondition}>{item.weather_conditions}</Text>
            <Text style={styles.temperatures}>
              Max: {item.max_temperature}°F, Min: {item.min_temperature}°F
            </Text>
            
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    // top:30,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forecastItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weatherCondition: {
    fontSize: 16,
    color: '#6c757d',
  },
  temperatures: {
    fontSize: 16,
    color: '#343a40',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#dc3545',
  },
});

export default WeatherForecast;
