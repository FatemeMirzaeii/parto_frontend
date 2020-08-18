import { View } from 'native-base';
import React, { useEffect, useState, useRef } from 'react';
import TouchID from 'react-native-touch-id';

var Password1 = '';
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

const Lock = (props) => {
  const inputRef = useRef('pg');
  const [state, setState] = useState({
    path: '',
    status: '',
    message: '',
  });
  // useEffect(() => {
  //     TouchID.isSupported()
  //         .then(biometryType => {
  //             TouchID.authenticate('', optionalConfigObject) // Show the Touch ID prompt
  //                 .then(success => {
  //                     console.log("open app ")
  //                 })
  //                 .catch(error => {
  //                     console.log("cannot open app ")
  //                 });
  //         })
  //         .catch(error => {
  //             console.log("no suported")
  //         });
  // });
  useEffect(() => {
    async function a() {
      // await hasUserSetPinCode(serviceName);
    }
    a();
  });

  return (
    <View style={{ backgroundColor: 'white', justifyContent: 'center' }} />
  );
};
export default Lock;
