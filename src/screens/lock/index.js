import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ToastAndroid } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import * as Keychain from 'react-native-keychain';
import { RadioButton } from 'react-native-paper';

//redux
import { useSelector, useDispatch } from 'react-redux';

//store
import { handleLockType } from '../../store/actions/user';

//components
import Card from '../../components/Card';

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

  useEffect(() => {
    Keychain.getSupportedBiometryType({}).then((bioType) => {
      setBiometryType(bioType);
    });
  }, []);

  const _renderBiometryText = () => {
    let txt = '';
    biometryType === 'Fingerprint'
      ? (txt = 'حس‌گر اثر انگشت')
      : biometryType === 'Face'
      ? (txt = 'پردازش چهره')
      : (txt = 'پردازش عنبیه چشم');
    return txt;
  };

  const _handelSelectedNone = async () => {
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
      : dispatch(handleLockType('Iris'));
    ToastAndroid.show(`${_renderBiometryText()} فعال شد.`, ToastAndroid.LONG);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card hasHeader headerTitle="نوع احراز هویت">
        <ListItem
          title="بدون احراز هویت"
          onPress={() => {
            _handelSelectedNone();
          }}
          leftIcon={
            <RadioButton
              value="None"
              status={lockType === 'None' ? 'checked' : 'unchecked'}
              onPress={() => {
                _handelSelectedNone();
              }}
              color={COLOR.pink}
              uncheckedColor={COLOR.icon}
            />
          }
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="کد ورود"
          onPress={() => {
            _handleSelectedPasscode();
          }}
          leftIcon={
            <RadioButton
              value="Passcode"
              status={lockType === 'Passcode' ? 'checked' : 'unchecked'}
              onPress={() => {
                _handleSelectedPasscode();
              }}
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
            onPress={() => {
              _handelSelectedBiometryType();
            }}
            leftIcon={
              <RadioButton
                value={biometryType}
                status={lockType === biometryType ? 'checked' : 'unchecked'}
                onPress={() => {
                  _handelSelectedBiometryType();
                }}
                color={COLOR.pink}
                uncheckedColor={COLOR.icon}
              />
            }
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
          />
        ) : null}
      </Card>
    </SafeAreaView>
  );
};
export default Lock;
