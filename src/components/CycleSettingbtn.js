import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { COLOR, FONT, SIZE } from '../styles/static';

const CycleSettingbtn = ({ addAppTourTarget, onPress }) => {
  return (
    <TouchableOpacity
      key={'settingbtn'}
      title={'settingbtn'}
      onPress={onPress}
      style={styles.smallHeaderBtn}
      ref={(ref) => {
        if (!ref) {
          return;
        }
        let props = {
          order: 11,
          title: 'ثبت تغییرات دوره‌ها',
          description:
            'از لیست زیر هر موردی که خواستی رو تغییر بده و با زدن دکمه تغیرات رو ثبت کن',
          descriptionTextSize: 15,
          outerCircleColor: COLOR.purple,
          outerCircleAlpha: 0.9,
          fontFamily: FONT.regular,
        };
        addAppTourTarget &&
          addAppTourTarget(AppTourView.for(ref, { ...props }));
      }}>
      <Text style={styles.headerBtnTitle}>ثبت</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  smallHeaderBtn: {
    borderWidth: 0,
    left: 20,
    width: 50,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLOR.purple,
    justifyContent: 'center',
  },
  headerBtnTitle: {
    color: COLOR.white,
    fontFamily: FONT.bold,
    fontSize: SIZE[14],
    textAlign: 'center',
  },
});

export default CycleSettingbtn;
