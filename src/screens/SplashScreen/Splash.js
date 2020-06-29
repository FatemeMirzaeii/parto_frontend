
import { View } from 'native-base';
import React, { useEffect } from 'react';
import { Image, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import TouchID from 'react-native-touch-id';
import { Theme } from '../../app/Theme';
import { getData } from '../../app/Functions';
import AsyncStorage from '@react-native-community/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics'
const optionalConfigObject = {
  title: 'حسگر اثر انگشت', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'حسگر اثر انگشت', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'انصراف', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  // passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

const { colors, size, fonts } = Theme;
const Splash = (props) => {
  useEffect(() => {
    async function bio() {

      ReactNativeBiometrics.createKeys('Confirm fingerprint')
        .then((resultObject) => {
          const { publicKey } = resultObject
          console.log(publicKey)
          sendPublicKeyToServer(publicKey)
        })
    }
    bio()
    // TouchID.isSupported()
    //   .then(biometryType => {
    //     TouchID.authenticate('', optionalConfigObject) // Show the Touch ID prompt
    //       .then(success => {
    //         console.log("open app ")
    //       })
    //       .catch(error => {
    //         console.log("cannot open app ")
    //       });
    //   })
    //   .catch(error => {
    //     console.log("no suported")
    //   });

  })
  useEffect(() => {
    setTimeout(async () => {
      const start = await getData('@startPages');
      const token = await getData('@token');
      if (start == 'true' && token) {
        props.navigation.navigate('Home');
      } else if (token) {
        props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'StartQuestion' })],
          }),
        );
      } else {
        props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
          }),
        );
      }
    }, 800);
  });
  return (
    <View style={{ backgroundColor: 'pink', flex: 1, justifyContent: 'center' }}>
      <Image
        style={{
          alignSelf: 'center',
          borderRadius: 200,
          width: 200,
          height: 200,
          marginBottom: 50,
        }}
        source={require('../../../assets/images/parto.jpeg')}
      />
      <Text
        style={{
          alignSelf: 'center',
          fontFamily: fonts.regular,
          fontSize: size[24],
        }}>
        {' '}
        پرتو دستیار هوشمند سلامت بانوان{' '}
      </Text>
    </View>
  );
};
export default Splash;
