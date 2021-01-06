import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef, useState, useEffect } from 'react';
import { StatusBar, AppState } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { registerCustomIconType } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './navigation';
import BaleIcon from './customIcon/bale/icon-font';
import EitaIcon from './customIcon/eita/icon-font';
import configureStore from './store';
import { fetchInitialCycleData } from './store/actions/cycle';
import { restoreToken, signOut } from './store/actions/auth';
import lock from './util/lock';
import setupNotifications from './util/notifications';
import { migration } from './util/database/migration';

//splash comes in
//# restore tokens dispatch(restoreToken());
//## lock
//# setup notifications
//# migration
//# fetchinitialdata
//splash goes away

// console.disableYellowBox = true;

const App: () => React$Node = () => {
  const { store, persistor } = configureStore();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  registerCustomIconType('Bale', BaleIcon);
  registerCustomIconType('Eita', EitaIcon);
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    launchApp();
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const launchApp = async () => {
    // store.dispatch(signOut());
    store.dispatch(restoreToken());
    setupNotifications();
    await migration();
    //check internet connection
    //sync
    store.dispatch(fetchInitialCycleData());
    SplashScreen.hide();
  };

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
