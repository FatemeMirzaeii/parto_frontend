import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import { StatusBar, AppState } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import AppNavigator from './navigation';
import { registerCustomIconType } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import PartoIcon from './util/customIcon';
import configureStore from './store';
import { fetchInitialCycleData } from './store/actions/cycle';
import { restoreToken } from './store/actions/auth';
import lock from './util/lock';
import setupNotifications from './util/notifications';
import { migration } from './util/database/migration';
import sync from './util/database/sync';

//splash comes in
//# restore tokens
//## lock
//# setup notifications
//# migration
//# check for internet connection
//# sync
//# fetchinitialdata
//splash goes away

// console.disableYellowBox = true;

const App: () => React$Node = () => {
  const { store, persistor } = configureStore();
  const appState = useRef(AppState.currentState);
  registerCustomIconType('parto', PartoIcon);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const launchApp = async () => {
    store.dispatch(restoreToken());
    setupNotifications();
    await migration();
    NetInfo.addEventListener((state) => {
      const token = store.getState().auth.userToken;
      if (state.isConnected && token && token !== 'dummyToken') sync();
      else
        console.log('No Internet Connection Is Available To Sync With Server.');
    });
    store.dispatch(fetchInitialCycleData());
    SplashScreen.hide();
  };

  const _handleAppStateChange = (nextAppState) => {
    launchApp();
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      lock();
    }
    appState.current = nextAppState;
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
