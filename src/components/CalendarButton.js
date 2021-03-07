import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';

const CalendarButton = ({ addAppTourTarget, onPress }) => {
  const template = useSelector((state) => state.user.template);
  return (
    <View>
      <Icon
        key={'calendarIcon'}
        title={'calendarIcon'}
        ref={(ref) => {
          if (!ref) {
            return;
          }
          let props = {
            order: 13,
            title: 'تقویم پرتو',
            description:
              template === 'Partner'
                ? 'تقویم پریود همسرت اینجاست!در تقویم پریود میتونی همه ی اطلاعات پریود همسرت رو ببینی'
                : 'تقویم پریودت اینجاست ! در تقویم میتونی همه اطلاعات پریودت رو ببینی',
            descriptionTextSize: 15,
            outerCircleColor: COLOR.purple,
            outerCircleAlpha: 0.9,
            targetRadius: 25,
            fontFamily: FONT.regular,
          };
          addAppTourTarget &&
            addAppTourTarget(AppTourView.for(ref, { ...props }));
        }}
        name="calendar"
        type="parto"
        size={30}
        color={COLOR.white}
        containerStyle={styles.calendarIcon}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarIcon: {
    top: 40,
    zIndex: 10,
    alignItems: 'flex-start',
    paddingLeft: 10,
    width: 55,
    marginHorizontal: 10,
  },
});

export default CalendarButton;
