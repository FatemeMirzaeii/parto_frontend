import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment-jalaali';
import { FONT, SIZE, COLOR } from '../styles/static';
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
      date={props.current ?? today}
      onDateChanged={props.onDateChanged}

      //showTodayButton
    >
      <ExpandableCalendar
        jalali={true}
        firstDay={6}
        disablePan
        hideKnob
        hideArrows
        // renderHeader={(date) => {
        //   return (
        //     <View>
        //       <Text>{moment(date).format('jYYYY jMMMM')}</Text>
        //     </View>
        //   );
        // }}
        testID={testIDs.expandableCalendar.CONTAINER}
        theme={{
          ...props.theme,
          ...{
            textDayFontFamily: FONT.regular,
            textMonthFontFamily: FONT.regular,
            textDayHeaderFontFamily: FONT.regular,
            textDayHeaderFontSize: SIZE[7],
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
});
export default WeekCalendar;
