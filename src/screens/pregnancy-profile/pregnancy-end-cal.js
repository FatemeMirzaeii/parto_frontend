import React, { useEffect, useState } from 'react';
import { ImageBackground, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Calendar } from 'react-native-jalali-calendars';
import moment from 'moment';
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';
import PregnancyModule from '../../util/pregnancy';
import { setPregnancyEnd } from '../../util/database/query';
const today = moment();

const PregnancyEndCalendar = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState();
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const save = async () => {
    await setPregnancyEnd(route.params.type, selectedDate);
    const p = await PregnancyModule();
    p.determineNefasDays();
    navigation.popToTop();
  };

  const determineTitle = () => {
    switch (route.params.type) {
      case 0:
        return 'تاریخ زایمان را وارد کنید.';
      case 1:
        return 'تاریخ سقط را وارد کنید.';
    }
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/start/2.png')}
      style={styles.bg}>
      <Text style={styles.question}>{determineTitle()}</Text>
      <Calendar
        firstDay={6}
        jalali
        enableSwipeMonths
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        maxDate={today.format('YYYY-MM-DD')}
        disableAllTouchEventsForDisabledDays
        hideExtraDays
        theme={{
          textSectionTitleColor: '#111111',
          calendarBackground: 'transparent',
          selectedDayTextColor: '#ffffff',
          textDisabledColor: COLOR.nextPage,
          textDayFontFamily: FONT.regular,
          textMonthFontFamily: FONT.regular,
          textDayHeaderFontFamily: FONT.regular,
          selectedDayBackgroundColor: COLOR.currentPage,
          textDayHeaderFontSize: 8,
          arrowColor: COLOR.currentPage,
          todayTextColor: COLOR.currentPage,
        }}
        markedDates={{
          [selectedDate]: { selected: true },
        }}
        markingType="multi-period"
        style={styles.calendar}
      />
      <Button
        title="ذخیره"
        disabled={!selectedDate}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.nextButton}
        titleStyle={styles.saveTitle}
        type="solid"
        onPress={save}
      />
    </ImageBackground>
  );
};
export default PregnancyEndCalendar;
