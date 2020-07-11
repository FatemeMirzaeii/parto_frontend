import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../app/Functions';
import { Theme } from '../app/Theme';
import PersianDatePicker from './PersianDatePicker';

const PickerListItem = (props) => {
  const [pickerIsVisible, setPickerVisible] = useState(false);

  const chooseChevron = (isVisible) => {
    return {
      name: isVisible ? 'chevron-down' : 'chevron-left',
      type: 'font-awesome',
    };
  };
  const renderRightTitle = (title) => {
    return !title || title.includes('undefined') ? '' : title;
  };
  const findIndex = (arr, element) => {
    arr.findIndex((e) => {
      e.value === element;
    });
  };
  return (
    <View>
      <ListItem
        title={props.title}
        leftIcon={props.leftIcon}
        bottomDivider
        chevron={chooseChevron(pickerIsVisible)}
        onPress={() => setPickerVisible(!pickerIsVisible)}
        rightTitle={renderRightTitle(`${props.rightTitle}`)}
        titleStyle={styles.listItem}
        rightTitleStyle={[styles.listItem, { width: 100 }]}
      />
      {pickerIsVisible ? (
        <View style={styles.picker}>
          {!props.DatePicker ? (
            <WheelPicker
              selectedItem={props.selectedItem}
              onItemSelected={props.onItemSelected}
              data={
                props.range
                  ? setPickerRange(props.range.min, props.range.max)
                  : props.data
              }
              initPosition={props.initPosition}
              isCyclic={true}
              selectedItemTextSize={20}
              itemTextFontFamily={Theme.fonts.regular}
              selectedItemTextFontFamily={Theme.fonts.regular}
            />
          ) : (
            <PersianDatePicker
              initialDate={props.initialDate}
              onDateSelected={props.onDateSelected}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  picker: { alignItems: 'center' },
  listItem: {
    fontFamily: Theme.fonts.regular,
    fontSize: Theme.size[14],
  },
});
export default PickerListItem;
