import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import jalaali from 'moment-jalaali';
import { FONT, COLOR, WIDTH } from '../styles/static';
import {
  CalendarProvider,
  WeekCalendar as WeekCal,
} from 'react-native-jalali-calendars';
import CycleModule from '../util/cycle';
import { getUserVaginalAndSleepOptions } from '../util/database/query';
import Divider from '../components/Divider';

const WeekCalendar = (props) => {
  const [selectedDate, setSelectedDate] = useState();
  const [markedDates, setMarkedDates] = useState({});
  const today = new Date().toISOString().split('T')[0];
  const period = { key: 'period', color: COLOR.bleeding };
  const periodPerdictiin = {
    key: 'periodPerdictiin',
    color: COLOR.periodPerdiction,
  };
  const ovulationd = { key: 'ovulation', color: COLOR.tiffany };
  const vaginalAndSleep = {
    key: 'vaginalAndSleep',
    color: COLOR.vaginalAndSleep,
  };
  useEffect(() => {
    markBleedingDays();
    markPerdictions();
    // markTrackingOptions();
  }, []);
  const markedDateObj = (dates, dot) => {
    // console.log('marked dates', dates);
    dates.forEach((date) => {
      if (date in markedDates) {
        // markedDates[date].dots.push(dot);
        return;
      } else {
        markedDates[date] = {
          dots: [dot],
        };
      }
    });
    setMarkedDates({ ...markedDates });
  };
  const markBleedingDays = async () => {
    const c = await CycleModule();
    const past = await c.pastBleedingDays();
    if (past) {
      const formatted = past.map((day) => day.date.format('YYYY-MM-DD'));
      markedDateObj(formatted, period);
    }
  };
  const markPerdictions = async () => {
    const c = await CycleModule();
    const bleeding = c.perdictedPeriodDaysInCurrentYear();
    markedDateObj(bleeding, periodPerdictiin);

    const ovulation = c.perdictedOvulationDaysInCurrentYear();
    markedDateObj(ovulation, ovulationd);
  };
  const markTrackingOptions = async () => {
    const t = await getUserVaginalAndSleepOptions();
    console.log('tttttt', t);
    markedDateObj(
      t.map((d) => d.date),
      vaginalAndSleep,
    );
  };
  const onDayPress = (date) => {
    setSelectedDate(date.dateString);
    if (props.onDayPress) props.onDayPress(date);
  };
  return (
    <CalendarProvider
      jalali
      date={props.current ?? today}
      onDateChanged={props.onDateChanged}
      showTodayButton={props.showTodayButton}
      todayButtonStyle={styles.today}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {jalaali(selectedDate).format('jD jMMMM jYYYY')}
        </Text>
      </View>
      <Divider color={props.dividerColor} width={WIDTH - 25} />
      <WeekCal
        jalali
        firstDay={6}
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType="multi-dot"
        theme={{
          ...props.theme,
          ...{
            textSectionTitleColor: COLOR.black,
            todayTextColor: COLOR.white,
            todayBackgroundColor: '#c6d436',
            textDayFontFamily: FONT.medium,
            selectedDayBackgroundColor: COLOR.tiffany,
            'stylesheet.expandable.main': {
              dayHeader: {
                fontFamily: FONT.medium,
                fontSize: 12,
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
    right: 20,
    width: '100%',
    alignSelf: 'flex-end',
    padding: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerText: { fontFamily: FONT.bold, fontSize: 15 },
  today: {
    alignSelf: 'flex-end',
    height: 25,
    width: 100,
    borderRadius: 40,
    color: 'red',
  },
});
export default WeekCalendar;
