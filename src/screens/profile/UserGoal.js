import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import styles from './styles';
import { getUserStatus, updateUserStatus } from '../../util/database/query';

const UserGoal = () => {
  const [mode, setMode] = useState();
  const [prevMode, setPrevMode] = useState();
  const modes = ['ثبت روزهای قرمز', 'اقدام برای بارداری', 'بارداری'];

  useEffect(() => {
    getUserStatus().then((res) => {
      if (res) {
        res.pregnant ? setMode(2) : res.pregnancy_try ? setMode(1) : setMode(0);
      }
    });
  }, [mode]);
  const onModePress = (i) => {
    setPrevMode(mode);
    switch (i) {
      case 0:
        if (prevMode === 2) {
        }
        updateUserStatus(0, 0);
        break;
      case 1:
        if (prevMode === 2) {
        }
        updateUserStatus(0, 1);
        break;
      case 2:
        updateUserStatus(1, 0);
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
