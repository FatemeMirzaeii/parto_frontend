import React from 'react';
import { Text } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';
import { useSelector } from 'react-redux';

const PlusButton = (props) => {
  const template = useSelector((state) => state.user.template);
  return (
    <>
      <Icon
        {...props}
        raised
        key={'plusIcon'}
        title={'plusIcon'}
        ref={(ref) => {
          if (!ref) return;
          const plusIcon = ref;
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
        // color={template === 'Partner' ? '#13ffe7' : COLOR.pink}
        color={COLOR.pink} 
        size={35}
        containerStyle={{
          borderColor: COLOR.white,
          borderRadius: 40,
          width: 65,
          height: 65,
          borderWidth: 2,
          bottom: 30,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          // left: 20,
        }}
      />
      {/* <Text>ثبت پریود</Text> */}
    </>
  );
};

export default PlusButton;
