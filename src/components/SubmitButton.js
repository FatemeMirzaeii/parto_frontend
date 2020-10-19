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
        if (!ref) return;
        submitbtn = ref;
        let props = {
          order: 12,
          title: 'ثبت',
          description: 'We have the best targets, believe me',
          outerCircleColor: COLOR.btn,
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
    // padding: 5,
    // marginLeft: 15,
    // width: 70,
    // justifyContent: 'center',
    // alignItems: 'center',
    // //alignSelf: 'flex-start',
    // borderRadius: 20,
    // backgroundColor: COLOR.btn,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    // elevation: 3,

    position: 'absolute',
    marginBottom: 15,
    bottom: 25,
    right:15,
    justifyContent: 'center',
    width: 150,
    height: 25,
    borderRadius: 50,
    backgroundColor: COLOR.btn,
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
    textAlign:'center',
  },
});

export default SubmitButton;
