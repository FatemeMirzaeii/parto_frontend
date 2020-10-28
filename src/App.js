import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef, useState, useEffect } from 'react';
import { StatusBar, AppState } from 'react-native';
import AppNavigator from './navigation';
import { registerCustomIconType } from 'react-native-elements';
import BaleIcon from './customIcon/bale/icon-font';
import EitaIcon from './customIcon/eita/icon-font';
import lock from './util/lock';
import setupNotifications from './util/notifications';

// console.disableYellowBox = true;

const App: () => React$Node = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  registerCustomIconType('Bale', BaleIcon);
  registerCustomIconType('Eita', EitaIcon);

  useEffect(() => {
    setupNotifications();
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      lock();
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
