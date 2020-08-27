import React, { useEffect, useState } from 'react';
import { CalendarList } from 'react-native-jalali-calendars';
import moment from 'moment';
import { getUserAllPeriodDays } from '../../lib/database/query';
import CycleModule from '../../lib/cycle';
import { FONT, SIZE, COLOR } from '../../styles/static';
const c = new CycleModule();
const Calendar = (props) => {
  const [markedDates, setMarkedDates] = useState({});
  useEffect(() => {
    setOvulationDates();
    setPeriodDates();
    setPerdictedDates();
  }, []);

  const setPeriodDates = async () => {
    const allPeriods = await getUserAllPeriodDays();

    let periodDays = [];
    if (allPeriods.length > 0) {
      periodDays = allPeriods.map((d) => moment(d.date));
    }
    createMarkedDatesObj(periodDays, COLOR.btn);
  };
  const setPerdictedDates = () => {
    const perdictions = c
      .perdictedPeriodDaysInCurrentYear()
      .map((d) => moment(d));
    const ov = c.perdictedOvulationDaysInCurrentYear().map((d) => moment(d));

    createMarkedDatesObj(perdictions, COLOR.bgColor);
    createMarkedDatesObj(ov, COLOR.currentPage);
  };
  const setOvulationDates = () => {
    const ovulationDays = c.determineOvulationWindow().map((d) => moment(d));
    createMarkedDatesObj(ovulationDays, COLOR.currentPage);
  };
  const createMarkedDatesObj = (dates, color) => {
    console.log(dates);
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
      maxDate={moment().format('YYYY-MM-DD')}
      pastScrollRange={12}
      futureScrollRange={12}
      markedDates={markedDates}
      markingType="period"
      onDayPress={(day) =>
        props.navigation.navigate('TrackingOptions', { day: day.dateString })
      }
      theme={{
        textSectionTitleColor: '#35036B',
        //todayTextColor: 'white',
        todayBackgroundColor: 'pink',
        //selectedDayTextColor: 'white',
        selectedDayBackgroundColor: 'pink',
        //textDisabledColor: '#B82162',
        textDayFontFamily: FONT.regular,
        textMonthFontFamily: FONT.regular,
        textDayHeaderFontFamily: FONT.regular,
        textDayHeaderFontSize: SIZE[7],
      }}
    />
  );
};
export default Calendar;
