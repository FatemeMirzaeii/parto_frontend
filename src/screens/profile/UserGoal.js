import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Alert } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import styles from './styles';
import {
  getUserStatus,
  savePregnancyData,
  updateUserStatus,
} from '../../util/database/query';
import { COLOR } from '../../styles/static';
import Card from '../../components/Card';
import PregnancyModule from '../../util/pregnancy';

const UserGoal = ({ navigation }) => {
  const [mode, setMode] = useState();

  const modes = ['ثبت روزهای قرمز', 'اقدام برای بارداری', 'بارداری'];

  useEffect(() => {
    getUserStatus().then((res) => {
      if (res) {
        res.pregnant ? setMode(2) : res.pregnancy_try ? setMode(1) : setMode(0);
      }
    });
  }, [mode]);
  const onModePress = (i) => {
    if (mode === 2 && i !== 2) {
      Alert.alert(
        '',
        'آیا میخواهید از حالت بارداری خارج شوید؟',
        [
          {
            text: 'بله',
            onPress: () => {
              navigation.navigate('PregnancyProfile', { mode: i });
            },
          },
          {
            text: 'خیر',
            onPress: () => {
              return;
            },
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    } else {
      switch (i) {
        case 0:
          updateUserStatus(0, 0);
          setMode(i);
          break;
        case 1:
          updateUserStatus(0, 1);
          setMode(i);
          break;
        case 2:
          Alert.alert(
            '',
            'درحال فعالسازی حالت بارداری هستید. آیا مطمئنید؟',
            [
              {
                text: 'بله',
                onPress: async () => {
                  updateUserStatus(1, 0);
                  const p = await PregnancyModule();
                  await savePregnancyData({ dueDate: p.determineDueDate() });
                  setMode(i);
                  navigation.navigate('PregnancyProfile');
                },
              },
              {
                text: 'خیر',
                onPress: () => {
                  return;
                },
                style: 'cancel',
              },
            ],
            { cancelable: true },
          );
          break;
        default:
          break;
      }
    }
  };
  return (
    <SafeAreaView>
      <Card>
        <View>
          <Text style={styles.title}>هدف من</Text>
        </View>
        <ButtonGroup
          onPress={onModePress}
          selectedIndex={mode}
          buttons={modes}
          containerStyle={styles.goals}
          selectedButtonStyle={{ backgroundColor: COLOR.btn }}
          textStyle={styles.text}
          innerBorderStyle={{ width: 0 }}
          buttonStyle={styles.goal}
        />
      </Card>
    </SafeAreaView>
  );
};
export default UserGoal;
