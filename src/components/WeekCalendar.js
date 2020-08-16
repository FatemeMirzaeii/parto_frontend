import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-jalali-calendars';
const testIDs = require('../screens/calendar/testIDs');
const WeekCalendar = (props) => {
  const today = new Date().toISOString().split('T')[0];
  return (
    <CalendarProvider
      jalali={true}
      date={today}
      onDateChanged={props.onDateChanged}
      //showTodayButton
    >
      <ExpandableCalendar
        jalali={true}
        firstDay={6}
        disablePan
        hideKnob
        hideArrows
        testID={testIDs.expandableCalendar.CONTAINER}
        theme={props.theme}
        style={[props.style, styles.calendar]}
      />
    </CalendarProvider>
  );
};
const styles = StyleSheet.create({
  calendar: {
    elevation: 0,
    top: 25,
  },
});
export default WeekCalendar;
