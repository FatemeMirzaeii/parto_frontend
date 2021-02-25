import React from 'react';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';

const PlusButton = (props) => {
  return (
    <>
      <Icon
        {...props}
        raised
        key={'plusIcon'}
        title={'plusIcon'}
        ref={(ref) => {
          if (!ref) return;
          let tprops = {
            order: 11,
            title: 'شرح حال من',
            description: 'اطلاعات سلامتت رو این‌جا در اختیار دستیارت قرار بده',
            descriptionTextSize: 15,
            outerCircleColor: COLOR.tiffany,
            outerCircleAlpha: 0.9,
            fontFamily: FONT.regular,
          };
          props.addAppTourTarget &&
            props.addAppTourTarget(AppTourView.for(ref, { ...tprops }));
        }}
        onPress={() => props.navigation.navigate('TrackingOptions')}
        name="lady"
        type="parto"
        color={COLOR.pink}
        size={35}
        containerStyle={{
          borderRadius: 40,
          bottom: 30,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      />
      {/* <Text>ثبت پریود</Text> */}
    </>
  );
};

export default PlusButton;
