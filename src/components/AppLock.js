import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Theme } from '../app/Theme';
import TouchID from 'react-native-touch-id';
// import RNLockScreen frsom 'react-native-lock-screen';
// import PatternLock from "react-pattern-lock";
// import PINCode from '@haskkor/react-native-pincode'
const optionalConfigObject = {
  title: 'حسگر اثر انگشت', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'حسگر اثر انگشت', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: ' انصراف ', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  // passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

const { colors, size, fonts } = Theme;
const AppLock = (props) => {
  const [state, setState] = useState({ path: '' });
  useEffect(() => {
    TouchID.isSupported()
      .then((biometryType) => {
        TouchID.authenticate('', optionalConfigObject) // Show the Touch ID prompt
          .then((success) => {
            console.log('open app ');
          })
          .catch((error) => {
            console.log('cannot open app ');
          });
      })
      .catch((error) => {
        console.log('no suported');
      });
  });

  return (
    <View style={{ backgroundColor: 'pink', justifyContent: 'center' }}>
      {/* <PINCode status={'choose'} /> */}
    </View>
  );
};
export default AppLock;
