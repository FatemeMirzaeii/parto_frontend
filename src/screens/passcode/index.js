import React, { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
  KeyboardAvoidingView,
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
import { useSelector, useDispatch } from 'react-redux';

//components and utils
import { handlePasscode } from '../../store/actions/user';
import DialogBox from '../../components/DialogBox';
import useModal from '../../util/hooks/useModal';
import api from '../../services/api';

//assets and styles
import MainBg from '../../../assets/images/main/home.png';
import PregnancyModeBg from '../../../assets/images/main/pregnancyMode.png';
import PartnerBg from '../../../assets/images/partner/home.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';
import styles from './styles';
import { COLOR } from '../../styles/static';

const Passcode = ({ navigation, route }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tempCodeNeeded, setTempCodeNeeded] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  // const passcode = useSelector((state) => state.user.passcode);
  const template = useSelector((state) => state.user.template);
  const phoneNoState = useSelector((state) => state.user.phone);
  const cycle = useSelector((state) => state.cycle);
  const { isVisible: PhoneNoInputeVisible, toggle: togglePhoneNoInpute } =
    useModal();
  const { isVisible: forgatPasswordIsVisible, toggle: toggleForgotPassword } =
    useModal();
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setValue('');
    setPhoneNumber('');
    setTempCodeNeeded(false);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', _handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        _handleBackButtonClick,
      ); //todo: removeListener wont work
    };
  }, [_handleBackButtonClick]);

  useEffect(() => {
    const getPassword = async () => {
      const credential = await Keychain.getGenericPassword();
      if (value === credential.password) {
        setValue('');
        navigation.navigate('Tabs');
      } else if (value.length === 4) {
        ToastAndroid.show(
          'رمز عبور اشتباه است؛ لطفا دوباره تلاش کنید.',
          ToastAndroid.LONG,
        );
      }
    };

    if (!tempCodeNeeded) getPassword();
  }, [value, navigation, route.params, tempCodeNeeded]);

  useEffect(() => {
    const checkTempCode = async () => {
      if (value.length === 4) {
        const res = await api({
          method: 'POST',
          url: '/auth/checkVerificationCode/fa',
          dev: true,
          data: {
            phone: phoneNoState ? `98${phoneNoState}` : `98${phoneNumber}`,
            type: 'lock',
            code: value,
          },
        });
        console.log('res', res);
        _createNewPass();
        setValue('');
        navigation.navigate('Tabs');
      }
    };

    if (tempCodeNeeded) checkTempCode();
  }, [
    value,
    navigation,
    tempCodeNeeded,
    phoneNoState,
    phoneNumber,
    _createNewPass,
  ]);

  const _handleBackButtonClick = useCallback(() => {
    BackHandler.exitApp();
    return true;
  }, []);

  const _handleForgetPress = async () => {
    setIsLoading(true);
    if (phoneNoState) {
      toggleForgotPassword();
      await _getTempCode(phoneNoState);
    } else {
      togglePhoneNoInpute();
    }
    setIsLoading(false);
  };

  const _handlePhoneInput = (text) => {
    setPhoneNumber(text);
    if (phoneNumber.length === 9) {
      Keyboard.dismiss();
    }
  };

  const _getTempCode = async (phoneNo) => {
    setTempCodeNeeded(true);
    const res = await api({
      method: 'POST',
      url: '/auth/verificationCode',
      dev: true,
      data: {
        phone: `98${phoneNo}`,
        type: 'lock',
      },
    });
    console.log('res', res);
  };

  const _createNewPass = useCallback(async () => {
    await Keychain.resetGenericPassword();
    await Keychain.setGenericPassword('username', value);
    try {
      // Retrieve the credentials
      const credential = await Keychain.getGenericPassword();
      if (credential) {
        console.log('Credentials successfully loaded for user ');
        dispatch(handlePasscode(value));
        ToastAndroid.show(
          'رمز عبور با موفقیت تغییر کرد. لطفا در اولین فرصت رمز عبور خود را تغییر دهید.',
          ToastAndroid.LONG,
        );
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  }, [dispatch, value]);

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
          <Text style={styles.title}>رمز خود را وارد کنید:</Text>
          <View style={styles.codeInputeContainer}>
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
            <Icon
              containerStyle={{ alignSelf: 'center' }}
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
            loading={isLoading}
            loadingProps={{ color: COLOR.purple }}
          />
        </View>
      </ImageBackground>
      <DialogBox
        isVisible={PhoneNoInputeVisible}
        isLoading={isLoading}
        hide={togglePhoneNoInpute}
        icon={<Icon type="parto" name="lock" color="#aaa" size={50} />}
        text="رمز عبور موقت"
        firstBtnPress={async () => {
          setIsLoading(true);
          setValue('');
          togglePhoneNoInpute();
          await _getTempCode(phoneNumber);
          setIsLoading(false);
        }}
        firstBtnTitle="دریافت رمز">
        <KeyboardAvoidingView style={styles.phoneContainer}>
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
            بعد از وارد کردن شماره تماس، رمز عبور موقت برای شما ارسال خواهد شد.
          </Text>
        </KeyboardAvoidingView>
      </DialogBox>
      <DialogBox
        isVisible={forgatPasswordIsVisible}
        hide={toggleForgotPassword}
        icon={<Icon type="parto" name="lock" color="#aaa" size={50} />}
        text="رمز عبور موقت برای شماره شما ارسال شد. با استفاده از آن وارد شده و از صفحه تنظیمات قفل رمز عبور خود را تغییر دهید."
        firstBtnPress={toggleForgotPassword}
        firstBtnTitle="باشه"
      />
    </SafeAreaView>
  );
};
export default Passcode;
