import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';

const CalendarButton = ({ addAppTourTarget, onPress }) => {
  return (
    <View>
      <Icon
        key={'calendarIcon'}
        title={'calendarIcon'}
        ref={(ref) => {
          if (!ref) return;
          calendarIcon = ref;
          let props = {
            order: 11,
            title: 'تقویم سالانه',
            description: 'We have the best targets, believe me',
            outerCircleColor: COLOR.btn,
            outerCircleAlpha: 0.9,
            targetRadius: 25,
            fontFamily: FONT.regular,
          };
          addAppTourTarget &&
            addAppTourTarget(AppTourView.for(ref, { ...props }));
        }}
        //raised
        name="calendar"
        type="evilicon"
        size={35}
        color={COLOR.black}
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
    paddingLeft: 20,
    width: 60,
    marginHorizontal: 10,
  },
});

export default CalendarButton;
