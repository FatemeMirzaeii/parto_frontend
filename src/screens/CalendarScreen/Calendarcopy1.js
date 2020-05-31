import React, {useEffect, useState} from 'react';
import {Agenda, Calendar, CalendarList} from 'react-native-calendars-persian';
import {Container, Text, Button, Title} from 'native-base';
import {StyleSheet} from 'react-native';
import {Theme} from '../../app/Theme';
const {colors, size, fonts} = Theme;
const testIDs = require('./testIDs');
const moment2 = require('moment-jalaali');
var jalaali = require('jalaali-js');
moment2.loadPersian({dialect: 'persian-modern'});
const CalendarClass = (props) => {
  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'green'};
  const workout = {key: 'workout', color: 'yellow'};
  const [jalali, setjalali] = useState({jalaali: true, text: 'میلادی'});
  const [state, setState] = useState({
    items: [],
    markedDates: {
      '2020-03-28': {
        startingDay: true,
        customStyles: {
          container: {
            // backgroundColor: 'green',
            top: 10,
            startingDay: true,
          },
          text: {
            color: 'red',
            fontWeight: 'bold',
            marginTop: -5,
          },
        },
      },
      '2020-03-29': {
        customStyles: {
          container: {
            backgroundColor: 'pink',
            elevation: 2,
            top: 10,
          },
          text: {
            marginTop: -5,
            color: 'white',
          },
        },
      },
    },
  });
  useEffect(() => {
    GetTimeNow();
  });
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
    var that = this;
    var month1 = new Date().getMonth() + 1;
    var Persian = jalaali.toJalaali(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
    );
    var month = this.checkSwitch(Persian.jm);
    await that.promisedSetState({
      thisDay: Persian.jd,
      thisMonth: month,
      thisYear: Persian.jy,
    });

    MildaiTime = new Date().toISOString().slice(0, 10);
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 185; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!state.items[strTime]) {
          state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(state.items).forEach((key) => {
        newItems[key] = state.items[key];
      });
      setState({
        items: newItems,
      });
    }, 1000);
  };
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  // onDayPress = (day) => {
  //     this.setState({ selected: day.dateString });
  // }
  return (
    <Container>
      <Agenda
        style={styles.calendar}
        hideExtraDays
        current={'2020-03-01'}
        minDate={'2020-03-01'}
        markingType={'custom'}
        theme={{
          calendarBackground: '#F7EDFF',
          textSectionTitleColor: '#1E1B21',
          todayTextColor: 'white',
          selectedDayTextColor: 'white',
          monthTextColor: '#1E1B21',
          indicatorColor: 'white',
          selectedDayBackgroundColor: '#FFF9C4',
          elevation: 6,
          arrowColor: 'white',
          textDisabledColor: '#003366',
          'stylesheet.calendar.header': {
            week: {
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          },
        }}
        markedDates={{
          '2020-03-01': {
            customStyles: {
              container: {
                startingDay: true,
                elevation: 2,
              },
              text: {
                color: 'red',
              },
            },
          },
          '2020-03-08': {
            selected: true,
          },
          '2020-03-09': {
            customStyles: {
              container: {
                backgroundColor: 'red',
                elevation: 4,
              },
              text: {
                color: 'white',
              },
            },
          },
          '2020-03-14': {
            customStyles: {
              container: {
                backgroundColor: 'green',
              },
              text: {
                color: 'white',
              },
            },
          },

          '2020-03-15': {
            customStyles: {
              container: {
                backgroundColor: 'black',
                elevation: 2,
              },
              text: {
                color: 'yellow',
              },
            },
          },
          '2020-03-19': {
            customStyles: {
              container: {
                startingDay: true,
                elevation: 2,
              },
              text: {
                color: 'red',
              },
            },
          },
          '2020-03-21': {
            disabled: true,
          },
          '2020-03-28': {
            customStyles: {
              text: {
                color: 'black',
                fontWeight: 'bold',
              },
            },
          },
          '2020-03-25': {
            customStyles: {
              container: {
                backgroundColor: '#F7DDA3',
                elevation: 4,
                borderColor: '#FF9966',
                borderWidth: 5,
                borderRadius: 0,
              },
              text: {
                marginTop: 3,
                fontSize: 11,
                color: 'black',
              },
            },
          },
          '2020-03-30': {
            customStyles: {
              container: {
                backgroundColor: 'pink',
                elevation: 4,
                borderColor: 'purple',
                borderWidth: 5,
              },
              text: {
                marginTop: 3,
                fontSize: 11,
                color: 'black',
              },
            },
          },
          '2020-03-31': {
            customStyles: {
              container: {
                backgroundColor: '#FF33CC',
                borderRadius: 0,
              },
            },
          },
        }}
      />
    </Container>
  );
};
export default CalendarClass;
const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
});
