import React from 'react';
import { useSelector } from 'react-redux';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';
import analytics from '@react-native-firebase/analytics';

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
          let tprops = {
            order: 11,
            title: 'شرح حال',
            description:
              template === 'Partner'
                ? 'اطلاعات تکمیلی از حال هر روز همسرت اینجا وارد میشه '
                : 'اطلاعات  تکمیلی از حال هر روز رو اینجا در اختیار دستیارت قرار بده ',
            descriptionTextSize: 15,
            outerCircleColor: COLOR.purple,
            outerCircleAlpha: 0.9,
            fontFamily: FONT.regular,
          };
          props.addAppTourTarget &&
            props.addAppTourTarget(AppTourView.for(ref, { ...tprops }));
        }}
        onPress={async () => {
          props.navigation.navigate('TrackingOptions');
          await analytics().logEvent('tracking-option-button-pressed', {
            template: template,
          });
        }}
        name="lady"
        type="parto"
        color={COLOR.pink}
        size={30}
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
