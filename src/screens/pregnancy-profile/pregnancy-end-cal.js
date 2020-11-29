import React, { useEffect, useState } from 'react';
import { ImageBackground, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Calendar } from 'react-native-jalali-calendars';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';
import PregnancyModule from '../../util/pregnancy';
import CycleModule from '../../util/cycle';
import {
  updatePregnancyData,
  updateUserStatus,
} from '../../util/database/query';
import { fetchInitialCycleData } from '../../store/actions/cycle';
const today = moment();

const PregnancyEndCalendar = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const save = async () => {
    const p = await PregnancyModule();
    const c = await CycleModule();
    !route.params.type
      ? await updatePregnancyData(selectedDate)
      : await updatePregnancyData(null, selectedDate);
    route.params.mode ? updateUserStatus(0, 1) : updateUserStatus(0, 0);
    await p.determineNefasDays(selectedDate);
    await c.determineLastPeriodDate();
    dispatch(fetchInitialCycleData());
    navigation.popToTop();
  };

  const determineTitle = () => {
    switch (route.params.type) {
      case 0:
        return 'تاریخ زایمان را وارد کنید.';
      case 1:
        return 'تاریخ سقط را وارد کنید.';
    }
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/start/2.png')}
      style={styles.bg}>
      <Text style={styles.question}>{determineTitle()}</Text>
      <Calendar
        firstDay={6}
        jalali
        enableSwipeMonths
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: { selected: true },
        }}
        markingType="multi-period"
        maxDate={today.format('YYYY-MM-DD')}
        disableAllTouchEventsForDisabledDays
        hideExtraDays
        theme={{
          textSectionTitleColor: '#111111',
          calendarBackground: 'transparent',
          selectedDayTextColor: '#ffffff',
          textDisabledColor: COLOR.textColorDark,
          textDayFontFamily: FONT.regular,
          textMonthFontFamily: FONT.regular,
          textDayHeaderFontFamily: FONT.regular,
          selectedDayBackgroundColor: COLOR.tiffany,
          textDayHeaderFontSize: 8,
          arrowColor: COLOR.tiffany,
          todayTextColor: COLOR.tiffany,
        }}
        style={styles.calendar}
      />
      <Button
        title="ذخیره"
        disabled={!selectedDate}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.nextButton}
        titleStyle={styles.saveTitle}
        type="solid"
        onPress={save}
      />
    </ImageBackground>
  );
};
export default PregnancyEndCalendar;
