// import { BackHandler } from 'react-native';
// import { lockStatus } from '../../util/database/query';
// import TouchID from 'react-native-touch-id';
// import { COLOR } from '../../styles/static';

// export default async () => {
//   const locked = await lockStatus();
//   const optionalConfigObject = {
//     title: '', // Android
//     imageColor: COLOR.purple, // Android
//     imageErrorColor: '#ff0000', // Android
//     sensorDescription: 'حسگر اثر انگشت', // Android
//     sensorErrorDescription: 'ناموفق؛ لطفا دوباره تلاش کنید.', // Android
//     cancelText: ' انصراف ', // Android
//     fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
//     unifiedErrors: false, // use unified error messages (default false)
//     passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
//   };

//   TouchID.authenticate('نیاز به احراز هویت', optionalConfigObject) // Show the Touch ID prompt
//     .then((success) => {
//       console.log('open app ');
//     })
//     .catch((error) => {
//       console.log('cannot open app ', error.code);
//       if (error.code === 'AUTHENTICATION_CANCELED') BackHandler.exitApp();
//       console.log('cannot open app ');
//     });
// };
import { BackHandler } from 'react-native';
import { lockStatus } from '../../util/database/query';
import * as Keychain from 'react-native-keychain';
import { COLOR } from '../../styles/static';
import configureStore from '../../store';

export default async () => {
  const { store } = configureStore();
  try {
    const options = {
      authenticationPrompt: {
        title: 'نیاز به احراز هویت',
        subtitle: '',
        description: 'in App',
        cancel: 'انصراف',
      },
    };
    await Keychain.setGenericPassword(
      store.getState().user.id,
      'without password',
      {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
      },
    );
    const credentials = await Keychain.getGenericPassword(options);
    if (credentials) {
      // this.setState({ ...credentials, status: 'Credentials loaded!' });
      console.log('yesssssssssssssss', credentials);
    }

    // else {
    //   this.setState({ status: 'No credentials stored.' });
    // }
  } catch (err) {
    // if (err.code === '13') BackHandler.exitApp();
    if (
      err.toString() === 'Error: code: 13, msg: انصراف' ||
      'Error: code: 10, msg: Fingerprint operation canceled by user.'
    )
      BackHandler.exitApp();
    console.log('Could not load credentials. ' + err);
  }
};
