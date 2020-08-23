import React, { useEffect, useState } from 'react';
import { CalendarList } from 'react-native-jalali-calendars';
import moment from 'moment';
import { getUserAllPeriodDays } from '../../lib/database/query';
import { FONT, SIZE, COLOR } from '../../styles/static';

const Calendar = (props) => {
  const [markedDates, setMarkedDates] = useState({});
  useEffect(() => {
    setOvulationDates();
    setPeriodDates();
  }, []);

  const setPeriodDates = async () => {
    const allPeriods = await getUserAllPeriodDays();
    let periodDays = [];
    if (allPeriods.length > 0) {
      periodDays = allPeriods.map((d) => moment(d.date));
    }
    createMarkedDatesObj(periodDays, COLOR.btn);
  };
  const setOvulationDates = () => {
    const ovulationDays = [
      moment('2020-08-29'),
      moment('2020-08-30'),
      moment('2020-08-31'),
      moment('2020-09-01'),
      moment('2020-09-02'),
      moment('2020-09-03'),
      moment('2020-09-04'),
    ];
    createMarkedDatesObj(ovulationDays, COLOR.currentPage);
  };
  const createMarkedDatesObj = (dates, color) => {
    const startingDate = moment.min(dates);
    const endingDate = moment.max(dates);
    dates.forEach((date) => {
      switch (true) {
        case date === startingDate:
          markedDates[date.format('YYYY-MM-DD')] = {
            //for rtl styles we have to replace startingDay and endingDay flag.
            endingDay: true,
            color: color,
          };
          break;
        case date === endingDate:
          markedDates[date.format('YYYY-MM-DD')] = {
            startingDate: true,
            color: color,
          };
          break;
        default:
          markedDates[date.format('YYYY-MM-DD')] = {
            color: color,
          };
      }
    });
    setMarkedDates({ ...markedDates });
    console.log('state', markedDates);
  };
  return (
    <CalendarList
      jalali={true}
      firstDay={6}
      markedDates={markedDates}
      markingType="period"
      onDayPress={(day) =>
        props.navigation.navigate('TrackingOptions', { day: day.dateString })
      }
      theme={{
        textSectionTitleColor: '#35036B',
        todayTextColor: 'white',
        todayBackgroundColor: 'pink',
        selectedDayTextColor: 'white',
        selectedDayBackgroundColor: 'pink',
        textDisabledColor: '#B82162',
        textDayFontFamily: FONT.regular,
        textMonthFontFamily: FONT.regular,
        textDayHeaderFontFamily: FONT.regular,
        textDayHeaderFontSize: SIZE[7],
      }}
    />
  );
};
export default Calendar;
