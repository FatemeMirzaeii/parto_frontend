import { Container, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Verticalcalendar } from 'react-native-calendars-persian';
import { toPersianNum } from '../../app/Functions';
import { Theme, Height } from '../../app/Theme';

const { colors, size, fonts } = Theme;
const moment2 = require('moment-jalaali');

var jalaali = require('jalaali-js');
moment2.loadPersian({ dialect: 'persian-modern' });
const CalendarClass = (props) => {
  const [jalali, setjalali] = useState({ jalaali: true, text: 'میلادی' });
  const [state, setState] = useState({
    items: [],
    thisDay: '',
    thisMonth: '',
    thisYear: '',
    ch: false,
  });

  useEffect(() => {
    GetTimeNow();
  }, [state.thisDay]);

  const checkSwitch = (param) => {
    switch (param) {
      case 1:
        return 'فروردین';
      case 2:
        return 'اردیبهشت';
      case 3:
        return 'خرداد';
      case 4:
        return 'تیر';
      case 5:
        return 'مرداد';
      case 6:
        return 'شهریور';
      case 7:
        return 'مهر';
      case 8:
        return 'آبان';
      case 9:
        return 'آذر';
      case 10:
        return 'دی';
      case 11:
        return 'بهمن';
      case 12:
        return 'اسفند';
    }
  };
  const GetTimeNow = async () => {
    var Persian = jalaali.toJalaali(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
    );
    var month = checkSwitch(Persian.jm);
    setState({
      thisDay: Persian.jd,
      thisMonth: month,
      thisYear: Persian.jy,
    });
  };


  return (
    <Container>
      <Text
        style={{
          fontFamily: fonts.medium,
          fontSize: size[15],
          color: '#121C3D',
          marginVertical: 10,
          alignSelf: 'center',
        }}>
        {toPersianNum(state.thisDay)} {state.thisMonth}{' '}
        {toPersianNum(state.thisYear)}
      </Text>
      <Verticalcalendar
        jalali={jalali.jalaali}
        style={styles.calendar}
        current={'2020-05-16'}
        // minDate={'2020-05-10'}
        markingType={'multi-dot'}
        firstDay={6}
        theme={{
          opacity: 0.5,
          textSectionTitleColor: '#35036B',
          todayTextColor: 'white',
          todayBackgroundColor: 'pink',
          selectedDayTextColor: 'white',
          monthTextColor: 'pink',
          selectedDayBackgroundColor: 'pink',
          textDisabledColor: 'red',
          textDayFontFamily: fonts.regular,
          textMonthFontFamily: fonts.regular,
          textDayHeaderFontFamily: fonts.regular,
          'stylesheet.calendar.header': {
            week: {
              marginTop: -2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          },
        }}
        markedDates={{
          '2020-05-17': { disabled: true },
          '2020-04-21': { textColor: '#009933' },
          '2020-05-09': { textColor: '#009933' },
          '2020-05-14': {
            startingDay: true,
            color: 'green',
            endingDay: true,
            textColor: 'white',
          },

        }}
      />
    </Container>
  );
};
export default CalendarClass;
const styles = StyleSheet.create({
  calendar: {
    width: '100%',
    // top: 60,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
});
