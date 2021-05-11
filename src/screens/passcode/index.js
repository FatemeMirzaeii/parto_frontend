import { CommonActions } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AppState,
  BackHandler,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Button, Icon } from 'react-native-elements';
import * as Keychain from 'react-native-keychain';

//redux
import { useSelector } from 'react-redux';

//assets
import MainBg from '../../../assets/images/main/home.png';
import PregnancyModeBg from '../../../assets/images/main/pregnancyMode.png';
import PartnerBg from '../../../assets/images/partner/home.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';
import styles from './styles';

const Passcode = ({ navigation, route }) => {
  const passcode = useSelector((state) => state.user.passcode);
  const template = useSelector((state) => state.user.template);
  const cycle = useSelector((state) => state.cycle);
  const appState = useRef(AppState.currentState);
  console.log('route', route);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    setValue('');
  }, []);

  useEffect(() => {
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
      if (value === credential.password) {
        setValue('');
        // if (route.params && route.params.screenName) {
        //   console.log(
        //     'navigation.state.params.previous_screen',
        //     route.params.screenName,
        //   );
        //   navigation.navigate(route.params.screenName);
        // } else navigation.navigate('Tabs');
        navigation.navigate('Tabs');
      } else if (value.length === 4) {
        ToastAndroid.show(
          'کد ورود اشتباه است؛ لطفا دوباره تلاش کنید.',
          ToastAndroid.LONG,
        );
      }
    };
    getpass();
  }, [value, navigation, route.params]);

  const _handleBackButtonClick = useCallback(() => {
    BackHandler.exitApp();
    return true;
  }, []);

  console.log('passcode', passcode);

  return (
    <SafeAreaView style={styles.container}>
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
        blurRadius={3}>
        <View style={styles.field}>
          <Icon
            raised
            containerStyle={styles.icon}
            type="parto"
            name="lock"
            color="black"
            size={17}
          />
          <Text style={styles.title}>کد ورود را وارد کنید:</Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            autoFocus
            onChangeText={(text) => {
              setValue(text);
              if (value.length === 3) {
                Keyboard.dismiss();
              }
            }}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {(symbol ? '⚪' : null) || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Button
            title="انصراف"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.button}
            titleStyle={styles.btnTitle}
            onPress={() => BackHandler.exitApp()}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Passcode;
