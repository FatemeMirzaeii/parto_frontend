import { BackHandler } from 'react-native';
import { lockStatus } from '../../util/database/query';
import TouchID from 'react-native-touch-id';

export default async () => {
  const status = await lockStatus();
  const optionalConfigObject = {
    title: '', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'حسگر اثر انگشت', // Android
    //sensorErrorDescription: 'Failed', // Android
    cancelText: ' انصراف ', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  if (status) {
    TouchID.authenticate('', optionalConfigObject) // Show the Touch ID prompt
      .then((success) => {
        console.log('open app ');
      })
      .catch((error) => {
        console.log('cannot open app ', error.code);
        if (error.code === 'AUTHENTICATION_CANCELED') BackHandler.exitApp();
        console.log('cannot open app ');
      });
  }
};
