import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';

// components and utils
import PersianDatePicker from './PersianDatePicker';
import { setPickerRange } from '../util/func';

// styles
import { COLOR, FONT } from '../styles/static';
import globalStyles from '../styles';

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
      name: visible ? 'up' : 'down',
      type: 'parto',
      size: 10,
      color: COLOR.icon,
    };
  };

  const renderRightTitle = (title, suffix) => {
    return !title ||
      (typeof title === 'string' &&
        (title.includes('undefined') || title.includes('null')))
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
        bottomDivider={props.bottomDivider}
        onPress={() => setVisible(!isVisible)}
        containerStyle={globalStyles.listItem}>
        <Icon {...props.leftIcon} />
        <ListItem.Content style={globalStyles.listItemContentContainer}>
          <ListItem.Title style={globalStyles.listItemTitle}>
            {props.title}
          </ListItem.Title>
          <ListItem.Subtitle style={globalStyles.subTitle}>
            {props.subtitle}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title
            right
            style={[
              globalStyles.listItemTitle,
              {
                maxWidth: 90,
                textAlign: 'right',
              },
            ]}>
            {props.rightTitle
              ? renderRightTitle(
                  props.rightTitle.title,
                  props.rightTitle.suffix,
                )
              : null}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron {...chooseChevron(isVisible)} />
      </ListItem>
      {isVisible ? (
        props.customComponent ? (
          props.customComponent
        ) : (
          <View style={styles.picker}>
            {!props.DatePicker ? (
              <WheelPicker
                selectedItem={
                  props.selectedItem
                    ? data.findIndex((a) => a === props.selectedItem.toString())
                    : 0
                }
                onItemSelected={onItemSelected}
                data={data}
                initPosition={props.initPosition}
                isCyclic={true}
                selectedItemTextSize={20}
                itemTextFontFamily={FONT.regular}
                selectedItemTextFontFamily={FONT.regular}
                indicatorColor={COLOR.pink}
              />
            ) : (
              <PersianDatePicker
                initialDate={props.initialDate}
                onDateSelected={props.onDateSelected}
                startOfRange={props.startOfRange}
                endOfRange={props.endOfRange}
              />
            )}
          </View>
        )
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  picker: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
export default PickerListItem;
