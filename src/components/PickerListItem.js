import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { WheelPicker, TimePicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../util/func';
import { FONT, SIZE } from '../styles/static';
import PersianDatePicker from './PersianDatePicker';
//import PersianTimePicker from './PersianTimePicker';
//todo: should add pregnancy picker same as datepicker and remove timepicker

const PickerListItem = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      props.range
        ? setPickerRange(props.range.min, props.range.max)
        : props.data,
    );
  }, []);

  const chooseChevron = (visible) => {
    return {
      name: visible ? 'chevron-down' : 'chevron-left',
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
        chevron={chooseChevron(isVisible)}
        onPress={() => setVisible(!isVisible)}
        rightTitle={
          props.rightTitle
            ? renderRightTitle(props.rightTitle.title, props.rightTitle.suffix)
            : null
        }
        subtitle={props.subtitle}
        titleStyle={styles.listItemText}
        containerStyle={styles.listItem}
        contentContainerStyle={styles.listItemContent}
        rightTitleStyle={[
          styles.listItemText,
          {
            maxWidth: 90,
            textAlign: 'right',
          },
        ]}
      />
      {isVisible ? (
        props.customComponent ? (
          props.customComponent
        ) : (
          <View style={styles.picker}>
            {!props.DatePicker && !props.TimePicker ? (
              <WheelPicker
                selectedItem={data.findIndex((a) => a === props.selectedItem)}
                onItemSelected={onItemSelected}
                data={data}
                initPosition={props.initPosition}
                isCyclic={true}
                selectedItemTextSize={20}
                itemTextFontFamily={FONT.regular}
                selectedItemTextFontFamily={FONT.regular}
              />
            ) : props.DatePicker ? (
              <PersianDatePicker
                initialDate={props.initialDate}
                onDateSelected={props.onDateSelected}
              />
            ) : (
              <TimePicker
                format24
                onTimeSelected={props.onTimeSelected}
                selectedItemTextSize={20}
                itemTextFontFamily={FONT.regular}
                selectedItemTextFontFamily={FONT.regular}
              />
            )}
          </View>
        )
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  picker: { alignItems: 'center' },
  listItemText: {
    fontFamily: FONT.regular,
    fontSize: SIZE[14],
    maxWidth: 200,
  },
  listItem: {
    flexDirection: 'row-reverse',
  },
  listItemContent: {
    alignItems: 'flex-end',
  },
});
export default PickerListItem;
