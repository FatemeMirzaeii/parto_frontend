import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import jalaali from 'moment-jalaali';
import { FONT, COLOR, WIDTH } from '../styles/static';
import {
  CalendarProvider,
  WeekCalendar as WeekCal,
} from 'react-native-jalali-calendars';
import { getUserVaginalAndSleepOptions } from '../util/database/query';

const WeekCalendar = (props) => {
  const cycle = useSelector((state) => state.cycle);
  const [selectedDate, setSelectedDate] = useState();
  const today = new Date().toISOString().split('T')[0];
  // const period = { key: 'period', color: COLOR.bleeding };
  // const periodPerdictiin = {
  //   key: 'periodPerdictiin',
  //   color: COLOR.periodPerdiction,
  // };
  // const ovulationd = { key: 'ovulation', color: COLOR.tiffany };
  // const vaginalAndSleep = {
  //   key: 'vaginalAndSleep',
  //   color: COLOR.vaginalAndSleep,
  // };
  // const markTrackingOptions = async () => {
  //   const t = await getUserVaginalAndSleepOptions();
  //   console.log('tttttt', t);
  //   markedDateObj(
  //     t.map((d) => d.date),
  //     vaginalAndSleep,
  //   );
  // };
  const onDayPress = (date) => {
    setSelectedDate(date.dateString);
    if (props.onDayPress) props.onDayPress(date);
  };
  const onDateChanged = (date, propUpdate) => {
    setSelectedDate(date);
    if (props.onDateChanged) props.onDateChanged(date);
  };
  return (
    <CalendarProvider
      jalali
      date={props.current ?? today}
      onDateChanged={onDateChanged}
      showTodayButton={props.showTodayButton}
      todayButtonStyle={styles.today}>
      <View style={styles.header}>
        <Text style={styles.headerText(props.theme.headerColor)}>
          {selectedDate === '2021-03-22'
            ? '2 فروردین 1400'
            : jalaali(selectedDate).format('jD jMMMM jYYYY')}
        </Text>
      </View>
      <WeekCal
        jalali
        firstDay={6}
        onDayPress={onDayPress}
        markedDates={{
          ...cycle.periodPerdictions,
          ...cycle.ovulationPerdictions,
          ...cycle.periodDays,
        }}
        markingType="custom"
        theme={{
          ...props.theme,
          ...{
            textSectionTitleColor: COLOR.black,
            todayTextColor: COLOR.white,
            textDayFontFamily: FONT.medium,
            selectedDayBackgroundColor: COLOR.white,
            selectedDayTextColor: COLOR.black,
            textDisabledColor: COLOR.black,
            'stylesheet.expandable.main': {
              dayHeader: {
                width: 40,
                textAlign: 'center',
                fontFamily: FONT.medium,
                fontSize: 11,
                color: props.theme.dayHeaderColor,
              },
            },
            'stylesheet.day.single': {
              today: {
                borderRadius: 50,
                elevation: 2,
                // height: 100,
              },
            },
          },
        }}
        style={[props.style, styles.calendar]}
      />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  calendar: {},
  header: {
    padding: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: (headerColor) => ({
    fontFamily: FONT.bold,
    fontSize: 15,
    color: headerColor,
  }),
  today: {
    alignSelf: 'flex-end',
    height: 65,
    width: 65,
    borderRadius: 40,
  },
});
export default WeekCalendar;
