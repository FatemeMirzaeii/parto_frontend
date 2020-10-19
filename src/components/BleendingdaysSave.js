import React from 'react';
import { StyleSheet } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { TouchableOpacity, Text } from 'react-native';
import { COLOR, FONT } from '../styles/static';

const BleendingdaysSave = ({ addAppTourTarget, onPress }) => {
  return (
    <TouchableOpacity
      key={'redDaysSave'}
      title={'redDaysSave'}
      onPress={onPress}
      style={styles.bottomButton}
      ref={(ref) => {
        if (!ref) return;
        redDaysSave = ref;
        let props = {
          order: 12,
          title: 'ویرایش روزهای خونریزی',
          description: 'We have the best targets, believe me',
          outerCircleColor: COLOR.btn,
          outerCircleAlpha: 0.9,
          targetRadius: 80,
          fontFamily: FONT.regular,
        };
        addAppTourTarget &&
          addAppTourTarget(AppTourView.for(ref, { ...props }));
      }}>
      <Text style={styles.buttonTitle}>ویرایش روزهای خونریزی</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomButton: {
    position: 'absolute',
    marginBottom: 15,
    bottom: 50,
    left: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: 150,
    height: 25,
    borderRadius: 50,
    backgroundColor: COLOR.btn,
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

export default BleendingdaysSave;
