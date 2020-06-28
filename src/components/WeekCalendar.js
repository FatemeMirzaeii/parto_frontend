import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {CalendarProvider, ExpandableCalendar} from 'react-native-calendars';

const WeekCalendar = (props) => {
  // onDayPress = (day) => {
  //     this.setState({ selected: day.dateString });
  // }
  return (
    <CalendarProvider>
      <ExpandableCalendar
        firstDay={6}
        disablePan={true}
        theme={{
          calendarBackground: 'transparent',
        }}
      />
    </CalendarProvider>
  );
};
const styles = StyleSheet.create({});
export default WeekCalendar;
