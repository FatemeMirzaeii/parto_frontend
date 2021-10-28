import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';

const CalendarButton = ({ addAppTourTarget, onPress }) => {
  const template = useSelector((state) => state.user.template);
  return (
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
      color={template === 'Partner' ? COLOR.purple : COLOR.pink}
      containerStyle={styles.calendarIcon}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  calendarIcon: {
    position: 'absolute',
    padding: 5,
    width: 45,
    left: 20,
    borderRadius: 10,
    backgroundColor: COLOR.white,
  },
});

export default CalendarButton;
