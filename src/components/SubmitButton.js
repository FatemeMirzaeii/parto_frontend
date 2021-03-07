import React from 'react';
import { StyleSheet } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { TouchableOpacity, Text } from 'react-native';
import { COLOR, FONT } from '../styles/static';

const SubmitButton = ({ addAppTourTarget, onPress }) => {
  return (
    <TouchableOpacity
      key={'submitbtn'}
      title={'submitbtn'}
      onPress={onPress}
      style={styles.bottomWrapper}
      ref={(ref) => {
        if (!ref) {
          return;
        }
        let props = {
          order: 12,
          title: 'ثبت تغییرات روزها',
          description: 'بعد از ویرایش، تغییرات رو ثبت کن',
          descriptionTextSize: 15,
          outerCircleColor: COLOR.purple,
          outerCircleAlpha: 0.9,
          targetRadius: 80,
          fontFamily: FONT.regular,
        };
        addAppTourTarget &&
          addAppTourTarget(AppTourView.for(ref, { ...props }));
      }}>
      <Text style={styles.buttonTitle}>ثبت</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomWrapper: {
    position: 'absolute',
    marginBottom: 95,
    bottom: 25,
    right: 15,
    justifyContent: 'center',
    width: 150,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLOR.pink,
    padding: 20,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  },
  buttonTitle: {
    color: COLOR.white,
    fontFamily: FONT.regular,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SubmitButton;
