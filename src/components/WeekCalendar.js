import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import jalaali from 'moment-jalaali';
import { FONT, SIZE, COLOR } from '../styles/static';
import {
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-jalali-calendars';
import CycleModule from '../util/cycle';
import { getUserVaginalAndSleepOptions } from '../util/database/query';
import Divider from '../components/Divider';

const testIDs = require('../screens/calendar/testIDs');

const WeekCalendar = (props) => {
  const [markedDates, setMarkedDates] = useState({});
  const today = new Date().toISOString().split('T')[0];
  const period = { key: 'period', color: COLOR.btn };
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
    setMarkedDates({});
    markBleedingDays();
    markPerdictions();
    // markTrackingOptions();
  }, []);
  const markedDateObj = (dates, dot) => {
    console.log('marked dates', dates);
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
    //todo: should disable in pregnant mode.
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

  return (
    <CalendarProvider
      jalali
      date={props.current ?? today}
      onDateChanged={props.onDateChanged}
      showTodayButton={props.showTodayButton}
      todayButtonStyle={styles.today}>
      <ExpandableCalendar
        jalali
        firstDay={6}
        disablePan
        hideKnob
        hideArrows
        maxDate={props.maxDate}
        disableAllTouchEventsForDisabledDays
        markedDates={markedDates}
        markingType="multi-dot"
        renderHeader={(date) => {
          return (
            <View>
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  {jalaali(date).format('jD jMMMM jYYYY')}
                </Text>
                {/* <Icon
                name="calendar"
                type="font-awesome"
                size={15}
                color={COLOR.btn}
                containerStyle={{ padding: 5 }}
              /> */}
              </View>
              <Divider color={props.dividerColor} />
            </View>
          );
        }}
        testID={testIDs.expandableCalendar.CONTAINER}
        theme={{
          ...props.theme,
          ...{
            textSectionTitleColor: COLOR.black,
            todayTextColor: COLOR.white,
            textDayFontFamily: FONT.regular,
            selectedDayBackgroundColor: COLOR.currentPage,
            'stylesheet.calendar.header': {
              dayHeader: {
                fontFamily: FONT.regular,
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
  calendar: {
    elevation: 0,
  },
  header: {
    width: '100%',
    alignSelf: 'flex-end',
    padding: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerText: { fontFamily: FONT.bold, fontSize: SIZE[15] },
  today: {
    alignSelf: 'flex-end',
    height: 25,
    width: 100,
    borderRadius: 40,
    color: 'red',
  },
});
export default WeekCalendar;
