import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef, useState, useEffect } from 'react';
import { StatusBar, AppState } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import AppNavigator from './navigation';
import { registerCustomIconType } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import EitaIcon from './util/customIcon/eita/icon-font';
import PartoIcon from './util/customIcon';
import configureStore from './store';
import { fetchInitialCycleData } from './store/actions/cycle';
import { restoreToken, signOut } from './store/actions/auth';
import lock from './util/lock';
import setupNotifications from './util/notifications';
import { migration } from './util/database/migration';
import sync from './util/database/sync';

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

  registerCustomIconType('Eita', EitaIcon);
  registerCustomIconType('parto', PartoIcon);
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    launchApp();
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [appStateVisible]);

  const launchApp = async () => {
    // store.dispatch(signOut());
    store.dispatch(restoreToken());
    setupNotifications();
    await migration();
    NetInfo.addEventListener(async (state) => {
      if (state.isConnected && store.getState().auth.userToken) await sync();
    });
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
