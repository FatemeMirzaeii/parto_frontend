import React from 'react';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';

const PlusButton = ({ addAppTourTarget }) => {
  return (
    <Icon
      key={'plusIcon'}
      title={'plusIcon'}
      ref={(ref) => {
        if (!ref) return;
        plusIcon = ref;
        let props = {
          order: 11,
          title: 'شرح حال من',
          description: 'اطلاعات سلامتت رو این‌جا در اختیار دستیارت قرار بده',
          descriptionTextSize:15,
          outerCircleColor: COLOR.tiffany,
          outerCircleAlpha: 0.99,
          fontFamily: FONT.regular,
        };
        addAppTourTarget &&
          addAppTourTarget(AppTourView.for(ref, { ...props }));
      }}
      raised
      name="plus"
      type="octicon"
      color={COLOR.btn}
      size={25}
      containerStyle={{
        bottom: 35,
        borderColor: '#aaa',
        borderWidth: 0.2,
      }}
    />
  );
};

export default PlusButton;
