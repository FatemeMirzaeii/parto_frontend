import 'react-native-gesture-handler';
import analytics from '@react-native-firebase/analytics';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef, useEffect, useCallback } from 'react';
import { StatusBar, AppState } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NetInfo from '@react-native-community/netinfo';
import { registerCustomIconType } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './navigation';

// store
import configureStore from './store';
import { fetchInitialCycleData } from './store/actions/cycle';
import { restoreToken } from './store/actions/auth';

// utils
import lock from './util/lock';
import { migration } from './util/database/migration';
import sync from './util/database/sync';
import { setupNotifications } from './util/notifications';
import PartoIcon from './util/customIcon';
import * as Keychain from 'react-native-keychain';

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
  const navigationRef = useRef();
  const routeNameRef = useRef();

  registerCustomIconType('parto', PartoIcon);

  useEffect(() => {
    launchApp();
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [_handleAppStateChange, launchApp]);

  const launchApp = useCallback(async () => {
    store.dispatch(restoreToken());
    await migration();
    NetInfo.addEventListener((state) => {
      const token = store.getState().auth.userToken;
      if (state.isConnected && token && token !== 'dummyToken') sync();
      else
        console.log(
          '%c No Internet Connection Or UserId Is Available To Sync With Server.',
          'background: yellow',
        );
    });
    store.dispatch(fetchInitialCycleData());
    SplashScreen.hide();
  }, [store]);

  const _handleAppStateChange = useCallback(
    async (nextAppState) => {
      launchApp();
      if (nextAppState === 'active') {
        console.log('navigationRef.current', navigationRef.current);
        if (
          navigationRef.current &&
          store.getState().user.lockType === 'Passcode'
        )
          navigationRef.current.navigate('Passcode',{screenName:navigationRef.current.getCurrentRoute().name});
        if (
          store.getState().user.lockType === 'Fingerprint' ||
          store.getState().user.lockType === 'Face' ||
          store.getState().user.lockType === 'Iris'
        )
          lock();
      }
      appState.current = nextAppState;
    },
    [store, launchApp],
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            setupNotifications(store.getState().user.id);
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute()
              .name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}>
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
