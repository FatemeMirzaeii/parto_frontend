import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {CalendarProvider, ExpandableCalendar} from 'react-native-calendars';

const WeekCalendar = (props) => {
  return (
    <CalendarProvider date={new Date()} onDateChanged={props.onDateChanged}>
      <ExpandableCalendar
        current={props.current}
        firstDay={1}
        disablePan={true}
        hideKnob={true}
        hideArrows={true}
        theme={{
          calendarBackground: 'transparent',
        }}
        style={styles.calendar}
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
