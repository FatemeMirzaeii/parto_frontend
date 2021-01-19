import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Alert } from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import {
  getUserStatus,
  addPregnancy,
  updateUserStatus,
} from '../../util/database/query';
import { COLOR } from '../../styles/static';
import PregnancyModule from '../../util/pregnancy';
import { updatePerdictions } from '../../store/actions/cycle';

const UserGoal = ({ navigation }) => {
  const [mode, setMode] = useState();
  const dispatch = useDispatch();
  const template = useSelector((state) => state.user.template);

  const modes = ['ثبت روزهای قرمز', 'اقدام برای بارداری', 'بارداری'];

  useEffect(() => {
    getUserStatus().then((res) => {
      if (res) {
        res.pregnant ? setMode(2) : res.pregnancy_try ? setMode(1) : setMode(0);
      }
    });
  }, [mode]);
  const onModePress = (i) => {
    if (template === 'Partner') return;
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
                  await addPregnancy({ dueDate: p.determineDueDate() });
                  setMode(i);
                  dispatch(updatePerdictions());
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
      <View style={styles.titleContainer}>
        <Icon size={30} name="goal" type="parto" color={COLOR.btn} />
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
    </SafeAreaView>
  );
};
export default UserGoal;
