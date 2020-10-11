import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation';
import { registerCustomIconType } from "react-native-elements";
import Icon from "./customIcon/bale/icon-font";
//  import EitaIcon from "./customIcon/eita/icon-font";

// import DataAnalysis from './../screens/DataAnalysisScreen/DataAnalysis';
// console.disableYellowBox = true;

const App: () => React$Node = () => {

  registerCustomIconType( 'Bale', Icon);
//  registerCustomIconType( 'Eita', EitaIcon);
  
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
