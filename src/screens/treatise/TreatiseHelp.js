import React, { useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, Text,View,Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { HELP_TEXT } from '../../constants/treatise';
import { COLOR } from '../../styles/static';
import styles from './styles';

const TreatiseHelp = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'راهنما',
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          reverse
          size={15}
          name="arrow-right"
          type="font-awesome"
          color={COLOR.btn}
          onPress={() => navigation.pop()}
        />
      ),
    });
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.contentContiner}>
        <Text style={styles.helpTxt}>{HELP_TEXT}</Text>
      <View style={styles.logosWrapper}> 
      <Image
        style={styles.img}
        source={require('../../../assets/images/TreatiseHelp/parto.jpg')}
        resizeMode="cover"
      />
      <Image
        style={styles.img}
        source={require('../../../assets/images/TreatiseHelp/razavi.jpg')}
        resizeMode="cover"
      />

      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TreatiseHelp;
