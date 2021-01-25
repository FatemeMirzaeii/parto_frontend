import React, { useEffect } from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';

//styles and images
import { HEIGHT } from '../../styles/static';
import styles from './styles';
import Main from '../../../assets/images/main/notice.png';
import Teenager from '../../../assets/images/teenager/notice.png';

const Notice = ({ route, navigation }) => {
  const { txt, nextPage } = route.params;

  useEffect(() => {
    delete route.params.txt;
    delete route.params.nextPage;
  }, []);

  return (
    <ImageBackground
      source={route.params.template === 'Main' ? Main : Teenager}
      style={styles.bg}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{txt}</Text>
          <Button
            title="باشه!"
            containerStyle={[styles.btnContainer, { top: HEIGHT / 15 }]}
            buttonStyle={styles.nextButton}
            titleStyle={styles.btnTitle}
            type="solid"
            onPress={() => navigation.replace(nextPage, { ...route.params })}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Notice;
