import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { Icon } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';

const TreatiseIconBox = ({
  addAppTourTarget,
  callPress,
  smsPress,
  helpPress,
}) => {
  return (
    <View style={styles.iconContainer}>
      <Icon
        key={'goCall'}
        title={'goCall'}
        ref={(ref) => {
          if (!ref) {
            return;
          }
          let props = {
            order: 12,
            title: 'تماس با کارشناس',
            description:
              'کارشناس های خبره احکام 24 ساعته منتظرن تا باهاشون تماس بگیری و سوالاتتو بپرسی ',
            descriptionTextSize: 15,
            outerCircleColor: COLOR.purple,
            outerCircleAlpha: 0.9,
            fontFamily: FONT.regular,
          };
          addAppTourTarget &&
            addAppTourTarget(AppTourView.for(ref, { ...props }));
        }}
        reverse
        size={16}
        name="phone"
        type="feather"
        color={COLOR.purple}
        onPress={callPress}
      />
      {/* <IconElement
          key={'goSMS'}
          title={'goSMS'}
          style={styles.bottomButton}
          ref={(ref) => {
            if (!ref) return;
            goSMS = ref;
            let props = {
              order: 12,
              title: 'سامانه پیامکی',
              description: 'We have the best targets, believe me',
              descriptionTextSize:15,
              outerCircleColor: COLOR.purple,
              outerCircleAlpha: 0.9,
              fontFamily: FONT.regular,
            };
            addAppTourTarget &&
              addAppTourTarget(AppTourView.for(ref, { ...props }));
          }}
          reverse
          size={25}
          type="FontAwesome5"
          name="sms"
          color={COLOR.btn}
          onPress={smsPress}
        /> */}
      <Icon
        key={'goHelp'}
        title={'goHelp'}
        ref={(ref) => {
          if (!ref) {
            return;
          }
          let props = {
            order: 11,
            title: 'راهنمای احکام',
            description: 'این قسمت رو حتما بخون !',
            descriptionTextSize: 15,
            outerCircleColor: COLOR.purple,
            outerCircleAlpha: 0.9,
            fontFamily: FONT.regular,
          };
          addAppTourTarget &&
            addAppTourTarget(AppTourView.for(ref, { ...props }));
        }}
        reverse
        size={16}
        type="feather"
        name="help-circle"
        color={COLOR.purple}
        onPress={helpPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
});

export default TreatiseIconBox;
