import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Icon, Button, ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-paper';
import jalaali from 'moment-jalaali';
import moment from 'moment';

//redux
import { useSelector, useDispatch } from 'react-redux';

//store
import { fetchInitialCycleData, setGoal } from '../../store/actions/cycle';
import { setPregnancyMode2 } from '../../store/actions/pregnancy';

//components
// import PregnancyPicker from '../../components/PregnancyPicker';
import Card from '../../components/Card';
import DialogBox from '../../components/DialogBox';
import BackButton from '../../components/BackButton';
import PickerListItem from '../../components/PickerListItem';

//util
import pregnancyModule from '../../util/pregnancy';
import {
  deletePregnancyData,
  getActivePregnancyData,
  updatePregnancyData,
  updateUserStatus,
} from '../../util/database/query';
import useModal from '../../util/hooks/useModal';

//assets
import pregnancyAvatar from '../../../assets/images/pregAvatar.png';

//styles
import styles from './styles';
import { COLOR } from '../../styles/static';
import globalStyles from '../../styles';

const PregnancyProfile = ({ navigation, route }) => {
  const [dueDate, setDueDate] = useState();
  const [pregnancyWeek, setPregnancyWeek] = useState(null);
  const [pregnancyWeekDay, setPregnancyWeekDay] = useState(null);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();
  const { isVisible: firstvisible, toggle: firstToggle } = useModal();
  const { isVisible: secondvisible, toggle: secondToggle } = useModal();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'پروفایل بارداری',
      headerLeft: null,
      // () => (
      //   <Button
      //     title="ثبت"
      //     type="outline"
      //     disabled={!dueDate}
      //     onPress={save}
      //     titleStyle={globalStyles.headerBtnTitle}
      //     containerStyle={globalStyles.smallHeaderBtn}
      //   />
      // ),
      headerRight: () => <BackButton navigation={navigation} />,
    });
    const save = () => {
      updatePregnancyData(dueDate);
      navigation.pop();
    };
  }, [dueDate, navigation]);

  useEffect(() => {
    getActivePregnancyData().then((dd) => {
      if (dd.due_date) setDueDate(dd.due_date);
    });
    setPregnancyAge();
  }, []);
  const setPregnancyAge = async () => {
    const p = await pregnancyModule();
    const pregnancyAge = p.determinePregnancyWeek(moment());
    if (pregnancyAge) {
      setPregnancyWeek(pregnancyAge.week);
      setPregnancyWeekDay(pregnancyAge.days);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Avatar.Image
          size={170}
          source={pregnancyAvatar}
          style={globalStyles.avatar}
        />
        <ListItem
          title="سن بارداری"
          rightTitle={
            pregnancyWeek && pregnancyWeek >= 0
              ? `${pregnancyWeek} هفته ${
                  pregnancyWeekDay ? `و ${pregnancyWeekDay} روز` : ''
                }`
              : ''
          }
          // leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          // subtitle="سن بارداری شما بر اساس اولین روز از آخرین پریود شما محاسبه شده است."
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
          subtitleStyle={globalStyles.subTitle}
          rightTitleStyle={[
            globalStyles.listItemTitle,
            {
              maxWidth: 90,
              textAlign: 'right',
            },
          ]}
          // customComponent={
          //   <PregnancyPicker
          //     selectedWeek={pregnancyWeek}
          //     onWeekSelected={setPregnancyWeek}
          //     selectedDay={pregnancyWeekDay}
          //     onWeekDaySelected={setPregnancyWeekDay}
          //   />
          // }
        />
        <ListItem
          title="تاریخ زایمان"
          rightTitle={dueDate && jalaali(dueDate).format('jYYYY / jM / jD')}
          // leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          // subtitle="تاریخ زایمان شما بر اساس تاریخ آخرین پریود شما محاسبه شده است."
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
          subtitleStyle={globalStyles.subTitle}
          rightTitleStyle={[
            globalStyles.listItemTitle,
            {
              maxWidth: 90,
              textAlign: 'right',
            },
          ]}
          // customComponent={
          //   <Calendar
          //     jalali
          //     firstDay={6}
          //     current={dueDate}
          //     minDate={new Date()}
          //     hideExtraDays
          //     enableSwipeMonths
          //     onDayPress={(day) => {
          //       setDueDate(day.dateString);
          //     }}
          //     markedDates={{
          //       [dueDate]: { selected: true },
          //     }}
          //     theme={{
          //       textSectionTitleColor: COLOR.black,
          //       calendarBackground: 'transparent',
          //       selectedDayTextColor: COLOR.white,
          //       textDisabledColor: COLOR.textColorDark,
          //       textDayFontFamily: FONT.regular,
          //       textMonthFontFamily: FONT.regular,
          //       textDayHeaderFontFamily: FONT.regular,
          //       selectedDayBackgroundColor: COLOR.tiffany,
          //       textDayHeaderFontSize: 8,
          //       arrowColor: COLOR.tiffany,
          //       todayTextColor: COLOR.tiffany,
          //     }}
          //   />
          //}
        />
        <ListItem
          subtitle="سن بارداری و تاریخ زایمان شما بر اساس اولین روز از آخرین پریود شما محاسبه شده است."
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
          subtitleStyle={globalStyles.subTitle}
        />
      </Card>
      {template === 'Main' && (
        <View style={styles.btnsWrapper}>
          <Button
            title="پایان بارداری"
            onPress={firstToggle}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.button}
            titleStyle={styles.btnTitle}
          />
          <Button
            title="حذف اطلاعات بارداری"
            onPress={secondToggle}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.deletebutton}
            titleStyle={styles.deleteBtnTitle}
          />
        </View>
      )}
      <DialogBox
        isVisible={firstvisible}
        hide={firstToggle}
        icon={<Icon type="parto" name="baby" color="#aaa" size={50} />}
        twoButtons
        text="نحوه پایان بارداری"
        firstBtnTitle="تولد نوزاد"
        secondBtnTitle="سقط جنین"
        firstBtnColor={COLOR.pink}
        firstBtnPress={() => {
          firstToggle();
          navigation.navigate('PregnancyEndCalendar', {
            ...route.params,
            type: 0, //تولد
          });
        }}
        secondBtnPress={() => {
          firstToggle();
          navigation.navigate('PregnancyEndCalendar', {
            ...route.params,
            type: 1, //سقط
          });
        }}
      />
      <DialogBox
        isVisible={secondvisible}
        hide={secondToggle}
        icon={<Icon type="parto" name="trash" color="#aaa" size={50} />}
        text="آیا از حذف اطلاعات بارداری خود مطمئن هستید؟"
        twoButtons
        firstBtnColor={COLOR.pink}
        firstBtnPress={async () => {
          secondToggle();
          await deletePregnancyData();
          if (route.params && route.params.mode) {
            updateUserStatus(0, 1);
            dispatch(setGoal(1));
          } else {
            updateUserStatus(0, 0);
            dispatch(setGoal(0));
          }
          dispatch(setPregnancyMode2(0));
          dispatch(fetchInitialCycleData());
          navigation.pop();
        }}
        secondBtnPress={secondToggle}
      />
    </ScrollView>
  );
};
export default PregnancyProfile;
