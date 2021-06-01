import { BackHandler } from 'react-native';
import * as Keychain from 'react-native-keychain';

export default async () => {
  try {
    const options = {
      authenticationPrompt: {
        title: 'نیاز به احراز هویت',
        subtitle: '',
        description: '',
        cancel: 'انصراف',
      },
    };
    await Keychain.setGenericPassword('without username', 'without password', {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      accessible: Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
    });
    const credentials = await Keychain.getGenericPassword(options);
    console.log(
      ' Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET',
      Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
    );
    if (credentials) {
      console.log('yesssssssssssssss', credentials);
    }
  } catch (err) {
    console.log('err, ', err.toString());
    console.log('Could not load credentials. ' + err);
    if (
      err.toString() === 'Error: code: 13, msg: انصراف' ||
      err.toString() ===
        'Error: code: 10, msg: Fingerprint operation canceled by user.'
    )
      BackHandler.exitApp();
  }
};
