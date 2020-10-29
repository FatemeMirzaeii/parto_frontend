import React from 'react';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';

const PlusButton = (props) => {
  return (
    <Icon
      {...props}
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
      raised
      name="plus"
      type="octicon"
      color={COLOR.btn}
      size={25}
      containerStyle={{
        borderColor: '#aaa',
        borderWidth: 0.2,
        bottom: 15,
      }}
    />
  );
};

export default PlusButton;
