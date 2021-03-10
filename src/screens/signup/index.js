import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  ImageBackground,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Button } from 'react-native-elements';
import PhoneInput from 'react-native-phone-number-input';

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
import api from '../../services/api';

//assets
import bgImage from '../../../assets/images/00.png';

//styles
import styles from './styles';

const SignUp = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [codeFieldActive, setCodeFieldActive] = useState(false);
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

  const _handleSubmit = async () => {
    const res = await api({
      method: 'POST',
      url: '/auth/checkVerificationCode/fa',
      // dev: true,
      data: { phone: '98' + phoneNumber, code: value },
    });
    console.log('res', res);
    _handleLogin();
  };

  const _getVerificationCode = async () => {
    setIsLoading(true);
    const res = await api({
      method: 'POST',
      url: '/auth/verificationCode',
      // dev: true,
      data: { phone: '98' + phoneNumber },
    });
    console.log('res', res);
    setIsLoading(false);
    setCodeFieldActive(true);
  };

  const setVersionType = async (userId, type) => {
    await api({
      method: 'POST',
      url: `/user/versionType/${userId}/fa`,
      // dev: true,
      data: { type },
    });
  };

  const _handleLogin = async () => {
    setIsLoading(true);
    const res = await api({
      method: 'POST',
      url: '/auth/logIn/fa',
      // dev: true,
      data: { phone: '98' + phoneNumber },
    });
    const id = res.data.data.id;
    const type = res.data.data.type;
    storeData('@token', res.headers['x-auth-token']);
    db.exec(
      `INSERT INTO user (id) VALUES (${id}) ON CONFLICT DO NOTHING`,
      'user',
    );
    if (type || template) {
      if (!template) dispatch(handleTemplate(type));
      else if (!type) setVersionType(id, template);
      // todo: if this api returns error?
      else if (template !== type) return toggle();
      // this else if will happen if user is using the app offline and wants to signup,
      // but will signup with a number that has been registered already and they dont match.
      // todo: should ask for changing app template or not?
      setIsLoading(true);
      dispatch(interview());
      await sync();
      dispatch(fetchInitialCycleData());
    }
    dispatch(setUser(id, phoneNumber));
    dispatch(signUp());
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
            <Button
              title="تایید کد"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.button}
              titleStyle={styles.btnTitle}
              onPress={_handleSubmit}
              //onPress={_handleLogin}
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
