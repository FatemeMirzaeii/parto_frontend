import React, { useState, useContext, useEffect } from 'react';
import {
  ToastAndroid,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Icon, Input, Button } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Formik } from 'formik';
import * as yup from 'yup';
import Ptxt from '../../components/Ptxt';
import DataBase from '../../util/database';
import styles from './styles';
import { api } from '../../services/api';
import { storeData } from '../../util/func';
import { AuthContext } from '../../contexts';
import { COLOR, HEIGHT, WIDTH } from '../../styles/static';

const CELL_COUNT = 5;
const SignUp = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const { signUp } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serverCode, setServerCode] = useState(0);
  const [serverError, setServerError] = useState(null);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  // useEffect(() => {
  //   getVerificationCode();
  // }, []);
  const _handlePhoneInput = (text) => {
    setPhoneNumber(text);
    if (phoneNumber.length === 9) {
      setBtnActive(true);
      Keyboard.dismiss();
    }
  };
  const handleSubmit = () => {};
  const getVerificationCode = async () => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: `https://api.parto.app/auth/verifyCode`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone: phoneNumber,
      },
    })
      .then((res) => {
        console.log('res', res);
        setServerCode(res.data.code);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err, err.response);
        // alert('error: ' + err);
        if (err.toString() === 'Error: Network Error')
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        else
          switch (err.response.status) {
            case 400:
              ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
            case 418:
              ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
            case 502:
              ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
          }
      });
  };
  console.log('code', serverCode);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff', paddingTop: 24 }}>
      <View style={{ height: HEIGHT / 2.5 }}>
        <LottieView
          source={require('../../../assets/lotties/verification.json')}
          autoPlay
          // enableMergePathsAndroidForKitKatAndAbove
        />
      </View>
      <View style={styles.container}>
        <Ptxt style={styles.title}>برای ورود شماره موبایلت رو وارد کن:</Ptxt>
        <PhoneInput
          //ref={phoneInput}
          containerStyle={{
            width: WIDTH * 0.6,
            borderRadius: 10,
            alignSelf: 'center',
            margin: 20,
          }}
          textContainerStyle={{
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            marginLeft: -10,
          }}
          textInputStyle={styles.phoneInputTxt}
          codeTextStyle={styles.phoneInputTxt}
          placeholder="۹ - - - - - - - - -"
          defaultCode="IR"
          value={phoneNumber}
          onChangeText={_handlePhoneInput}
          
          // {(text) => {
          //   setPhoneNumber(text);
          //   phoneNumber.length === 9 ? setBtnActive(true) : null;
          // }}
          withShadow
          autoFocus
        />
        <Button
          title="ارسال پیامک"
          disabled={!btnActive}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.button}
          titleStyle={styles.btnTitle}
          onPress={getVerificationCode}
        />
      </View>
      {/* <Ptxt style={styles.title}>لطفا کد پیامک شده رو وارد کن:</Ptxt>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
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
      <Button
        title="تایید کد"
        // disabled={!lastPeriodDate}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.button}
        titleStyle={styles.btnTitle}
        // onPress={onNextPress}
      /> */}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
