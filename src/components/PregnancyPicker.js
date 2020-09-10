import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../util/func';
import { FONT, SIZE, WIDTH, HEIGHT } from '../styles/static';

const PregnancyPicker = ({ props }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      props.range
        ? setPickerRange(props.range.min, props.range.max)
        : props.data,
    );
  }, []);

  return (
    <View style={styles.pickerGroup}>
      <WheelPicker
        data={setPickerRange(0, 7)}
        selectedItem={data.findIndex((a) => a === props.selectedWeekDay)}
        // onItemSelected={setSelectedDay}
        isCyclic={true}
        itemTextSize={21}
        selectedItemTextSize={21}
        itemTextFontFamily={FONT.regular}
        selectedItemTextFontFamily={FONT.regular}
        style={styles.pregnancy_picker}
      />
      <WheelPicker
        data={['روز']}
        itemTextSize={21}
        selectedItemTextSize={21}
        itemTextFontFamily={FONT.regular}
        selectedItemTextFontFamily={FONT.regular}
        style={styles.pregnancy_picker}
      />
      <WheelPicker
        data={setPickerRange(1, 43)}
        selectedItem={data.findIndex((a) => a === props.selectedWeek)}
        // onItemSelected={setSelectedWeek}
        isCyclic={true}
        itemTextSize={21}
        selectedItemTextSize={21}
        itemTextFontFamily={FONT.regular}
        selectedItemTextFontFamily={FONT.regular}
        style={styles.pregnancy_picker}
      />
      <WheelPicker
        data={['هفته']}
        itemTextSize={21}
        selectedItemTextSize={21}
        itemTextFontFamily={FONT.regular}
        selectedItemTextFontFamily={FONT.regular}
        style={styles.pregnancy_picker}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  pickerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  pregnancy_picker: {
    width: WIDTH / 5,
    height: 150,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default PregnancyPicker;
