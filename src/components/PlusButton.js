import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';
import WeekCalendar from './WeekCalendar';

const PlusButton = ({ addAppTourTarget }) => {
  return (
    <Icon
      key={'plusIcon'}
      title={'plusIcon'}
      ref={(ref) => {
        if (!ref) return;
        plusIcon = ref;
        let props = {
          order: 11,
          title: 'ثبت شرح حال روزانه',
          description: 'We have the best targets, believe me',
          outerCircleColor: COLOR.btn,
          outerCircleAlpha: 0.9,
          fontFamily: FONT.regular,
        };
        addAppTourTarget &&
          addAppTourTarget(AppTourView.for(ref, { ...props }));
      }}
      raised
      name="plus"
      type="octicon"
      color={COLOR.btn}
      size={25}
      containerStyle={{
        bottom: 35,
        borderColor: '#aaa',
        borderWidth: 0.2,
      }}
    />
  );
};

const styles = StyleSheet.create({
  calendarIcon: {
    top: -4,
    // zIndex: 10,
    alignItems: 'flex-start',
    // paddingLeft: 20,
    //width: 60,
    marginHorizontal: 22,
    // backgroundColor:'yellow',
    position: 'absolute',
  },
});

export default PlusButton;
