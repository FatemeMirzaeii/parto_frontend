import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppTourView } from 'react-native-app-tour';
import { COLOR, FONT } from '../styles/static';
import { SvgXml } from 'react-native-svg';

//constants
import {
  MainTrackingButton,
  PartnerTrackingButton,
  TeenagerTrackingButton,
} from '../constants/health-tracking-svg';

const PlusButton = (props) => {
  const template = useSelector((state) => state.user.template);
  return (
    <>
      <SvgXml
        xml={
          template === 'Main'
            ? MainTrackingButton
            : template === 'Partner'
            ? PartnerTrackingButton
            : template === 'Teenager'
            ? TeenagerTrackingButton
            : null
        }
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
        onPress={() => props.navigation.navigate('TrackingOptions')}
        style={{
          width: 80,
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          bottom: 30,
        }}
      />
      {/* <Text>ثبت پریود</Text> */}
    </>
  );
};

export default PlusButton;
