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
            order: 12,
            title: 'ماه در یک نگاه',
            description: 'از این‌جا می‌تونی تقویم رو مشاهده کنی',
            descriptionTextSize:15,
            outerCircleColor: COLOR.tiffany,
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
    paddingLeft: 10,
    width: 55,
    marginHorizontal: 10,
  },
});

export default CalendarButton;
