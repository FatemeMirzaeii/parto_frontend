import { CommonActions } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  AppState,
  BackHandler,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Button, Icon } from 'react-native-elements';
import * as Keychain from 'react-native-keychain';
import PhoneInput from 'react-native-phone-number-input';

//redux
import { useSelector } from 'react-redux';

//components
import DialogBox from '../../components/DialogBox';

//assets
import MainBg from '../../../assets/images/main/home.png';
import PregnancyModeBg from '../../../assets/images/main/pregnancyMode.png';
import PartnerBg from '../../../assets/images/partner/home.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';

//util
import useModal from '../../util/hooks/useModal';

//services
import { baseUrl } from '../../services/urls';
import api from '../../services/api';

//styles
import styles from './styles';
import { FONT } from '../../styles/static';

const Passcode = ({ navigation, route }) => {
  const [value, setValue] = useState('');
  const [tempCodeNedded, setTempCodeNedded] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const passcode = useSelector((state) => state.user.passcode);
  const template = useSelector((state) => state.user.template);
  const phoneState = useSelector((state) => state.user.phone);
  const cycle = useSelector((state) => state.cycle);
  const { isVisible, toggle } = useModal();
  const appState = useRef(AppState.currentState);
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    setValue('');
    setPhoneNumber('');
    setTempCodeNedded(false);
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

    if (!tempCodeNedded) getpass();
  }, [value, navigation, route.params, tempCodeNedded]);

  useEffect(() => {
    const checkTempCode = async () => {
      if (value.length === 4) {
        await axios({
          method: 'post',
          url: `https://dev.parto.app/auth/checkVerificationCode/fa`,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            phone: '98' + '9124720868',
            type: 'lock',
            code: value,
          },
        })
          .then(async (res) => {
            console.log('res', res);
            setValue('');
            navigation.navigate('Tabs');
          })
          .catch((err) => {
            if (err.toString() === 'Error: Network Error') {
              ToastAndroid.show(
                'لطفا اتصال اینترنت رو چک کن.',
                ToastAndroid.LONG,
              );
            } else if (
              err.response &&
              (err.response.status === 500 ||
                err.response.status === 502 ||
                (err.response.data && !err.response.data.message))
            )
              ToastAndroid.show(
                'متاسفانه مشکلی رخ داده است، لطفا بعدا امتحان کنید.',
                ToastAndroid.SHORT,
              );
            else
              ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
          });
      }
    };

    if (tempCodeNedded) checkTempCode();
  }, [value, navigation, tempCodeNedded]);

  const _handleBackButtonClick = useCallback(() => {
    BackHandler.exitApp();
    return true;
  }, []);

  const _handlePhoneInput = (text) => {
    setPhoneNumber(text);
    if (phoneNumber.length === 9) {
      Keyboard.dismiss();
    }
  };

  const _getTempCode = async (phone) => {
    setTempCodeNedded(true);
    axios({
      method: 'post',
      url: `https://dev.parto.app/auth/verificationCode`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone: `98${phone}`,
        type: 'lock',
      },
    })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        } else if (
          err.response &&
          (err.response.status === 500 ||
            err.response.status === 502 ||
            (err.response.data && !err.response.data.message))
        )
          ToastAndroid.show(
            'متاسفانه مشکلی رخ داده است، لطفا بعدا امتحان کنید.',
            ToastAndroid.SHORT,
          );
        else ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT);
      });
  };
  const _handleForgetPress = () => {
    if (phoneState) {
      _getTempCode(phoneState);
    } else {
      toggle();
    }
  };

  console.log('passcode', passcode);
  console.log('phone', phoneState);

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
            size={20}
          />
          <Text style={styles.title}>کد ورود را وارد کنید:</Text>
          <View
            style={{
              // flex: 1,
              // backgroundColor: 'red',
              marginleft: 100,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 250,
              marginBottom: '12%',
            }}>
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
              showSoftInputOnFocus={false}
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
            <Icon
              // raised
              containerStyle={{ alignSelf: 'center', marginTop: 10 }}
              type="ionicon"
              name="md-backspace-sharp"
              color="white"
              size={25}
              onPress={() => {
                if (value.length > 0) {
                  let y = value.slice(0, -1);
                  setValue(y);
                }
              }}
            />
          </View>
          <FlatList
            columnWrapperStyle={{
              flex: 1,
              justifyContent: 'space-evenly',
            }}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderColor: 'white',
                  borderWidth: 2,
                  margin: 20,
                }}
                onPress={() => {
                  let t = item.toString();
                  t = value.concat(t);
                  console.log('***', value);
                  setValue(t);
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: FONT.black,
                    color: 'white',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
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
          <Button
            title="فراموش کردم"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.buttonNext}
            titleStyle={styles.btnTitleNext}
            onPress={_handleForgetPress}
            // loading={isLoading}
          />
        </View>
      </ImageBackground>
      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        icon={<Icon type="parto" name="lock" color="#aaa" size={50} />}
        text="کد ورود موقت"
        firstBtnPress={() => {
          setValue('');
          toggle();
          _getTempCode(phoneNumber);
        }}
        firstBtnTitle="دریافت کد">
        <KeyboardAvoidingView style={styles.phoneContainer}>
          {/* todo: limit for phone number input. */}
          <PhoneInput
            containerStyle={styles.phoneInputwrapper}
            textContainerStyle={styles.phoneInputTxtwrapper}
            textInputStyle={styles.phoneInputTxt}
            codeTextStyle={styles.phoneInputTxt}
            placeholder="۹ - - - - - - - - -"
            defaultCode="IR"
            value={phoneNumber}
            onChangeText={_handlePhoneInput}
            withShadow
            autoFocus
            maxLength={9}
          />
          <Text style={styles.description}>
            بعد از وارد کردن شماره تماس، کد ورود موقت برای شما ارسال خواهد شد.
          </Text>
        </KeyboardAvoidingView>
      </DialogBox>
    </SafeAreaView>
  );
};
export default Passcode;
