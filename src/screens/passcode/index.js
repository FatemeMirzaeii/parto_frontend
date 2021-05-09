import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  CommonActions,
  NavigationActions,
  StackActions,
} from '@react-navigation/native';
import {
  BackHandler,
  Button,
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  View,
  ImageBackground,
  AppState,
  Keyboard
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useSelector } from 'react-redux';
//assets
import MainBg from '../../../assets/images/main/home.png';
import PartnerBg from '../../../assets/images/partner/home.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';
import PregnancyModeBg from '../../../assets/images/main/pregnancyMode.png';
import styles from './styles';

const Passcode = ({ navigation, route }) => {
  const [input, setInput] = useState('');
  const passcode = useSelector((state) => state.user.passcode);
  const template = useSelector((state) => state.user.template);
  const cycle = useSelector((state) => state.cycle);
  const appState = useRef(AppState.currentState);
  console.log('route', route);
  //  const{screenName}=route.params;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const CELL_COUNT = 4;
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value,
    setValue,
  });

  useEffect(() => {
    setInput('');
    BackHandler.addEventListener('hardwareBackPress', _handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        _handleBackButtonClick,
      );
    };
  }, [_handleBackButtonClick]);

  useEffect(() => {
    const getpass = async () => {
      const credential = await Keychain.getGenericPassword();
      console.log('credential', credential);
      console.log('navigation', navigation);
      console.log('NavigationActions', CommonActions);
      console.log('appstate', appState);
      // const navigateAction = NavigationActions.navigate({
      //   routeName: 'Profile',

      //   params: { previous_screen: 'Passcode' }, // current screen

      //   action: NavigationActions.navigate({ routeName: 'Profile' }), // screen you want to navigate to
      // });

      const CanGoBack = CommonActions.goBack();
      //navigation.dispatch(CommonActions.goBack());

      console.log('CanGoBack', CanGoBack);
      if (input === credential.password) {
        // if (route.params && route.params.screenName) {
        //   console.log(
        //     'navigation.state.params.previous_screen',
        //     route.params.screenName,
        //   );
        //   // navigation.navigate(route.params.screenName);
        //   // const navigateAction = CommonActions.navigate({
        //   //   routeName: route.params.screenName,

        //   //   params: { previous_screen: 'Passcode' }, // current screen

        //   //   action: NavigationActions.navigate({
        //   //     routeName: route.params.screenName,
        //   //   }), // screen you want to navigate to
        //   // });
        //   // navigation.dispatch(navigateAction);
        //   // CommonActions.navigate(route.params.screenName);
        //   //navigation.dispatch(CommonActions.goBack());
        //   // navigation.dispatch(navigateAction)
        //   navigation.dispatch(StackActions.replace(route.params.screenName));
        // } else navigation.navigate('Tabs');
        navigation.navigate('Tabs');
        // setInput('');
      } else if (input.length === 4) {
        ToastAndroid.show(
          'کد ورود اشتباه است؛ لطفا دوباره تلاش کنید.',
          ToastAndroid.LONG,
        );
      }
    };
    getpass();
  }, [input, navigation, route.params]);

  const _handleBackButtonClick = useCallback(() => {
    BackHandler.exitApp();
    return true;
  }, []);

  console.log('passcode', passcode);

  return (
    <SafeAreaView>
      <ImageBackground
        source={
          template === 'Teenager'
            ? TeenagerBg
            : template === 'Partner'
            ? PartnerBg
            : cycle.isPregnant
            ? PregnancyModeBg
            : MainBg
        }
        style={styles.sky}
        blurRadius={2}>
        <View style={styles.field}>
          <Text style={styles.label}>Pass</Text>
          <TextInput
            style={styles.input}
            password={true}
            autoCapitalize="none"
            onChangeText={(txt) => setInput(txt)}
            //onChangeText={_handleBtnPress}
            // value={input}
            underlineColorAndroid="transparent"
          />
          {/* <CodeInput
      ref="codeInputRef1"
      secureTextEntry
      className={'border-b'}
      space={5}
      size={30}
      inputPosition='left'
      onFulfill={(code) => this._onFulfill(code)}
    /> */}
          {/* <CodeField
            ref={ref}
            {...props}
            value={value}
            autoFocus
            onChangeText={(text) => {
              setValue(text);
              if (value.length === 4) {
                Keyboard.dismiss();
              }
            }}
            cellCount={5}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          /> */}
        </View>
        <Button title="انصراف" onPress={() => BackHandler.exitApp()} />
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Passcode;
