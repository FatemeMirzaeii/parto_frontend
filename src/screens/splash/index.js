import React, { useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Lock from '../../util/lock';

const Splash = (props) => {
  useEffect(() => {
    Lock();
  });

  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.bg}
        source={require('../../../assets/images/start/0.png')}>
        <View style={styles.container}>
          <Text style={styles.txt}>پرتو دستیار هوشمند سلامت بانوان</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    alignSelf: 'center',
  },
});
export default Splash;
