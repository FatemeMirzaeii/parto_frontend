import React from 'react';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLOR, FONT } from '../styles/static';

const PlusButton = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        bottom: 35,
      }}>
      <Icon
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
            outerCircleColor: COLOR.btn,
            outerCircleAlpha: 0.9,
            fontFamily: FONT.regular,
          };
          props.addAppTourTarget &&
            props.addAppTourTarget(AppTourView.for(ref, { ...tprops }));
        }}
        raised
        name="plus"
        type="octicon"
        color={COLOR.btn}
        size={25}
        containerStyle={{
          borderColor: '#aaa',
          borderWidth: 0.2,
        }}
      />
    </TouchableOpacity>
  );
};

export default PlusButton;
