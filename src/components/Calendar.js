import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar as Cal } from 'react-native-jalali-calendars';
import { Icon } from 'react-native-elements';

//styles
import { FONT, COLOR } from '../styles/static';

const Calendar = (props) => {
  return (
    <Cal
      jalali
      firstDay={6}
      enableSwipeMonths
      onDayPress={props.onDayPress}
      minDate={props.minDate}
      maxDate={props.maxDate}
      disableAllTouchEventsForDisabledDays
      hideExtraDays
      theme={{
        textSectionTitleColor: COLOR.black,
        todayTextColor: COLOR.black,
        calendarBackground: 'transparent',
        selectedDayBackgroundColor: 'transparent',
        selectedDayTextColor: COLOR.black,
        textDisabledColor: COLOR.textColorDark,
        textDayFontFamily: FONT.medium,
        textMonthFontFamily: FONT.bold,
        textDayHeaderFontFamily: FONT.medium,
        monthTextColor: COLOR.pink,
        'stylesheet.calendar.header': {
          dayHeader: {
            width: 40,
            textAlign: 'center',
            fontFamily: FONT.medium,
            fontSize: 11,
            color: COLOR.textColor,
          },
        },
        'stylesheet.day.basic': {
          base: {
            width: 38,
            height: 38,
            alignSelf: 'center',
            alignItems: 'center',
          },
          today: {
            borderRadius: 50,
            elevation: 1,
          },
          selected: {
            borderWidth: 3,
            borderColor: COLOR.pink,
            borderRadius: 50,
          },
        },
      }}
      renderArrow={(direction) => (
        <Icon
          type="font-awesome"
          name={`chevron-circle-${direction === 'left' ? 'right' : 'left'}`}
          color={COLOR.pink}
          size={23}
        />
      )}
      markedDates={props.markedDates}
      markingType="multi-period"
      style={props.style}
    />
  );
};

const styles = StyleSheet.create({});
export default Calendar;
