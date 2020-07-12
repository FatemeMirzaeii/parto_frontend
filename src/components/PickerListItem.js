import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../app/Functions';
import { Theme } from '../app/Theme';
import PersianDatePicker from './PersianDatePicker';

const PickerListItem = (props) => {
  const [pickerIsVisible, setPickerVisible] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      props.range
        ? setPickerRange(props.range.min, props.range.max)
        : props.data,
    );
  }, []);

  const chooseChevron = (isVisible) => {
    return {
      name: isVisible ? 'chevron-down' : 'chevron-left',
      type: 'font-awesome',
    };
  };

  const renderRightTitle = (title, suffix) => {
    return !title || (typeof title === 'string' && title.includes('undefined'))
      ? ''
      : suffix
      ? title + ' ' + suffix
      : title;
  };

  const onItemSelected = (item) => {
    props.onItemSelected(data[item]);
  };

  return (
    <View>
      <ListItem
        title={props.title}
        leftIcon={props.leftIcon}
        bottomDivider
        chevron={chooseChevron(pickerIsVisible)}
        onPress={() => setPickerVisible(!pickerIsVisible)}
        rightTitle={renderRightTitle(
          props.rightTitle.title,
          props.rightTitle.suffix,
        )}
        titleStyle={styles.listItem}
        rightTitleStyle={[styles.listItem, { width: 90, textAlign: 'right' }]}
      />
      {pickerIsVisible ? (
        <View style={styles.picker}>
          {!props.DatePicker ? (
            <WheelPicker
              selectedItem={data.findIndex((a) => a === props.selectedItem)}
              onItemSelected={onItemSelected}
              data={data}
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
    width: 200,
  },
});
export default PickerListItem;
