import { BackHandler } from 'react-native';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';

export default async (lockType, navigation) => {
  const optionalConfigObject = {
    title: 'نیاز به احراز هویت', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'حسگر اثر انگشت', // Android
    sensorErrorDescription: 'ناموفق؛ لطفا دوباره تلاش کنید.', // Android
    cancelText: ' انصراف ', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  // try {
  //   console.log('hereeeeeeee');
  //   const options = {
  //     authenticationPrompt: {
  //       title: 'نیاز به احراز هویت',
  //       subtitle: '',
  //       description: '',
  //       cancel: 'انصراف',
  //     },
  //   };
  //   await Keychain.setGenericPassword('without username', 'without password', {
  //     accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
  //     accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
  //   });
  //   const credentials = await Keychain.getGenericPassword(options);
  //   console.log(
  //     ' Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET',
  //     Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
  //   );
  //   if (credentials) {
  //     console.log('yesssssssssssssss', credentials);
  //   }
  // } catch (err) {
  //   console.log('err, ', err.toString());
  //   console.log('Could not load credentials. ' + err);
  //   if (
  //     err.toString() === 'Error: code: 13, msg: انصراف' ||
  //     err.toString() ===
  //       'Error: code: 10, msg: Fingerprint operation canceled by user.'
  //   )
  //     BackHandler.exitApp();
  // }
  console.log('first open', lockType);

  switch (lockType) {
    case 'Passcode':
      navigation.navigate('Passcode', {
        screenName: navigation.getCurrentRoute().name,
      });
      break;
    case 'Fingerprint':
      TouchID.authenticate('', optionalConfigObject) // Show the Touch ID prompt
        .then((success) => {
          console.log('open app ', success);
        })
        .catch((error) => {
          console.log('cannot open app ', error.code);
          if (error.code === 'AUTHENTICATION_CANCELED') BackHandler.exitApp();
          console.log('cannot open app ');
        });
      break;
    case 'Iris':
      break;
    case 'Face':
      break;
    default:
      break;
  }
};
