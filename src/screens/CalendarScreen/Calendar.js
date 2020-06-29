import {Container, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {Verticalcalendar} from 'react-native-calendars-persian';
import {toPersianNum} from '../../app/Functions';
import {Theme, Height} from '../../app/Theme';
import Database from '../../components/Database';
import {PROFILE} from '../../constants/TableDataBase';

const db = new Database();

const {colors, size, fonts} = Theme;
const moment2 = require('moment-jalaali');

var jalaali = require('jalaali-js');
moment2.loadPersian({dialect: 'persian-modern'});
const CalendarClass = (props) => {
  const [jalali, setjalali] = useState({jalaali: true, text: 'میلادی'});
  const [state, setState] = useState({
    items: [],
    thisDay: '',
    thisMonth: '',
    thisYear: '',
    ch: false,
  });
  const [periodDate, setPeriodDate] = useState('');
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
  useEffect(() => {
    // strftime('%d-%m-%Y', last_period_date)
    db.rawQuery(`SELECT * FROM ${PROFILE}`, [], PROFILE).then((res) => {
      setPeriodDate(res[0].birthdate);
      console.log('res select: ', res);
    });
  });

  return (
    <Container>
      <StatusBar translucent barStyle="dark-content" backgroundColor="white" />

      <Text
        style={{
          marginTop: 40,
          fontFamily: fonts.medium,
          fontSize: size[15],
          color: '#121C3D',
          marginBottom: 10,
          alignSelf: 'center',
        }}>
        {toPersianNum(state.thisDay)} {state.thisMonth}{' '}
        {toPersianNum(state.thisYear)}
      </Text>
      <Text
        style={{
          marginTop: 40,
          fontFamily: fonts.medium,
          fontSize: size[30],
          color: 'red',
          marginBottom: 10,
          alignSelf: 'center',
        }}>
        {periodDate.replace(4, '-')}
        {/* {"foo baz".splice(4, 0, "bar ")} */}
      </Text>
      <Verticalcalendar
        jalali={jalali.jalaali}
        style={styles.calendar}
        current={'2020-05-16'}
        minDate={'2018-03-21'}
        markingType={'multi-dot'}
        firstDay={6}
        theme={{
          textSectionTitleColor: '#35036B',
          todayTextColor: 'white',
          todayBackgroundColor: 'pink',
          selectedDayTextColor: 'white',
          monthTextColor: 'pink',
          selectedDayBackgroundColor: 'pink',
          textDisabledColor: '#B82162',
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
          '2020-05-17': {disabled: true},
          '2020-04-21': {textColor: '#009933'},
          '2020-05-09': {textColor: '#009933'},
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
