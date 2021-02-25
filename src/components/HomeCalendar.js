import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { COLOR, FONT, WIDTH } from '../styles/static';

const HomeCalendar = ({ addAppTourTarget }) => {
  return (
    <View
      style={styles.point}
      key={'weeklyCalendar'}
      title={'weeklyCalendar'}
      ref={(ref) => {
        if (!ref) {
          return;
        }
        let targetprops = {
          order: 12,
          title: 'برشی از تقویم',
          description: 'ورق بزن و تاریخ‌های قبلی و بعدی رو ببین',
          descriptionTextSize: 15,
          outerCircleColor: COLOR.tiffany,
          outerCircleAlpha: 0.99,
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

export default HomeCalendar;
