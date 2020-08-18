import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import AppNavigator from './navigation';
// import DataAnalysis from './../screens/DataAnalysisScreen/DataAnalysis';
// console.disableYellowBox = true;

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <AppNavigator />
      {/* <DataAnalysis /> */}
    </NavigationContainer>
  );
};

export default App;
