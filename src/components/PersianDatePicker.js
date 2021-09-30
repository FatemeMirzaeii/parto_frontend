import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../util/func';
import { COLOR, FONT } from '../styles/static';

////todo: 1- should return both Gregorian date and jalali.
const PersianDatePicker = (props) => {
  const days = setPickerRange(1, 31);
  const days30 = setPickerRange(1, 30);
  const years = setPickerRange(props.startOfRange, props.endOfRange);
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

  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(props.startOfRange);
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
      // date should be persian date in these formats: '1400-07-8' or '1399-12-29'
      const dateArr = props.initialDate.split(/-|\//);
      // if (dateArr.length === 3) {
      setDayIndex(parseInt(dateArr[2]) - 1);
      setMonthIndex(parseInt(dateArr[1]) - 1);
      setYearIndex(parseInt(dateArr[0]) - props.startOfRange);
      // }
    }
  };
  const onDateSelected = () => {
    setSelectedDate(`${year}/${month}/${day}`); //todo: should change slashes(/) to dash(-)
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
    setYear(item + props.startOfRange);
  };
  return (
    <View style={styles.container}>
      <View style={styles.verticalWrapper}>
        <WheelPicker
          data={years}
          selectedItem={yearIndex ?? 30}
          onItemSelected={onYearSelected}
          isCyclic
          style={styles.picker}
          selectedItemTextSize={20}
          itemTextFontFamily={FONT.regular}
          selectedItemTextFontFamily={FONT.regular}
          indicatorColor={COLOR.pink}
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
          itemTextFontFamily={FONT.regular}
          selectedItemTextFontFamily={FONT.regular}
          indicatorColor={COLOR.pink}
        />
      </View>
      <View style={styles.verticalWrapper}>
        <WheelPicker
          data={month > 6 ? days30 : days}
          selectedItem={dayIndex}
          onItemSelected={onDaySelected}
          isCyclic
          style={styles.picker}
          selectedItemTextSize={20}
          itemTextFontFamily={FONT.regular}
          selectedItemTextFontFamily={FONT.regular}
          indicatorColor={COLOR.pink}
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
  picker: { width: 100, height: 200 },
});
export default PersianDatePicker;
