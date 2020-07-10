import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import DataBase from '../../components/Database';
import styles from './Styles';
const db = new DataBase();

const UserGoal = () => {
  const [mode, setMode] = useState();
  const modes = ['ثبت روزهای قرمز', 'اقدام برای بارداری', 'بارداری'];

  useEffect(() => {
    db.rawQuery('SELECT pregnant, pregnancy_try FROM user_profile;').then(
      (n) => {
        n[0].pregnant
          ? setMode(2)
          : n[0].pregnancy_try
          ? setMode(1)
          : setMode(0);
      },
    );
  }, [mode]);
  const onModePress = (i) => {
    switch (i) {
      case 0:
        db.rawQuery('UPDATE user_profile SET pregnant=0, pregnancy_try=0');
        break;
      case 1:
        db.rawQuery('UPDATE user_profile SET pregnant=0, pregnancy_try=1');
        break;
      case 2:
        db.rawQuery('UPDATE user_profile SET pregnant=1, pregnancy_try=0');
        break;
      default:
        break;
    }
    setMode(i);
  };
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>هدف من</Text>
      </View>
      <ButtonGroup
        onPress={onModePress}
        selectedIndex={mode}
        buttons={modes}
        containerStyle={styles.goals}
        selectedButtonStyle={{ backgroundColor: 'tomato' }}
        textStyle={styles.text}
        innerBorderStyle={{ width: 0 }}
        buttonStyle={styles.goal}
      />
    </SafeAreaView>
  );
};
export default UserGoal;
