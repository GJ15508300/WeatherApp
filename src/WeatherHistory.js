import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const WeatherHistory = ({location, historical_weather, weatherHistoryData }) => {
  // console.log('page weatherHistoryData',weatherHistoryData)
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Historical Weather in {location?.city}, {location?.country}
      </Text>
      {historical_weather?.length === 0 ? (
        <Text style={styles.noDataText}>No historical weather data available.</Text>
      ) : (
        <FlatList
          data={historical_weather}
          keyExtractor={(item) => item.timestamp}
          renderItem={({ item }) => ( 
            <View style={styles.card}>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
              <Text style={styles.temp}>Temperature: {item.temperature}°F</Text>
              <Text style={styles.humidity}>Humidity: {item.humidity}%</Text>
              <Text style={styles.conditions}>Conditions: {item.weather_conditions}</Text>
              <Text style={styles.wind}>Wind: {item.wind_speed} mph {item.wind_direction}</Text>
              <Text style={styles.pressure}>Pressure: {item.pressure} hPa</Text>
              <Text style={styles.visibility}>Visibility: {item.visibility} miles</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#ff0000', // Red color for no data message
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    transition: 'all 0.3s ease', // For transition effect
  },
  timestamp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  temp: {
    fontSize: 16,
    color: '#ff6347', // Tomato color for temperature
  },
  humidity: {
    fontSize: 14,
    color: '#4682b4', // SteelBlue color for humidity
  },
  conditions: {
    fontSize: 14,
    color: '#ffa500', // Orange color for conditions
  },
  wind: {
    fontSize: 14,
    color: '#2e8b57', // SeaGreen color for wind
  },
  pressure: {
    fontSize: 14,
    color: '#4169e1', // RoyalBlue color for pressure
  },
  visibility: {
    fontSize: 14,
    color: '#8b008b', // DarkViolet color for visibility
  },
});

export default WeatherHistory;
