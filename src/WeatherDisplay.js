import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Card } from 'react-native-paper';
import Lottie from 'lottie-react-native';

const WeatherDisplay = ({ weatherData }) => {
  // Providing default values
  const {
    location = { city: 'Unknown', country: 'Unknown' },
    current_weather: {
      temperature = 'N/A',
      humidity = 'N/A',
      weather_conditions = 'N/A',
      wind_speed = 'N/A',
      wind_direction = 'N/A',
      pressure = 'N/A',
      visibility = 'N/A',
    } = {},
    timestamp = 'N/A',
  } = weatherData || {}; // Use empty object if weatherData is undefined

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weather Information</Text>
      
     <Lottie 
          source={require('./Aminations/sun.json')} // Change to your animation path
          autoPlay
          loop
          style={{ width: '30%', height: '30%', alignSelf:'center',position:'absolute'}} 
        />
    

      <Card style={styles.card}>
        <Text style={styles.location}>
          {location.city}, {location.country}
        </Text>
        <Text style={styles.timestamp}>Updated at: {timestamp !== 'N/A' ? new Date(timestamp).toLocaleString() : 'N/A'}</Text>
        
        <View style={styles.weatherDetails}>
          <Text style={styles.detailText}>Temperature: {temperature} °F</Text>
          <Text style={styles.detailText}>Humidity: {humidity}%</Text>
          <Text style={styles.detailText}>Conditions: {weather_conditions}</Text>
          <Text style={styles.detailText}>Wind Speed: {wind_speed} mph</Text>
          <Text style={styles.detailText}>Wind Direction: {wind_direction}</Text>
          <Text style={styles.detailText}>Pressure: {pressure} hPa</Text>
          <Text style={styles.detailText}>Visibility: {visibility} miles</Text>
        </View>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  location: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  timestamp: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  weatherDetails: {
    marginTop: 8,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default WeatherDisplay;
