import axios from 'axios';
import React, { useContext, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
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
import PhoneInput from 'react-native-phone-number-input';

//components
import Ptxt from '../../components/Ptxt';
import Loader from '../../components/Loader';

//util
import { storeData } from '../../util/func';
import styles from './styles';

//contexts
import { AuthContext } from '../../contexts';
import { devUrl } from '../../services/urls';

//styles
import { WIDTH } from '../../styles/static';

const SignUp = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [codeFieldActive, setCodeFieldActive] = useState(false);
  const { signUp } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const CELL_COUNT = 5;

  const _handlePhoneInput = (text) => {
    setPhoneNumber(text);
    if (phoneNumber.length === 9) {
      setBtnActive(true);
      Keyboard.dismiss();
    }
  };

  const handleSubmit = async () => {
    await axios({
      method: 'post',
      url: `${devUrl}/auth/checkVerificationCode/fa`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone: phoneNumber,
        code: value,
      },
    })
      .then((res) => {
        console.log('res', res);
        //setIsLoading(false);
        handleLogin();
      })
      .catch((err) => {
        console.error(err, err.response);
        alert('error: ' + err);
        if (err.toString() === 'Error: Network Error')
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        else ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
      });
  };

  const getVerificationCode = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: `${devUrl}/auth/verificationCode`,
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
        setIsLoading(false);
        setCodeFieldActive(true);
      })
      .catch((err) => {
        console.error(err, err.response);
        setIsLoading(false);
        if (err.toString() === 'Error: Network Error')
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        else ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
      });
  };

  const handleLogin = () => {
    //setIsLoading(true);
    axios({
      method: 'POST',
      url: `${devUrl}/auth/logIn/fa`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone: phoneNumber,
      },
    })
      .then((res) => {
        console.log('handleLoginRes====== ', res);
        console.log(
          'res.headers.x-auth-token***** ',
          res.headers['x-auth-token'],
        );
        storeData('@token', res.headers['x-auth-token']);
        signUp();
      })
      .catch((err) => {
        console.error(err, err.response);
        if (err.toString() === 'Error: Network Error')
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        else ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.main}>
      <Icon
        name="close"
        color="#f50"
        containerStyle={styles.close}
        size={30}
        onPress={() => {
          navigation.pop();
        }}
      />
      <View style={styles.container}>
        <Ptxt style={styles.title}>لطفا شماره موبایلت رو وارد کن:</Ptxt>
        <PhoneInput
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
          CountryCode={(ele) => {
            setCountryCode(ele);
          }}
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
      {isLoading ? <Loader /> : null}
      {codeFieldActive ? (
        <>
          <Ptxt style={styles.title}>حالا نوبت کد پیامک شده است:</Ptxt>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={(text) => setValue(text)}
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
            containerStyle={styles.btnContainer}
            buttonStyle={styles.button}
            titleStyle={styles.btnTitle}
            onPress={handleSubmit}
          />
        </>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
