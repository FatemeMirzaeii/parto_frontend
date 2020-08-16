import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import {
  hourTo24Format,
  hourTo12Format,
} from 'react-native-wheel-picker-android/src/Utils';
import { toEnglishNumber, toPersianNum } from '../lib/func';
import { Theme } from '../styles/Theme';
const { size, fonts } = Theme;

const getHoursArray = (format24) => {
  const hours = format24 ? { min: 0, max: 23 } : { min: 1, max: 12 };
  const arr = [];
  for (let i = hours.min; i <= hours.max; i++) {
    arr.push(`۰۰${toPersianNum(i)}`.slice(-2));
  }
  return arr;
};
const getFiveMinutesArray = () => {
  const arr = [];
  arr.push('۰۰');
  arr.push('۰۵');
  for (let i = 10; i < 60; i += 5) {
    arr.push(`${toPersianNum(i)}`);
  }
  return arr;
};
const am = ['AM', 'PM'];

const HOUR = 60;
const minutesCount = 12;

const PersianTimePicker = (props) => {
  const [hours, setHours] = useState([]);
  const [minutes, setMinutes] = useState([]);
  const [selectedHourIndex, setSelectedHourIndex] = useState();
  const [selectedMinuteIndex, setSelectedMinuteIndex] = useState();
  const [selectedAmIndex, setSelectedAmIndex] = useState();
  const [selectedDate, setSelectedDate] = useState();
  useEffect(() => {
    const { initDate, format24 } = props;
    setHours(getHoursArray(format24));
    setMinutes(getFiveMinutesArray());
    setSelectedDate(initDate ? new Date(initDate) : new Date());
    console.log('dateeee', selectedDate);
    const time12format = hourTo12Format(selectedDate.getHours());
    console.log('time12format', time12format);
    const time24format = selectedDate.getHours();
    setSelectedHourIndex(
      props.format24 ? time24format : Number(time12format[0]) - 1,
    );
    setSelectedMinuteIndex(
      Math.round(selectedDate.getMinutes() / (HOUR / minutesCount)),
    );
    setSelectedAmIndex(time12format[1] === 'AM' ? 0 : 1);
  }, [props, selectedDate]);

  const onTimeSelected = (selectedTime) => {
    if (props.onTimeSelected) {
      props.onTimeSelected(selectedTime);
    }
  };
  const onMinuteSelected = (item) => {
    setSelectedMinuteIndex(item);
    selectedDate.setMinutes(toEnglishNumber(minutes[item]));
    onTimeSelected(selectedDate);
  };
  const onHourSelected = (item) => {
    setSelectedHourIndex(item);
    const selectedHour = hours[item];

    if (props.format24) {
      selectedDate.setHours(toEnglishNumber(selectedHour));
    } else {
      const time12format = hourTo12Format(selectedDate.getHours());
      const newTime12Format = `${selectedHour} ${time12format[1]}`;
      const selectedHour24format = hourTo24Format(newTime12Format);
      selectedDate.setHours(selectedHour24format);
    }
    onTimeSelected(selectedDate);
  };
  const onAmSelected = (item) => {
    console.log('Ammmmm', item);
    setSelectedAmIndex(item);
    const time12format = hourTo12Format(selectedDate.getHours());
    const newTime12Format = `${time12format[0]} ${am[item]}`;
    const selectedHour24format = hourTo24Format(newTime12Format);
    selectedDate.setHours(selectedHour24format);
    onTimeSelected(selectedDate);
  };
  return (
    <View style={styles.container}>
      <View style={styles.verticalWrapper}>
        <WheelPicker
          isCyclic
          style={styles.picker}
          // {...this.props}
          data={hours}
          onItemSelected={onHourSelected}
          selectedItem={selectedHourIndex}
          initPosition={selectedHourIndex}
          selectedItemTextSize={20}
          itemTextFontFamily={fonts.regular}
          selectedItemTextFontFamily={fonts.regular}
        />
        <WheelPicker
          style={styles.picker}
          isCyclic
          // {...this.props}
          data={minutes}
          onItemSelected={onMinuteSelected}
          selectedItem={selectedMinuteIndex}
          initPosition={selectedMinuteIndex}
          selectedItemTextSize={20}
          itemTextFontFamily={fonts.regular}
          selectedItemTextFontFamily={fonts.regular}
        />
        {!props.format24 ? (
          <WheelPicker
            style={styles.picker}
            // {...this.props}
            data={am}
            onItemSelected={onAmSelected}
            selectedItem={selectedAmIndex}
            initPosition={selectedAmIndex}
          />
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  verticalWrapper: {
    flexDirection: 'row',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    color: 'black',
  },
  picker: { width: 110, height: 200 },
});
export default PersianTimePicker;
