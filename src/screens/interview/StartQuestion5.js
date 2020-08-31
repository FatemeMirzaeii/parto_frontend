import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { storeData } from '../../lib/func';
import { saveProfileData } from '../../lib/database/query';
import CycleModule from '../../lib/cycle';
import PersianDatePicker from '../../components/PersianDatePicker';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles';

const c = new CycleModule();
const StartQuestion5 = ({ route, navigation }) => {
  const { mode, lastPeriodDate, periodLength, cycleLength } = route.params;
  const [birthdate, setBirthdate] = useState();
  const { interview } = useContext(AuthContext);
  // دوست عزیز پرتو برای نوجوانان نسخه ی مناسب و جذابی دارد که می
  // توانید آن را دانلود کنید.

  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);

  const setDate = (date, persianDate) => {
    console.log('hi from interview', date);
    if (date) {
      setBirthdate(date);
    }
  };
  const onNextPress = () => {
    //todo: need to check if save function was successfull or not
    saveProfileData({
      pregnant: mode.pregnant,
      pregnancyTry: mode.pregnancy_try,
      lastPeriodDate,
      periodLength,
      cycleLength,
      birthdate,
    }).then(async (i) => {
      c.setFirstPeriod(periodLength, lastPeriodDate);
      await storeData('@startPages', 'true');
      interview();
    });
  };

  const onForgotPress = () => {
    //todo: need to check if save function was successfull or not
    saveProfileData({
      pregnant: mode.pregnant,
      pregnancyTry: mode.pregnancy_try,
      lastPeriodDate,
      periodLength,
      cycleLength,
      birthdate: null,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/start/4.png')}
        style={styles.bg}>
        <Text style={styles.question}>
          لطفا با وارد کردن تاریخ تولدت {'\n'}به ما در بالا بردن دقت تحلیل ها
          کمک کن.
        </Text>
        <View style={styles.picker}>
          <PersianDatePicker onDateSelected={setDate} />
        </View>
        <View style={{ top: 250 }}>
          <Button
            title="بعدا وارد میکنم"
            titleStyle={styles.darkBtnTitle}
            type="clear"
            onPress={() => onForgotPress()}
          />
          <View style={styles.buttons}>
            <Button
              title="قبلی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.prevButton}
              titleStyle={styles.darkBtnTitle}
              type="solid"
              onPress={() => navigation.goBack()}
            />
            <Button
              title="بعدی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={() => onNextPress()}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default StartQuestion5;
