import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { COLOR, FONT, WIDTH } from '../styles/static';

const CalendarPointer = ({ addAppTourTarget }) => {
  return (
    <View
      style={styles.point}
      key={'calendarPointer'}
      title={'calendarPointer'}
      ref={(ref) => {
        if (!ref) {
          return;
        }
        let targetprops = {
          order: 11,
          title: 'تقویم شرح حال',
          description:
            ' با ورق زدن تقویم روز مورد نظرت رو مشخص و علایمی که توی روز داشتی رو از لیست پایین انتخاب کن ',
          descriptionTextSize: 15,
          outerCircleColor: COLOR.purple,
          outerCircleAlpha: 0.9,
          targetRadius: 100,
          fontFamily: FONT.regular,
        };
        addAppTourTarget &&
          addAppTourTarget(AppTourView.for(ref, { ...targetprops }));
      }}
    />
  );
};

const styles = StyleSheet.create({
  point: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    top: 40,
    left: WIDTH * 0.5,
  },
});

export default CalendarPointer;
