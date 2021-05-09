// import React, {
//   useCallback,
//   useEffect,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from 'react';
// import { SafeAreaView, Text, TextInput, View } from 'react-native';
// import { Icon, ListItem } from 'react-native-elements';
// import * as Keychain from 'react-native-keychain';
// import { RadioButton } from 'react-native-paper';
// import { useSelector, useDispatch } from 'react-redux';

// //store
// import { handleLockType, handlePasscode } from '../../store/actions/user';

// //components
// import Card from '../../components/Card';
// import DialogBox from '../../components/DialogBox';

// // util
// import useModal from '../../util/hooks/useModal';

// //styles
// import { COLOR } from '../../styles/static';
// import styles from './styles';

// const Lock = ({ navigation }) => {
//   const [biometryType, setBiometryType] = useState(null);
//   const [password, setPassword] = useState('');
//   const { isVisible, toggle } = useModal();
//   const passwordTextRef = useRef();
//   const passcode = useSelector((state) => state.user.passcode);
//   const lockType = useSelector((state) => state.user.lockType);
//   const dispatch = useDispatch();

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: 'قفل نرم‌افزار',
//       headerStyle: {
//         elevation: 0,
//       },
//       headerLeft: () => null,
//       headerRight: () => (
//         <Icon
//           size={16}
//           name="right-arrow"
//           type="parto"
//           color={COLOR.pink}
//           onPress={() => navigation.pop()}
//           containerStyle={{ right: 40 }}
//         />
//       ),
//     });
//   }, [navigation]);

//   useEffect(() => {
//     Keychain.getSupportedBiometryType({}).then((bioType) => {
//       setBiometryType(bioType);
//     });
//   }, []);

//   // const _handelSelectedNone = async () => {dispatch(handleLockTypeAuth('None'));};
//   const _handleSelectedPass = useCallback(async () => {
//     dispatch(handleLockType('Passcode'));
//   }, [dispatch]);

//   // const _handleMainSelected = useCallback(async () => {
//   //   dispatch(handleTemplate('Main'));
//   //   navigation.navigate('Interview', { template: 'Main' });
//   // }, [dispatch, navigation]);

//   // const _handelSelectedBiometryType = async () => {dispatch(handleLockTypeAuth('None'))};
//   console.log('lockTypes', lockType);
//   return (
//     <SafeAreaView style={styles.container}>
//       <Card hasHeader headerTitle="نوع احراز هویت">
//         <ListItem
//           title="بدون احراز هویت"
//           onPress={() => {
//             // _handelSelectedNone();
//             dispatch(handleLockType('None'));
//           }}
//           leftIcon={
//             <RadioButton
//               value="None"
//               status={lockType === 'None' ? 'checked' : 'unchecked'}
//               onPress={() => {
//                 // _handelSelectedNone();
//                 dispatch(handleLockType('None'));
//               }}
//               color={COLOR.pink}
//               uncheckedColor={COLOR.icon}
//             />
//           }
//           titleStyle={styles.listItemText}
//           containerStyle={styles.listItem}
//           contentContainerStyle={styles.listItemContent}
//         />
//         <ListItem
//           title="رمز ورود"
//           onPress={() => {
//             // dispatch(handleLockTypeAuth('Passcode'));
//             _handleSelectedPass();
//             toggle();
//           }}
//           leftIcon={
//             <RadioButton
//               value="Passcode"
//               status={lockType === 'Passcode' ? 'checked' : 'unchecked'}
//               onPress={() => {
//                 // dispatch(handleLockType('Passcode'));
//                 _handleSelectedPass();
//                 toggle();
//               }}
//               color={COLOR.pink}
//               uncheckedColor={COLOR.icon}
//             />
//           }
//           titleStyle={styles.listItemText}
//           containerStyle={styles.listItem}
//           contentContainerStyle={styles.listItemContent}
//         />
//         {biometryType ? (
//           <ListItem
//             title={
//               biometryType === 'Fingerprint'
//                 ? 'حس‌گر اثر انگشت'
//                 : biometryType === 'Face'
//                 ? 'پردازش چهره'
//                 : 'پردازش عنبیه چشم'
//             }
//             onPress={() => {
//               biometryType === 'Fingerprint'
//                 ? dispatch(handleLockType('Fingerprint'))
//                 : biometryType === 'Face'
//                 ? dispatch(handleLockType('Face'))
//                 : dispatch(handleLockType('Iris'));
//               //_handelSelectedBiometryType();
//             }}
//             leftIcon={
//               biometryType === 'Fingerprint' ? (
//                 <>
//                   <RadioButton
//                     value="Fingerprint"
//                     status={
//                       lockType === 'Fingerprint' ? 'checked' : 'unchecked'
//                     }
//                     onPress={() => dispatch(handleLockType('Fingerprint'))}
//                     color={COLOR.pink}
//                     uncheckedColor={COLOR.icon}
//                   />
//                   {/* <Icon
//                 raised
//                 color={COLOR.purple}
//                   type="material"
//                   name={'fingerprint'}
//                   //color={isActive ? COLOR.btn : COLOR.textColorDark}
//                 /> */}
//                 </>
//               ) : biometryType === 'Face' ? (
//                 <>
//                   <RadioButton
//                     value="Face"
//                     status={lockType === 'Face' ? 'checked' : 'unchecked'}
//                     onPress={() =>
//                       //setLockType('Face')
//                       dispatch(handleLockType('Face'))
//                     }
//                     color={COLOR.pink}
//                     uncheckedColor={COLOR.icon}
//                   />
//                   {/* <Icon
//                   type="material"
//                   name={'face-recognition'}
//                   ///color={isActive ? COLOR.btn : COLOR.textColorDark}
//                 /> */}
//                 </>
//               ) : (
//                 <RadioButton
//                   value="Iris"
//                   status={lockType === 'Iris' ? 'checked' : 'unchecked'}
//                   onPress={() =>
//                     //setLockType('Iris')
//                     dispatch(handleLockType('Iris'))
//                   }
//                   color={COLOR.pink}
//                   uncheckedColor={COLOR.icon}
//                 />
//               )
//             }
//             titleStyle={styles.listItemText}
//             containerStyle={styles.listItem}
//             contentContainerStyle={styles.listItemContent}
//           />
//         ) : null}
//       </Card>
//       <DialogBox
//         isVisible={isVisible}
//         hide={toggle}
//         // icon={<Icon type="ionicon" name="key-outline" color="#aaa" size={50} />}
//         icon={<Icon type="ionicon" name="key-outline" color="#aaa" size={50} />}
//         text={passcode ? 'تغییر رمز ورود' : 'انتخاب رمز ورود'}
//         firstBtnTitle="ذخیره"
//         firstBtnPress={() => {
//           dispatch(handlePasscode(password));
//           toggle();
//           console.log('lockTypes', lockType);
//         }}>
//         <View style={styles.field}>
//           <Text style={styles.label}>Pass</Text>
//           <TextInput
//             style={styles.input}
//             password={true}
//             autoCapitalize="none"
//             ref={passwordTextRef}
//             onChangeText={(txt) => setPassword(txt)}
//             underlineColorAndroid="transparent"
//           />
//         </View>
//       </DialogBox>
//     </SafeAreaView>
//   );
// };
// export default Lock;

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  View,
  BackHandler,
} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import * as Keychain from 'react-native-keychain';
import { RadioButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

//store
import { handleLockType, handlePasscode } from '../../store/actions/user';

//components
import Card from '../../components/Card';
import DialogBox from '../../components/DialogBox';

// util
import useModal from '../../util/hooks/useModal';
import styles from './styles';

//styles
import { COLOR } from '../../styles/static';
import { lockStatus } from '../../util/database/query';

const Lock = ({ navigation }) => {
  const [biometryType, setBiometryType] = useState(null);
  const [password, setPassword] = useState('');
  const [credentials, setCredentials] = useState(false);
  const { isVisible, toggle } = useModal();
  const passwordTextRef = useRef();
  const userId = useSelector((state) => state.user.id);
  const lockType = useSelector((state) => state.user.lockType);
  const dispatch = useDispatch();
  let username = '';

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'قفل نرم‌افزار',
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
          containerStyle={{ right: 40 }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const determineLockStatus = async () => {
      // setCredentials(await Keychain.getGenericPassword());
      const status = await lockStatus();
    };
    determineLockStatus();
  }, []);

  useEffect(() => {
    Keychain.getSupportedBiometryType({}).then((bioType) => {
      setBiometryType(bioType);
    });
  }, []);

  const _handelSelectedNone = async () => {
    try {
      await Keychain.resetGenericPassword();
      setCredentials(await Keychain.getGenericPassword());
      console.log('888888888888', await Keychain.getGenericPassword());
      username = '';
      setPassword('');
      console.log('Could reset credentials');
    } catch (err) {
      console.log('Could not reset credentials, ', +err);
    }
  };

  const _handleSelectedPass = async () => {
    await Keychain.resetGenericPassword();
    username = userId.toString() ?? 'guestUser';
    setCredentials(await Keychain.getGenericPassword());
    console.log('save press');
    await Keychain.setGenericPassword(username, password);

    try {
      // Retrieve the credentials
      const credential = await Keychain.getGenericPassword();
      if (credential) {
        console.log('Credentials successfully loaded for user ');
        toggle();
        ToastAndroid.show(
          credentials ? 'رمز ورود با موفقیت تغییر کرد' : '.رمز ورود فعال شد.',
          ToastAndroid.LONG,
        );
        setCredentials(await Keychain.getGenericPassword());
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  const _handelSelectedBiometryType = async () => {
    await Keychain.resetGenericPassword();
    username = userId.toString() ?? 'guestUser';
    try {
      const options = {
        authenticationPrompt: {
          title: 'نیاز به احراز هویت',
          subtitle: 'Subtitle',
          description: 'Some descriptive text',
          cancel: 'انصراف',
        },
      };
      await Keychain.setGenericPassword(username, 'without password', {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
      });
      const credentials = await Keychain.getGenericPassword(options);
      console.log(
        ' Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET',
        Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
      );
      if (credentials) {
        // this.setState({ ...credentials, status: 'Credentials loaded!' });
        console.log('yesssssssssssssss', credentials);
      }
    } catch (err) {
      console.log('err, ', err.toString());
      console.log('Could not load credentials. ' + err);
      // if (err.code.toString() === '13') BackHandler.exitApp();
      if (
        err.toString() === 'Error: code: 13, msg: انصراف' ||
        'Error: code: 10, msg: Fingerprint operation canceled by user.'
      )
        BackHandler.exitApp();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card hasHeader headerTitle="نوع احراز هویت">
        <ListItem
          title="بدون احراز هویت"
          onPress={() => {
            dispatch(handleLockType('None'));
            _handelSelectedNone();
          }}
          leftIcon={
            <RadioButton
              value="None"
              status={lockType === 'None' ? 'checked' : 'unchecked'}
              onPress={() => {
                dispatch(handleLockType('None'));
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
          title="رمز ورود"
          onPress={() => {
            dispatch(handleLockType('Passcode'));
            toggle();
          }}
          leftIcon={
            <RadioButton
              value="Passcode"
              status={lockType === 'Passcode' ? 'checked' : 'unchecked'}
              onPress={() => {
                dispatch(handleLockType('Passcode'));
                toggle();
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
            title={
              biometryType === 'Fingerprint'
                ? 'حس‌گر اثر انگشت'
                : biometryType === 'Face'
                ? 'پردازش چهره'
                : 'پردازش عنبیه چشم'
            }
            onPress={() => {
              biometryType === 'Fingerprint'
                ? dispatch(handleLockType('Fingerprint'))
                : biometryType === 'Face'
                ? dispatch(handleLockType('Face'))
                : dispatch(handleLockType('Iris'));
              _handelSelectedBiometryType();
            }}
            leftIcon={
              biometryType === 'Fingerprint' ? (
                <>
                  <RadioButton
                    value="Fingerprint"
                    status={
                      lockType === 'Fingerprint' ? 'checked' : 'unchecked'
                    }
                    onPress={() => dispatch(handleLockType('Fingerprint'))}
                    color={COLOR.pink}
                    uncheckedColor={COLOR.icon}
                  />
                  {/* <Icon
                raised
                color={COLOR.purple}
                  type="material"
                  name={'fingerprint'}
                  //color={isActive ? COLOR.btn : COLOR.textColorDark}
                /> */}
                </>
              ) : biometryType === 'Face' ? (
                <>
                  <RadioButton
                    value="Face"
                    status={lockType === 'Face' ? 'checked' : 'unchecked'}
                    onPress={() => dispatch(handleLockType('Face'))}
                    color={COLOR.pink}
                    uncheckedColor={COLOR.icon}
                  />
                  {/* <Icon
                  type="material"
                  name={'face-recognition'}
                  ///color={isActive ? COLOR.btn : COLOR.textColorDark}
                /> */}
                </>
              ) : (
                <RadioButton
                  value="Iris"
                  status={lockType === 'Iris' ? 'checked' : 'unchecked'}
                  onPress={() => dispatch(handleLockType('Iris'))}
                  color={COLOR.pink}
                  uncheckedColor={COLOR.icon}
                />
              )
            }
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
          />
        ) : null}
      </Card>

      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        // icon={<Icon type="ionicon" name="key-outline" color="#aaa" size={50} />}
        icon={<Icon type="ionicon" name="key-outline" color="#aaa" size={50} />}
        text={credentials ? 'تغییر رمز ورود' : 'انتخاب رمز ورود'}
        firstBtnTitle="ذخیره"
        firstBtnPress={() => _handleSelectedPass()}>
        <View style={styles.field}>
          <Text style={styles.label}>Pass</Text>
          <TextInput
            style={styles.input}
            password={true}
            autoCapitalize="none"
            ref={passwordTextRef}
            onChangeText={(txt) => setPassword(txt)}
            underlineColorAndroid="transparent"
          />
        </View>
      </DialogBox>
    </SafeAreaView>
  );
};
export default Lock;
