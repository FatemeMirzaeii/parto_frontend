import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, Text, ToastAndroid, View, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import * as Keychain from 'react-native-keychain';
import { useSelector, useDispatch } from 'react-redux';

//components
import Card from '../../components/Card';
import BackButton from '../../components/BackButton';
import { handleLockType, handlePasscode } from '../../store/actions/user';

//styles
import styles from './styles';

const PasscodeSetting = ({ navigation }) => {
  const lockType = useSelector((state) => state.user.lockType);
  const passcode = useSelector((state) => state.user.passcode);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'رمز عبور',
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation]);

  // useEffect(() => {
  //   // if (lockType === 'Passcode') return;
  //   console.log('passcode*********', passcode);
  //   if (lockType === 'Fingerprint') lock(false);
  // }, [lockType, passcode]);

  const _handleSelectedPass = async () => {
    setIsLoading(true);
    if (value.length === 4) {
      await Keychain.resetGenericPassword();
      await Keychain.setGenericPassword('username', value);
      try {
        // Retrieve the credentials
        const credential = await Keychain.getGenericPassword();
        if (credential) {
          console.log('Credentials successfully loaded for user ');
          dispatch(handlePasscode(credential.password));
          ToastAndroid.show(
            lockType === 'Passcode'
              ? 'رمز عبور با موفقیت تغییر کرد.'
              : 'رمز عبور با موفقیت ذخیره شد.',

            ToastAndroid.LONG,
          );
          dispatch(handleLockType('Passcode'));
          navigation.pop();
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    } else
      ToastAndroid.show(
        'رمز عبور انتخابی کمتر از چهار رقم می‌باشد.',
        ToastAndroid.LONG,
      );
    setIsLoading(false);
  };

  const _handleBtnPress = () => {
    if (lockType === 'Passcode') {
      if (passcode === value) {
        setValue('');
        setIsVisible(true);
      } else
        ToastAndroid.show(
          'رمز عبور اشتباه است، برای تغییر رمز عبور ابتدا باید رمز عبور خود را به درستی وارد کنید.',
          ToastAndroid.LONG,
        );
    } else _handleSelectedPass();
  };
  return (
    <SafeAreaView style={styles.container}>
      {!isVisible && (
        <Card
          hasHeader
          headerTitle={
            lockType === 'Passcode' ? 'تغییر رمز عبور' : 'انتخاب رمز عبور'
          }>
          <View style={styles.field}>
            <Text style={styles.title}>
              {lockType === 'Passcode'
                ? 'رمز عبور فعلی خود را وارد کنید:'
                : 'رمز عبور چهاررقمی برای ورود به پرتو:'}
            </Text>
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
              title={lockType === 'Passcode' ? 'ادامه' : 'ذخیره'}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.button}
              titleStyle={styles.btnTitle}
              onPress={_handleBtnPress}
            />
          </View>
        </Card>
      )}
      {isVisible && (
        <Card hasHeader headerTitle="رمز عبور جدید">
          <View style={styles.field}>
            <Text style={styles.title}>
              رمز عبور چهاررقمی برای ورود به پرتو:
            </Text>
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
              title="ذخیره"
              loading={isLoading}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.button}
              titleStyle={styles.btnTitle}
              onPress={_handleSelectedPass}
            />
          </View>
        </Card>
      )}
    </SafeAreaView>
  );
};
export default PasscodeSetting;
