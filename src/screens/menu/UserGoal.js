import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';

//redux
import { useDispatch, useSelector } from 'react-redux';

//store
import { updatePerdictions } from '../../store/actions/cycle';

//components
import DialogBox from '../../components/DialogBox';

//util
import {
  getUserStatus,
  addPregnancy,
  updateUserStatus,
} from '../../util/database/query';
import useModal from '../../util/hooks/useModal';

//styles
import styles from './styles';
import { COLOR } from '../../styles/static';
import PregnancyModule from '../../util/pregnancy';

const UserGoal = ({ navigation }) => {
  const [mode, setMode] = useState();
  const dispatch = useDispatch();
  const template = useSelector((state) => state.user.template);
  const { isVisible: firstvisible, toggle: firstToggle } = useModal();
  const { isVisible: secondvisible, toggle: secondToggle } = useModal();
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
      firstToggle();
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
          secondToggle();
          break;
        default:
          break;
      }
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Icon size={30} name="goal" type="parto" color={COLOR.pink} />
        <Text style={styles.title}>
          {template === 'Partner' ? 'هدف' : 'هدف من'}
        </Text>
      </View>
      <ButtonGroup
        onPress={onModePress}
        selectedIndex={mode}
        buttons={modes}
        containerStyle={styles.goals}
        selectedButtonStyle={{ backgroundColor: COLOR.pink }}
        textStyle={styles.text}
        innerBorderStyle={{ width: 0 }}
        buttonStyle={styles.goal}
      />
      <DialogBox
        isVisible={firstvisible}
        hide={firstToggle}
        text="آیا میخواهید از حالت بارداری خارج شوید؟"
        twoButtons
        firstBtnPress={(i) => {
          firstToggle();
          navigation.navigate('PregnancyProfile', { mode: i });
        }}
        secondBtnPress={firstToggle}
      />
      <DialogBox
        isVisible={secondvisible}
        hide={secondToggle}
        text="درحال فعالسازی حالت بارداری هستید. آیا مطمئنید؟"
        twoButtons
        firstBtnPress={async (i) => {
          secondToggle();
          updateUserStatus(1, 0);
          const p = await PregnancyModule();
          await addPregnancy({ dueDate: p.determineDueDate() });
          setMode(i);
          dispatch(updatePerdictions());
          navigation.navigate('PregnancyProfile');
        }}
        secondBtnPress={secondToggle}
      />
    </SafeAreaView>
  );
};
export default UserGoal;
