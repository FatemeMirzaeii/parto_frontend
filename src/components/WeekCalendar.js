import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
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
      showTodayButton={props.showTodayButton}
      todayButtonStyle={styles.today}>
      <ExpandableCalendar
        jalali={true}
        firstDay={6}
        disablePan
        hideKnob
        hideArrows
        renderHeader={(date) => {
          return (
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {moment(date).format('jD jMMMM jYYYY')}
              </Text>
              {/* <Icon
                name="calendar"
                type="font-awesome"
                size={15}
                color={COLOR.btn}
                containerStyle={{ padding: 5 }}
              /> */}
            </View>
          );
        }}
        testID={testIDs.expandableCalendar.CONTAINER}
        theme={{
          ...props.theme,
          ...{
            textSectionTitleColor: '#111111',
            textDayFontFamily: FONT.regular,
            textMonthFontFamily: FONT.bold,
            textDayHeaderFontFamily: FONT.medium,
            textDayHeaderFontSize: 8.7,
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
    height: 60,
    width: 60,
    borderRadius: 40,
  },
});
export default WeekCalendar;
