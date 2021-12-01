import * as React from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import { AppTourView } from 'react-native-app-tour';
import { COLOR, FONT } from '../styles/static';
import { SvgXml } from 'react-native-svg';
import analytics from '@react-native-firebase/analytics';
import jalaali from 'moment-jalaali';

//constants
import {
  MainTrackingButton,
  PartnerTrackingButton,
  TeenagerTrackingButton,
} from '../constants/health-tracking-svg';
//todo: not working why?

const PlusButton = (props) => {
  const template = useSelector((state) => state.user.template);
  const today = jalaali();

  const onPress = async () => {
    if (jalaali(props.date).isBefore(today)) {
      template === 'Partner'
        ? props.navigation.navigate('PartnerTrackingOptions', {
            day: props.date,
          })
        : props.navigation.navigate('TrackingOptions', { day: props.date });
      await analytics().logEvent('app_tracking_option_button_press', {
        template: template,
      });
    } else {
      ToastAndroid.show(
        'امکان ثبت شرح حال برای روزهای آتی وجود ندارد.',
        ToastAndroid.LONG,
      );
    }
  };

  return (
    <View
      {...props}
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
      }}>
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
        onPress={onPress}
        style={styles.plusButton}
      />
      {/* <Text>ثبت پریود</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 20,
    // backgroundColor: 'green',
  },
});

export default PlusButton;
