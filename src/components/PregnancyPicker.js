import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../util/func';
import { FONT, WIDTH } from '../styles/static';

const PregnancyPicker = (props) => {
  const [weekIdx, setWeekIdx] = useState();

  useEffect(() => {
    setWeekIdx(props.selectedWeek - 1);
  }, [props.selectedWeek]);

  const onWeekSelected = (i) => {
    setWeekIdx(i);
    props.onWeekSelected(i + 1);
  };
  return (
    <View style={styles.pickerGroup}>
      <WheelPicker
        data={setPickerRange(0, 7)}
        selectedItem={props.selectedDay}
        onItemSelected={props.onWeekDaySelected}
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
        selectedItem={weekIdx}
        onItemSelected={onWeekSelected}
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
