import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppTourView } from 'react-native-app-tour';
import { Icon as IconElement } from 'react-native-elements';
import { COLOR, FONT } from '../styles/static';

const TreatiseIconBox = ({
  addAppTourTarget,
  callPress,
  smsPress,
  helpPress,
}) => {
  return (
    <View style={styles.iconContainer}>
      <IconElement
        key={'goCall'}
        title={'goCall'}
        style={styles.bottomButton}
        ref={(ref) => {
          if (!ref) return;
          const goCall = ref;
          let props = {
            order: 12,
            title: 'تماس با پاسخگوی شرعی',
            description:
              'اساتید خبره احکام بانوان، به صورت 24 ساعته و رایگان آماده پاسخگویی به شما هستن',
            descriptionTextSize: 15,
            outerCircleColor: COLOR.tiffany,
            outerCircleAlpha: 0.99,
            fontFamily: FONT.regular,
          };
          addAppTourTarget &&
            addAppTourTarget(AppTourView.for(ref, { ...props }));
        }}
        reverse
        size={25}
        name="call"
        type="MaterialIcons"
        color={COLOR.btn}
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
              outerCircleColor: COLOR.tiffany,
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
      <IconElement
        key={'goHelp'}
        title={'goHelp'}
        style={styles.bottomButton}
        ref={(ref) => {
          if (!ref) return;
          goHelp = ref;
          let props = {
            order: 11,
            title: 'راهنمای احکام',
            description: 'این‌جا رو حتما بخون',
            descriptionTextSize: 15,
            outerCircleColor: COLOR.tiffany,
            outerCircleAlpha: 0.9,
            fontFamily: FONT.regular,
          };
          addAppTourTarget &&
            addAppTourTarget(AppTourView.for(ref, { ...props }));
        }}
        reverse
        size={25}
        type="MaterialIcons"
        name="help"
        color={COLOR.btn}
        style={{ elevation: 6 }}
        onPress={helpPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    width: '35%',
    //width:'65%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
});

export default TreatiseIconBox;
