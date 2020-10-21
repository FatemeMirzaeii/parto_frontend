import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { Icon, Button, ListItem } from 'react-native-elements';
import { Calendar } from 'react-native-jalali-calendars';
import jalaali from 'moment-jalaali';
// import PregnancyPicker from '../../components/PregnancyPicker';
import Card from '../../components/Card';
import PickerListItem from '../../components/PickerListItem';
import pregnancyModule from '../../util/pregnancy';
import {
  getActivePregnancyData,
  updatePregnancyData,
} from '../../util/database/query';
import styles from './styles';
import { COLOR, FONT } from '../../styles/static';
import globalStyles from '../../styles';

const PregnancyProfile = ({ navigation, route }) => {
  const [dueDate, setDueDate] = useState();
  const [pregnancyWeek, setPregnancyWeek] = useState(0);
  const [pregnancyWeekDay, setPregnancyWeekDay] = useState(0);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'پروفایل بارداری',
      headerLeft: () => (
        <Button
          title="ثبت"
          type="outline"
          disabled={!dueDate}
          onPress={save}
          titleStyle={globalStyles.headerBtnTitle}
          containerStyle={globalStyles.smallHeaderBtn}
        />
      ),
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
    const save = () => {
      updatePregnancyData(dueDate);
      navigation.pop();
    };
  }, [dueDate, navigation]);

  useEffect(() => {
    getActivePregnancyData().then((d) => {
      setDueDate(d.due_date);
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
          leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          subtitle="سن بارداری شما بر اساس اولین روز از آخرین پریود شما محاسبه شده است."
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
        <PickerListItem
          title="تاریخ زایمان"
          rightTitle={{ title: jalaali(dueDate).format('jYYYY / jM / jD') }}
          leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          customComponent={
            <Calendar
              jalali
              firstDay={6}
              current={dueDate}
              minDate={new Date()}
              hideExtraDays
              enableSwipeMonths
              onDayPress={(day) => {
                setDueDate(day.dateString);
              }}
              markedDates={{
                [dueDate]: { selected: true },
              }}
              theme={{
                textSectionTitleColor: COLOR.black,
                calendarBackground: 'transparent',
                selectedDayTextColor: COLOR.white,
                textDisabledColor: COLOR.textColorDark,
                textDayFontFamily: FONT.regular,
                textMonthFontFamily: FONT.regular,
                textDayHeaderFontFamily: FONT.regular,
                selectedDayBackgroundColor: COLOR.tiffany,
                textDayHeaderFontSize: 8,
                arrowColor: COLOR.tiffany,
                todayTextColor: COLOR.tiffany,
              }}
            />
          }
        />
      </Card>
      <Button
        title="پایان بارداری"
        onPress={() => navigation.navigate('PregnancyEnd', { ...route.params })}
        buttonStyle={styles.saveContainer}
        containerStyle={styles.saveButton}
        titleStyle={styles.saveTitle}
      />
    </ScrollView>
  );
};
export default PregnancyProfile;
