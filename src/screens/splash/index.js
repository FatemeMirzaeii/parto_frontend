import React, { useEffect } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import { migration } from '../../util/database/migration';
import Lock from '../../util/lock';

const Splash = (props) => {
  useEffect(() => {
    Lock();
    migration();
  });

  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.bg}
        source={require('../../../assets/images/splash.png')}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
  },
});
export default Splash;
