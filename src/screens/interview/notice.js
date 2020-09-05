import React, { useEffect } from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';
const Notice = ({ route, navigation }) => {
  const { txt, nextPage } = route.params;

  useEffect(() => {
    delete route.params.txt;
    delete route.params.nextPage;
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../../assets/images/start/5.png')}
        style={styles.bg}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{txt}</Text>
          <Button
            title="باشه!"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.nextButton}
            titleStyle={styles.btnTitle}
            type="solid"
            onPress={() => navigation.replace(nextPage, { ...route.params })}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Notice;
