import React from 'react';
import { StyleSheet } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import {TouchableOpacity,Text} from 'react-native'
import { COLOR, FONT } from '../styles/static';

const HeaderCancelButton = ({ addAppTourTarget,onPress }) => {
  return (
    <TouchableOpacity
    key={"cancelbtn"}
    title={"cancelbtn"}
    onPress={onPress}
    style={styles.bottomWrapper}
    ref={(ref) => {
      if (!ref) return;
      cancelbtn= ref;
      let props = {
        order: 11,
        title:"انصراف",
        description: 'We have the best targets, believe me',
        outerCircleColor: COLOR.btn,
        outerCircleAlpha: 0.9,
        targetRadius:80,
        fontFamily: FONT.regular,
      };
      addAppTourTarget &&
        addAppTourTarget(AppTourView.for(ref, { ...props }));
    }}
        >
          <Text style={styles.buttonTitle}>
          بی‌خیال
          </Text>
        </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  bottomWrapper: {
    width:70,
    padding:5,
    marginRight:15,
    justifyContent: 'center',
    alignItems:'center',
    //alignSelf: 'flex-start',
    borderRadius: 20,
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
    color: COLOR.btn,
    fontFamily: FONT.regular,
    fontSize: 14,
    textAlign:'center',
  },
});

export default HeaderCancelButton;
