import React from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';
const Notice = ({ route, navigation }) => {
  const { txt, nextPage, data } = route.params;
  // const goToHome = async () => {
  //   await storeData('@startPages', 'true');
  //   console.log('a');
  //   props.navigation.navigate('Home');
  // };
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../../assets/images/start/5.png')}
        style={styles.bg}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{txt}</Text>
          <Button
            title="خب!"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.nextButton}
            titleStyle={styles.btnTitle}
            type="solid"
            onPress={() => navigation.replace(nextPage, { data })}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Notice;
