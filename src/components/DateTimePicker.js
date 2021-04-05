import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { COLOR, FONT } from '../styles/static';
import { setPickerRange } from '../util/func';

const days = setPickerRange(0, 10);
// const hour = [
//   '00',
//   '01',
//   '02',
//   '03',
//   '04',
//   '05',
//   '06',
//   '07',
//   '08',
//   '09',
//   '10',
//   '11',
//   '12',
//   '13',
//   '14',
//   '15',
//   '16',
//   '17',
//   '18',
//   '19',
//   '20',
//   '21',
//   '22',
//   '23',
// ];
const hour = setPickerRange(0, 23);
const min = setPickerRange(0, 59);

const DateTimePicker = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.verticalWrapper}>
        <WheelPicker
          data={hour}
          selectedItem={props.hourSelectedItem}
          onItemSelected={props.onHourSelected}
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
          data={min}
          selectedItem={props.minSelectedItem}
          onItemSelected={props.onMinSelected}
          isCyclic
          style={styles.picker}
          selectedItemTextSize={20}
          itemTextFontFamily={FONT.regular}
          selectedItemTextFontFamily={FONT.regular}
          indicatorColor={COLOR.pink}
        />
      </View>
      {props.isFrequent ? (
        <View style={styles.verticalWrapper}>
          <WheelPicker
            data={['ماهانه', 'هفتگی', 'روزانه']}
            selectedItem={props.daySelectedItem}
            onItemSelected={props.onDaySelected}
            style={styles.picker}
            selectedItemTextSize={20}
            itemTextFontFamily={FONT.regular}
            selectedItemTextFontFamily={FONT.regular}
            indicatorColor={COLOR.pink}
          />
        </View>
      ) : (
        <View style={styles.verticalWrapper}>
          <WheelPicker
            data={days}
            selectedItem={props.daySelectedItem}
            onItemSelected={props.onDaySelected}
            isCyclic
            style={styles.picker}
            selectedItemTextSize={20}
            itemTextFontFamily={FONT.regular}
            selectedItemTextFontFamily={FONT.regular}
            indicatorColor={COLOR.pink}
          />
        </View>
      )}
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
export default DateTimePicker;
