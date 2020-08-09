import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import AppNavigator from './Navigator';
// import DataAnalysis from './../screens/DataAnalysisScreen/DataAnalysis';
console.disableYellowBox = true;

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
      {/* <DataAnalysis /> */}
    </NavigationContainer>
  );
};

export default App;
