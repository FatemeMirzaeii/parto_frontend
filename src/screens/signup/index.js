import React, { useState } from 'react';
import axios from 'axios';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  ImageBackground,
  ToastAndroid,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Button } from 'react-native-elements';
import PhoneInput from 'react-native-phone-number-input';
import CountDown from 'react-native-countdown-component';

//redux
import { useDispatch, useSelector } from 'react-redux';

//store
import { fetchInitialCycleData } from '../../store/actions/cycle';

//components
import Ptxt from '../../components/Ptxt';
import Loader from '../../components/Loader';
import DialogBox from '../../components/DialogBox';

//store
import { handleTemplate, setUser } from '../../store/actions/user';
import { interview, signUp } from '../../store/actions/auth';

//util
import DataBase from '../../util/database';
import { storeData } from '../../util/func';
import sync from '../../util/database/sync';
import useModal from '../../util/hooks/useModal';

//services
import { baseUrl } from '../../services/urls';
import api from '../../services/api';

//assets
import bgImage from '../../../assets/images/00.png';

//styles
import styles from './styles';
import { COLOR } from '../../styles/static';

const SignUp = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [codeFieldActive, setCodeFieldActive] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [timerId, setTimerId] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [value, setValue] = useState('');
  const { isVisible, toggle } = useModal();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();
  const db = new DataBase();
  const CELL_COUNT = 5;

  const _handlePhoneInput = (text) => {
    setPhoneNumber(text);
    if (phoneNumber.length === 9) {
      setBtnActive(true);
      Keyboard.dismiss();
    }
  };

  // const _handleSubmit = async () => {
  //   const res = await api({
  //     method: 'POST',
  //     url: '/auth/checkVerificationCode/fa',
  //    // dev: true,
  //     data: { phone: '98' + phoneNumber, code: value },
  //   });
  //   console.log('res', res);
  //   _handleLogin();
  // };

  // const _getVerificationCode = async () => {
  //   setIsLoading(true);
  //   const res = await api({
  //     method: 'POST',
  //     url: '/auth/verificationCode',
  //    // dev: true,
  //     data: { phone: '98' + phoneNumber },
  //   });
  //   console.log('res', res);
  //   setIsLoading(false);
  //   setCodeFieldActive(true);
  // };

  // const setVersionType = async (userId, type) => {
  //   await api({
  //     method: 'POST',
  //     url: `/user/versionType/${userId}/fa`,
  //   // dev: true,
  //     data: { type },
  //   });
  // };

  // const _handleLogin = async () => {
  //   //setIsLoading(true);
  //   console.log('here here here here here here');
  //   const res = await api({
  //     method: 'POST',
  //     url: '/auth/logIn/fa',
  //     dev: true,
  //     data: { phone: '98' + phoneNumber },
  //   });
  //   console.log('here here here here here here 2 2 2 2 2 2');
  //   const id = res.data.data.id;
  //   const type = res.data.data.type;
  //   storeData('@token', res.headers['x-auth-token']);
  //   db.exec(
  //     `INSERT INTO user (id) VALUES (${id}) ON CONFLICT DO NOTHING`,
  //     'user',
  //   );
  //   if (type || template) {
  //     if (!template) dispatch(handleTemplate(type));
  //     else if (!type) setVersionType(id, template);
  //     // todo: if this api returns error?
  //     else if (template !== type) return toggle();
  //     // this else if will happen if user is using the app offline and wants to signup,
  //     // but will signup with a number that has been registered already and they dont match.
  //     // todo: should ask for changing app template or not?
  //     setIsLoading(true);
  //     dispatch(interview());
  //     await sync();
  //     dispatch(fetchInitialCycleData());
  //   }
  //   dispatch(setUser(id, phoneNumber));
  //   dispatch(signUp());}

  const _handleSubmit = async () => {
    await axios({
      method: 'post',
      url: `${baseUrl}/auth/checkVerificationCode/fa`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone: '98' + phoneNumber,
        code: value,
      },
    })
      .then((res) => {
        console.log('res', res);
        _handleLogin();
      })
      .catch((err) => {
        console.error(err, err.response);
        if (
          err.response.status === 500 ||
          err.response.status === 502 ||
          !err.response.data.message
        )
          return;
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
        }
      });
  };

  const _getVerificationCode = () => {
    // setIsLoading(true);
    axios({
      method: 'post',
      url: `${baseUrl}/auth/verificationCode`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone: '98' + phoneNumber,
      },
    })
      .then((res) => {
        console.log('res', res);
        setIsLoading(false);
        setCodeFieldActive(true);
      })
      .catch((err) => {
        console.error(err, err.response);
        setIsLoading(false);
        if (
          err.response.status === 500 ||
          err.response.status === 502 ||
          !err.response.data.message
        )
          return;
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
        }
      });
  };

  const setVersionType = async (userId, type) => {
    const res = await api({
      method: 'POST',
      url: `/user/versionType/${userId}/fa`,
      // dev: true,
      data: { type },
    });
    if (res) return true;
  };
  const _handleLogin = () => {
    //setIsLoading(true);
    axios({
      method: 'POST',
      url: `${baseUrl}/auth/logIn/fa`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone: '98' + phoneNumber,
      },
    })
      .then(async (res) => {
        const id = res.data.data.id;
        const type = res.data.data.type;
        storeData('@token', res.headers['x-auth-token']);
        db.exec(
          `INSERT INTO user (id) VALUES (${id}) ON CONFLICT DO NOTHING`,
          'user',
        );
        if (type || template) {
          let versionTypeRes;
          if (!template) dispatch(handleTemplate(type));
          else if (!type) versionTypeRes = setVersionType(id, template);
          else if (template !== type) return toggle();
          // this else if will happen if user is using the app offline and wants to signup,
          // but will signup with a number that has been registered already and they dont match.
          // todo: should ask for changing app template or not?
          if (!type && !versionTypeRes) return;
          setIsLoading(true);
          dispatch(interview());
          await sync();
          dispatch(fetchInitialCycleData());
        }
        dispatch(setUser(id, phoneNumber));
        dispatch(signUp());
      })
      .catch((err) => {
        console.error(err, err.response);
        if (
          err.response.status === 500 ||
          err.response.status === 502 ||
          !err.response.data.message
        )
          return;
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
        }
      });
  };
  const getVerificationCodeAgain = () => {
    setDisabled(true);
    setTimerId(timerId + 1);
    _getVerificationCode();
  };
  return (
    <ImageBackground source={bgImage} style={styles.bg}>
      <SafeAreaView style={styles.main}>
        {isLoading ? (
          <Loader />
        ) : !codeFieldActive ? (
          <KeyboardAvoidingView style={styles.container}>
            <Ptxt style={styles.title}>شماره تماس خود را وارد کنید</Ptxt>
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
              بعد از وارد کردن شماره تماس، کد تایید برای شما ارسال خواهد شد.
            </Text>
            <Button
              title="ادامه"
              disabled={!btnActive}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.button}
              titleStyle={styles.btnTitle}
              onPress={_getVerificationCode}
              // onPress={() => {
              //   setIsLoading(false);
              //   setCodeFieldActive(true);
              // }}
            />
          </KeyboardAvoidingView>
        ) : (
          <>
            <Ptxt style={styles.title}>کد تایید را وارد کنید</Ptxt>
            <CodeField
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
            />
            <View style={styles.countdown}>
              <Button
                title="ارسال مجدد"
                type="clear"
                titleStyle={[styles.btnTitle, { color: COLOR.purple }]}
                onPress={getVerificationCodeAgain}
                disabled={disabled}
              />
              <CountDown
                id={timerId.toString()}
                until={60 * 2}
                size={15}
                onFinish={() => setDisabled(false)}
                digitStyle={{ backgroundColor: '#FFF' }}
                digitTxtStyle={styles.countdownText}
                separatorStyle={{ color: '#969696' }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: null, s: null }}
                showSeparator
              />
            </View>
            <Button
              title="تایید کد"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.button}
              titleStyle={styles.btnTitle}
              onPress={_handleSubmit}
              // onPress={_handleLogin}
            />
          </>
        )}
        <DialogBox
          isVisible={isVisible}
          hide={toggle}
          text="پرتویی عزیز! پیش از این، با این شماره در نسخه‌ی دیگری از پرتو ثبت‌نام کرده‌ای."
          firstBtnPress={toggle}
          firstBtnTitle="متوجه شدم"
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUp;
