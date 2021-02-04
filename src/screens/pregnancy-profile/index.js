import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Button, ListItem } from 'react-native-elements';
import jalaali from 'moment-jalaali';

// components and utils
// import PregnancyPicker from '../../components/PregnancyPicker';
import Card from '../../components/Card';
import PickerListItem from '../../components/PickerListItem';
import pregnancyModule from '../../util/pregnancy';
import {
  deletePregnancyData,
  getActivePregnancyData,
  updatePregnancyData,
  updateUserStatus,
} from '../../util/database/query';
import { fetchInitialCycleData } from '../../store/actions/cycle';

// styles
import styles from './styles';
import { COLOR, FONT } from '../../styles/static';
import globalStyles from '../../styles';

const PregnancyProfile = ({ navigation, route }) => {
  const [dueDate, setDueDate] = useState();
  const [pregnancyWeek, setPregnancyWeek] = useState(0);
  const [pregnancyWeekDay, setPregnancyWeekDay] = useState(0);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();
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
      headerRight: () => (
        <Icon
          reverse
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.purple}
          onPress={() => navigation.pop()}
        />
      ),
    });
    const save = () => {
      updatePregnancyData(dueDate);
      navigation.pop();
    };
  }, [dueDate, navigation]);

  useEffect(() => {
    getActivePregnancyData().then((dd) => {
      setDueDate(dd.due_date);
    });
    setPregnancyAge();
  }, []);
  const setPregnancyAge = async () => {
    const p = await pregnancyModule();
    const pregnancyAge = p.determinePregnancyWeek(jalaali());
    setPregnancyWeek(pregnancyAge.week);
    setPregnancyWeekDay(pregnancyAge.days);
  };

  return (
    <ScrollView>
      <Card>
        <ListItem
          title="سن بارداری"
          rightTitle={`${pregnancyWeek} هفته ${
            pregnancyWeekDay ? `و ${pregnancyWeekDay} روز` : ''
          }`}
          // leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          // subtitle="سن بارداری شما بر اساس اولین روز از آخرین پریود شما محاسبه شده است."
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          subtitleStyle={styles.subTitle}
          rightTitleStyle={[
            styles.listItemText,
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
          rightTitle={jalaali(dueDate).format('jYYYY / jM / jD')}
          // leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          // subtitle="تاریخ زایمان شما بر اساس تاریخ آخرین پریود شما محاسبه شده است."
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          subtitleStyle={styles.subTitle}
          rightTitleStyle={[
            styles.listItemText,
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
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          subtitleStyle={styles.subTitle}
        />
      </Card>
      {template === 'Main' && (
        <>
          <Button
            title="پایان بارداری"
            onPress={() =>
              navigation.navigate('PregnancyEnd', { ...route.params })
            }
            buttonStyle={styles.saveContainer}
            containerStyle={styles.saveButton}
            titleStyle={styles.saveTitle}
          />
          <Button
            title="حذف اطلاعات بارداری"
            type="outline"
            onPress={() =>
              Alert.alert(
                '',
                'آیا از حذف اطلاعات بارداری خود مطمئن هستید؟',
                [
                  {
                    text: 'بله',
                    onPress: async () => {
                      await deletePregnancyData();
                      await updateUserStatus(0, 0);
                      dispatch(fetchInitialCycleData());
                      navigation.pop();
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
              )
            }
            buttonStyle={styles.deleteContainer}
            containerStyle={styles.deleteButton}
            titleStyle={styles.deleteTitle}
          />
        </>
      )}
    </ScrollView>
  );
};
export default PregnancyProfile;
