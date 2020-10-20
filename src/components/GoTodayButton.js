import React from 'react';
import { StyleSheet } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { TouchableOpacity, Text } from 'react-native';
import { COLOR, FONT, SIZE } from '../styles/static';

const GoTodayButton = ({ addAppTourTarget, onPress, editMode }) => {
  return (
    <TouchableOpacity
      key={'goToday'}
      title={'goToday'}
      onPress={onPress}
      style={styles.bottomButton}
      ref={(ref) => {
        if (!ref) return;
        goToday = ref;
        let props = {
          order: 11,
          title: 'برو به امروز',
          description: 'We have the best targets, believe me',
          descriptionTextSize:15,
          outerCircleColor: COLOR.tiffany,
          outerCircleAlpha: 0.9,
          fontFamily: FONT.regular,
        };
        addAppTourTarget &&
          addAppTourTarget(AppTourView.for(ref, { ...props }));
      }}>
      <Text style={styles.buttonTitle}>امروز</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomButton: {
    // position: 'absolute',
    // marginBottom: 15,
    // bottom: 50,
    // right: 15,
    // justifyContent: 'center',
    // alignSelf: 'flex-end',
    // alignItems: 'center',
    // width: 150,
    // height: 25,
    // borderRadius: 50,
    // backgroundColor: COLOR.btn,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    // elevation: 3,
    borderWidth: 0,
    left: 20,
    width: 50,
    height: 30,
    borderRadius: 50,
    backgroundColor: COLOR.btn,
    justifyContent: 'center',
  },
  buttonTitle: {
    // color: COLOR.white,
    // fontFamily: FONT.regular,
    // fontSize: 14,
    // textAlign: 'center',
    color: COLOR.white,
    fontFamily: FONT.bold,
    fontSize: SIZE[14],
    textAlign: 'center',
  },
});

export default GoTodayButton;
