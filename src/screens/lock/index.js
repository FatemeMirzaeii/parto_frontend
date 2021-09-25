import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ToastAndroid } from 'react-native';
import { ListItem } from 'react-native-elements';
import * as Keychain from 'react-native-keychain';
import { RadioButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

//components and store
import Card from '../../components/Card';
import { handleLockType } from '../../store/actions/user';
import BackButton from '../../components/BackButton';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const Lock = ({ navigation }) => {
  const [biometryType, setBiometryType] = useState(null);
  const lockType = useSelector((state) => state.user.lockType);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'قفل',
      headerLeft: () => null,
      headerRight: () => <BackButton navigation={navigation} />,
    });
  }, [navigation]);

  useEffect(() => {
    Keychain.getSupportedBiometryType({}).then((bioType) => {
      setBiometryType(bioType);
      if (!bioType && lockType === 'Fingerprint')
        //if user turns off device fingerprint without turning it of in parto, we will do it for her.
        dispatch(handleLockType('None'));
    });
  }, []);

  const _renderBiometryText = () => {
    let txt = '';
    switch (biometryType) {
      case 'Fingerprint':
        txt = 'حس‌گر اثر انگشت';
        break;
      case 'Face':
        txt = 'پردازش چهره';
        break;
      case 'Iris':
        txt = 'پردازش عنبیه چشم';
        break;
      default:
        break;
    }
    return txt;
  };

  const _handleSelectedNone = async () => {
    try {
      await Keychain.resetGenericPassword();
      console.log('Could reset credentials');
      dispatch(handleLockType('None'));
      ToastAndroid.show('قفل غیرفعال شد.', ToastAndroid.LONG);
    } catch (err) {
      console.log('Could not reset credentials, ', +err);
    }
  };

  const _handleSelectedPasscode = () => {
    navigation.navigate('PasscodeSetting');
  };

  const _handelSelectedBiometryType = async () => {
    await Keychain.resetGenericPassword();
    biometryType === 'Fingerprint'
      ? dispatch(handleLockType('Fingerprint'))
      : biometryType === 'Face'
      ? dispatch(handleLockType('Face'))
      : dispatch(handleLockType('Iris')); //todo: it is better to change this to a switch case statement
    ToastAndroid.show(`${_renderBiometryText()} فعال شد.`, ToastAndroid.LONG);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card hasHeader headerTitle="نوع احراز هویت">
        <ListItem
          title="غیرفعال"
          onPress={_handleSelectedNone}
          leftIcon={
            <RadioButton
              value="None"
              status={
                !lockType || lockType === 'None' ? 'checked' : 'unchecked'
              }
              onPress={_handleSelectedNone}
              color={COLOR.pink}
              uncheckedColor={COLOR.icon}
            />
          }
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="رمز عبور"
          onPress={_handleSelectedPasscode}
          leftIcon={
            <RadioButton
              value="Passcode"
              status={lockType === 'Passcode' ? 'checked' : 'unchecked'}
              onPress={_handleSelectedPasscode}
              color={COLOR.pink}
              uncheckedColor={COLOR.icon}
            />
          }
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />

        {biometryType ? (
          <ListItem
            title={_renderBiometryText()}
            onPress={_handelSelectedBiometryType}
            leftIcon={
              <RadioButton
                value={biometryType}
                status={lockType === biometryType ? 'checked' : 'unchecked'}
                onPress={_handelSelectedBiometryType}
                color={COLOR.pink}
                uncheckedColor={COLOR.icon}
              />
            }
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
          />
        ) : (
          <ListItem
            title={
              'در صورت فعال بودن حس‌گر اثر انگشت گوشی خود، می‌توانید از این قابلیت در پرتو نیز استفاده کنید.'
            }
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
          />
        )}
      </Card>
    </SafeAreaView>
  );
};
export default Lock;
