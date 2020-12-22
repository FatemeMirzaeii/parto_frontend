import axios from 'axios';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
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

//store
import { setUser } from '../../store/actions/user';
import { signUp } from '../../store/actions/auth';

//util
import DataBase from '../../util/database';
import { storeData } from '../../util/func';

//services
import { devUrl } from '../../services/urls';

//styles
import styles from './styles';

const SignUp = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [codeFieldActive, setCodeFieldActive] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
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

  const _handleSubmit = async () => {
    await axios({
      method: 'post',
      url: `${devUrl}/auth/checkVerificationCode/fa`,
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
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
        }
      });
  };

  const _getVerificationCode = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: `${devUrl}/auth/verificationCode`,
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
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
        }
      });
  };

  const _handleLogin = () => {
    //setIsLoading(true);
    axios({
      method: 'POST',
      url: `${devUrl}/auth/logIn/fa`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        phone: '98' + phoneNumber,
      },
    })
      .then((res) => {
        console.log('handleLoginRes====== ', res);
        console.log(
          'res.headers.x-auth-token***** ',
          res.headers['x-auth-token'],
        );
        const id = res.data.data.id;
        console.log('res.data', res.data);
        console.log('id', id);
        storeData('@token', res.headers['x-auth-token']);
        //to maryam:
        //1. If the user signs out and then sign in again, what would happen?
        //I think we need ON CONFLICT phrase here.(I get in trouble with that, so I changed it.)
        //2. now that we are inserting a row for user it is better to save all data, such as phone number.
        //3. isn't it better to move queries in query.js file?
        //4. it is better to use table names as variables.
        //so if someday we decide to rename them we will change them just in one place.
        db.exec(
          `INSERT INTO user (id) VALUES (${id}) ON CONFLICT DO NOTHING`,
          'user',
        );
        dispatch(setUser(id));
        console.log('res.data++++++++++++', res.data);
        dispatch(signUp());
      })
      .catch((err) => {
        console.error(err, err.response);
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        } else {
          ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.main}>
      {/* <Icon
        name="close"
        color="#f50"
        containerStyle={styles.close}
        size={30}
        onPress={() => {
          navigation.pop();
        }}
      /> */}
      <View style={styles.container}>
        <Ptxt style={styles.title}>لطفا شماره موبایلت رو وارد کن:</Ptxt>
        {/* to maryam: it is better to set character limit for phone number input. */}
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
        />
        <Button
          title="ارسال پیامک"
          disabled={!btnActive}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.button}
          titleStyle={styles.btnTitle}
          // onPress={_getVerificationCode}
          onPress={() => {
            setIsLoading(false);
            setCodeFieldActive(true);
          }}
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
            //onPress={_handleSubmit}
            onPress={_handleLogin}
          />
        </>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
