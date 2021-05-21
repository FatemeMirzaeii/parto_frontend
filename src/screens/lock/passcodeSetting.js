import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, Text, ToastAndroid, View, Keyboard } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import * as Keychain from 'react-native-keychain';

//redux
import { useSelector, useDispatch } from 'react-redux';

//store
import { handleLockType } from '../../store/actions/user';

//components
import Card from '../../components/Card';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const PasscodeSetting = ({ navigation }) => {
  const lockType = useSelector((state) => state.user.lockType);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'کد ورود',
      headerStyle: {
        elevation: 0,
      },
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.pink}
          onPress={() => navigation.pop()}
          containerStyle={styles.headerIcon}
        />
      ),
    });
  }, [navigation]);

  const _handleSelectedPass = async () => {
    if (value.length === 4) {
      await Keychain.resetGenericPassword();
      await Keychain.setGenericPassword('username', value);
      try {
        // Retrieve the credentials
        const credential = await Keychain.getGenericPassword();
        if (credential) {
          console.log('Credentials successfully loaded for user ');
          ToastAndroid.show(
            lockType === 'Passcode'
              ? 'کد ورود با موفقیت تغییر کرد.'
              : 'کد ورود با موفقیت ذخیره شد.',

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
        'کد ورود انتخابی چهارررقمی نیست؛ تعدادارقام باید چهاررقمی باشد.',
        ToastAndroid.LONG,
      );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card
        hasHeader
        headerTitle={
          lockType === 'Passcode' ? 'تغییر کد ورود' : 'انتخاب کد ورود'
        }>
        <View style={styles.field}>
          <Text style={styles.title}>کد ورود چهاررقمی برای ورود به پرتو:</Text>
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
            containerStyle={styles.btnContainer}
            buttonStyle={styles.button}
            titleStyle={styles.btnTitle}
            onPress={_handleSelectedPass}
          />
        </View>
      </Card>
    </SafeAreaView>
  );
};
export default PasscodeSetting;
