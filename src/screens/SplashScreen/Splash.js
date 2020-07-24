import React, { useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import TouchID from 'react-native-touch-id';
import { Theme } from '../../app/Theme';
import AppLock from '../../components/AppLock';
const optionalConfigObject = {
  title: 'حسگر اثر انگشت', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'حسگر اثر انگشت', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'انصراف', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empt222y, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  // passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

const { colors, size, fonts } = Theme;
const Splash = (props) => {
  useEffect(() => {
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
  });

  return (
    <View
      style={{ backgroundColor: 'pink', justifyContent: 'center' }}>
      <AppLock />
      {/* <Image
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
      </Text> */}
    </View>
  );
};
export default Splash;
