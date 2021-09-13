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
import Linking from './navigation/Linking';

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

  const launchApp = async () => {
    await migration();
    NetInfo.fetch().then(async (netState) => {
      const token = store.getState().auth.userToken;
      if (netState.isInternetReachable && token && token !== 'dummyToken') {
        await sync();
      } else {
        console.log(
          '%c No Internet Connection Or UserId Is Available To Sync With Server.',
          'background: yellow',
        );
      }
    });
    store.dispatch(fetchInitialCycleData());
    SplashScreen.hide();
  };

  const _handleAppStateChange = useCallback(
    async (nextAppState) => {
      const lockState = store.getState().user.lockType;
      launchApp();
      if (nextAppState === 'active') {
        if (navigationRef.current && lockState === 'Passcode')
          navigationRef.current.navigate('Passcode', {
            screenName: navigationRef.current.getCurrentRoute().name,
          });
        // if (lockState !== 'Passcode' || lockState !== 'None') lock();
        if (store.getState().user.lockType === 'Fingerprint') lock();
        if (store.getState().user.lockType === 'Iris') lock();
        if (store.getState().user.lockType === 'Face') lock();
      }
      appState.current = nextAppState;
    },
    [launchApp, store],
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          ref={navigationRef}
          linking={Linking}
          onReady={() => {
            store.dispatch(restoreToken());
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            const user = store.getState().user;
            setupNotifications(user.id, user.template === 'Partner');
            analytics().logEvent(`app_type_${user.template}`);
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name;

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
