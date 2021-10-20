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
        if (!ref) {
          return;
        }
        let props = {
          order: 12,
          title: 'ویرایش پریود',
          description:
            'اطلاعات یه روز اشتباه وارد شده؟ با لمس این دکمه می‌تونی ویرایش کنی',
          descriptionTextSize: 15,
          outerCircleColor: COLOR.purple,
          outerCircleAlpha: 0.9,
          targetRadius: 80,
          fontFamily: FONT.regular,
        };
        addAppTourTarget &&
          addAppTourTarget(AppTourView.for(ref, { ...props }));
      }}>
      <Text style={styles.buttonTitle}>ویرایش پریود</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // bottomButton: {
  //   position: 'absolute',
  //   marginBottom: 15,
  //   bottom: 50,
  //   left: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignSelf: 'flex-start',
  //   width: 150,
  //   height: 25,
  //   borderRadius: 50,
  //   backgroundColor: COLOR.btn,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowOpacity: 0.27,
  //   shadowRadius: 4.65,
  //   elevation: 3,
  // },
  bottomButton: {
    position: 'absolute',
    marginBottom: 95,
    bottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLOR.pink,
    padding: 20,
  },
  buttonTitle: {
    color: COLOR.white,
    fontFamily: FONT.bold,
    fontSize: 14,
    textAlign: 'center',
    // padding:10
  },
});

export default BleendingdaysSave;
