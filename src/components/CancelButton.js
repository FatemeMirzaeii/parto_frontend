import React from 'react';
import { StyleSheet } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { TouchableOpacity, Text } from 'react-native';
import { COLOR, FONT } from '../styles/static';

const CancelButton = ({ addAppTourTarget, onPress }) => {
  return (
    <TouchableOpacity
      key={'cancelbtn'}
      title={'cancelbtn'}
      onPress={onPress}
      style={styles.bottomWrapper}
      ref={(ref) => {
        if (!ref) return;
        const cancelbtn = ref;
        let props = {
          order: 21,
          title: 'انصراف از ویرایش',
          description: 'اگر از ویرایش منصرف شدی، این دکمه رو لمس کن',
          descriptionTextSize: 15,
          outerCircleColor: COLOR.tiffany,
          outerCircleAlpha: 0.99,
          targetRadius: 80,
          fontFamily: FONT.regular,
        };
        addAppTourTarget &&
          addAppTourTarget(AppTourView.for(ref, { ...props }));
      }}>
      <Text style={styles.buttonTitle}>انصراف</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomWrapper: {
    position: 'absolute',
    marginBottom: 15,
    bottom: 25,
    left: 15,
    justifyContent: 'center',
    width: 150,
    height: 30,
    borderRadius: 50,
    padding: 20,
    alignSelf: 'flex-start',
    backgroundColor: COLOR.white,
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
    color: COLOR.pink,
    fontFamily: FONT.regular,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CancelButton;
