import React, { useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { Icon } from 'react-native-elements';

//constants
import { MORE_ABOUT_BREAST_EXAM } from '../../constants/reminders';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const BreastExamHelp = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'راهنما',
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.pink}
          onPress={() => navigation.pop()}
          containerStyle={{ right: 40 }}
        />
      ),
    });
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.contentContiner}>
        <Text style={styles.helpTxt}>{MORE_ABOUT_BREAST_EXAM}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BreastExamHelp;
