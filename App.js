import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/store';
import {ActivityIndicator, LogBox, Text, View} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import DashBoard from './src/DashBoard';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

// Suppress log warnings related to useNavigation
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate`']);

// Main App component
const App = () => {
  const [checkAuth, setCheckAuth] = useState(null);
  const [loadLang, setLoadLang] = useState(true);


// console.log('loadLang',loadLang)
  return (
    <>
    <Provider store={store}>
     <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            
            
              <DashBoard/>
           
            </SafeAreaProvider>
         </Provider>
    </>
  );
};

export default App;
