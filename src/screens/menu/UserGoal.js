import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';

//redux
import { useDispatch, useSelector } from 'react-redux';

//store
import { setGoal, updatePerdictions } from '../../store/actions/cycle';

//components
import DialogBox from '../../components/DialogBox';

//util
import { addPregnancy, updateUserStatus } from '../../util/database/query';
import useModal from '../../util/hooks/useModal';

//styles
import styles from './styles';
import { COLOR } from '../../styles/static';
import PregnancyModule from '../../util/pregnancy';

const UserGoal = ({ navigation }) => {
  const [mode, setMode] = useState();
  const dispatch = useDispatch();
  const template = useSelector((state) => state.user.template);
  const goal = useSelector((state) => state.cycle.goal);
  const { isVisible: firstvisible, toggle: firstToggle } = useModal();
  const { isVisible: secondvisible, toggle: secondToggle } = useModal();
  const modes = ['ثبت روزهای قرمز', 'اقدام برای بارداری', 'بارداری'];

  const onModePress = (i) => {
    if (template === 'Partner') return;
    setMode(i);
    if (goal === 2) {
      return i !== 2 ? firstToggle() : null;
    } else {
      switch (i) {
        case 0:
          updateUserStatus(0, 0);
          dispatch(setGoal(i));
          break;
        case 1:
          updateUserStatus(0, 1);
          dispatch(setGoal(i));
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
        <Icon size={30} name="goal" type="parto" color={COLOR.icon} />
        <Text style={styles.title}>
          {template === 'Partner' ? 'هدف' : 'هدف من'}
        </Text>
      </View>
      <ButtonGroup
        onPress={onModePress}
        selectedIndex={goal}
        buttons={modes}
        containerStyle={styles.goals}
        selectedButtonStyle={{
          backgroundColor: COLOR.pink,
          borderColor: COLOR.pink,
        }}
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
          navigation.navigate('PregnancyProfile', { mode });
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
          await updateUserStatus(1, 0);
          const p = await PregnancyModule();
          await addPregnancy({ dueDate: p.determineDueDate() });
          dispatch(setGoal(2));
          dispatch(updatePerdictions());
          navigation.navigate('PregnancyProfile');
        }}
        secondBtnPress={secondToggle}
      />
    </SafeAreaView>
  );
};
export default UserGoal;
