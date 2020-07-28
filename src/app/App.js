import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Navigator';
import StartQuestion3 from './../screens/StartScreen/StartQuestion3';
const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
      {/* <StartQuestion3 /> */}
    </NavigationContainer>
  );
};

export default App;
