import React, { useEffect } from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { HEIGHT } from '../../styles/static';
import styles from './styles';
const Notice = ({ route, navigation }) => {
  const { txt, nextPage } = route.params;

  useEffect(() => {
    delete route.params.txt;
    delete route.params.nextPage;
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        source={require('../../../assets/images/start/5.png')}
        style={styles.bg}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{txt}</Text>
          <Button
            title="باشه!"
            containerStyle={[styles.btnContainer, { top: HEIGHT / 6 }]}
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
