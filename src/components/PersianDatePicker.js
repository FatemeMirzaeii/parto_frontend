import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../app/Functions';
import { Theme } from '../app/Theme';
const { size, fonts } = Theme;

////todo: 1- should return both Gregorian date and jalali.
////      2- should check if month has 31 days or not.

const days = setPickerRange(1, 31);
const years = setPickerRange(1340, 1386);
const months = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

const PersianDatePicker = (props) => {
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1340);
  const [dayIndex, setDayIndex] = useState();
  const [monthIndex, setMonthIndex] = useState();
  const [yearIndex, setYearIndex] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [persianDateString, setPersianDateString] = useState();

  useEffect(() => {
    setInitialDate();
  }, []);
  useEffect(() => {
    onDateSelected();
  });
  const setInitialDate = () => {
    if (props.initialDate) {
      const dateArr = props.initialDate.split('/');
      // if (dateArr.length === 3) {
      setDayIndex(parseInt(dateArr[2]) - 1);
      setMonthIndex(parseInt(dateArr[1]) - 1);
      setYearIndex(parseInt(dateArr[0]) - 1340);
      // }
    }
  };
  const onDateSelected = () => {
    setSelectedDate(`${year}/${month}/${day}`);
    setPersianDateString(
      `${days[dayIndex]}/${months[monthIndex]}/${years[yearIndex]}`,
    );
    if (props.onDateSelected) {
      props.onDateSelected(selectedDate, persianDateString);
    }
  };
  const onDaySelected = (item) => {
    setDayIndex(item);
    setDay(item + 1);
  };
  const onMonthSelected = (item) => {
    setMonthIndex(item);
    setMonth(item + 1);
  };
  const onYearSelected = (item) => {
    setYearIndex(item);
    setYear(item + 1340);
  };
  return (
    <View style={styles.container}>
      <View style={styles.verticalWrapper}>
        <WheelPicker
          data={years}
          selectedItem={yearIndex}
          onItemSelected={onYearSelected}
          isCyclic
          style={styles.picker}
          selectedItemTextSize={20}
          itemTextFontFamily={fonts.regular}
          selectedItemTextFontFamily={fonts.regular}
        />
      </View>
      <View style={styles.verticalWrapper}>
        <WheelPicker
          data={months}
          selectedItem={monthIndex}
          onItemSelected={onMonthSelected}
          isCyclic
          style={styles.picker}
          selectedItemTextSize={20}
          itemTextFontFamily={fonts.regular}
          selectedItemTextFontFamily={fonts.regular}
        />
      </View>
      <View style={styles.verticalWrapper}>
        <WheelPicker
          data={days}
          selectedItem={dayIndex}
          onItemSelected={onDaySelected}
          isCyclic
          style={styles.picker}
          selectedItemTextSize={20}
          itemTextFontFamily={fonts.regular}
          selectedItemTextFontFamily={fonts.regular}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  verticalWrapper: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    color: 'black',
  },
  picker: { width: 110, height: 200 },
});
export default PersianDatePicker;
