import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Lock from '../../components/Lock';

const Splash = (props) => {
  return (
    <SafeAreaView>
      {/* <Lock /> */}
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
