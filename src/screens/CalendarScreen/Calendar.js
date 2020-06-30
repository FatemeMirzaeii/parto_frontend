import { Container, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Verticalcalendar } from 'react-native-calendars-persian';
import { toPersianNum } from '../../app/Functions';
import { Theme } from '../../app/Theme';
import Database from '../../components/Database';
import { PROFILE } from '../../constants/TableDataBase';
const moment2 = require('moment-jalaali');
const moment = require('moment');
const db = new Database();

const { size, fonts } = Theme;

let perioddatemark = []
var jalaali = require('jalaali-js');
moment2.loadPersian({ dialect: 'persian-modern' });
const CalendarClass = (props) => {
  const [jalali, setjalali] = useState({ jalaali: true, text: 'میلادی' });
  const [periodlength, setperiodlength] = useState(null)
  const [cyclelength, setcyclelength] = useState(null)
  const [state, setState] = useState({
    thisDay: '',
    thisMonth: '',
    thisYear: '',
    ch: false,
    markedDates: '',
  });
  const [periodDate, setPeriodDate] = useState('');
  useEffect(() => {
    GetTimeNow();

  }, [state.thisDay]);
  useEffect(() => {

  }, [state.thisDay])

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
      ...state,
      thisDay: Persian.jd,
      thisMonth: month,
      thisYear: Persian.jy,
    });
  };
  useEffect(() => {
    db.rawQuery(
      `SELECT * FROM ${PROFILE}`, [], PROFILE
    ).then((res) => {
      console.log('res select: ', res[0])
      setperiodlength(res[0].avg_period_length)
      setcyclelength(res[0].avg_cycle_length)
      var str = (res[0].last_period_date).split('');
      var date = (str[0] + str[1] + str[2] + str[3] + "-" + str[4] + str[5] + "-" + str[6] + str[7]).toString()
      setPeriodDate(date)
      let mdate = {}

      for (i = 1; i <= cyclelength; i++) {
        let new_date = moment(moment(date).add(i, 'days').format('YYYY-MM-DD'));
        perioddatemark.push(new_date._i)
        mdate[new_date._i] = {
          periods: [
            { startingDay: false, endingDay: false, color: 'red' },
          ]
        }
      }
      setState({ ...state, markedDates: mdate })
      console.log("new: ", mdate)
    })

  }, [periodDate])

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
      <Verticalcalendar
        jalali={jalali.jalaali}
        style={styles.calendar}
        current={'2020-05-16'}
        minDate={'2018-03-21'}
        markingType={'multi-period'}
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

        markedDates={state.markedDates}
      // markedDates={{
      //   date_: {
      //     periods: [
      //       { startingDay: true, endingDay: false, color: 'red' },
      //     ]
      //   },
      // }}

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
