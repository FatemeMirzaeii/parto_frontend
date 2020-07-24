import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-jalali-calendars';
const testIDs = require('../screens/CalendarScreen/testIDs');
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
        //disablePan
        //hideKnob
        hideArrows
        testID={testIDs.expandableCalendar.CONTAINER}
        theme={{
          calendarBackground: '#f6f6f6',
        }}
        // style={styles.calendar}
      />
    </CalendarProvider>
  );
};
const styles = StyleSheet.create({
  calendar: {
    top: 25,
  },
});
export default WeekCalendar;
