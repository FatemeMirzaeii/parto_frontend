import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView, View, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { storeData } from '../../util/func';
import { saveProfileData, savePregnancyData } from '../../util/database/query';
import CycleModule from '../../util/cycle';
import PersianDatePicker from '../../components/PersianDatePicker';
import { AuthContext } from '../../contexts';
import styles from './styles';
import { fetchInitialCycleData } from '../../store/actions/cycle';

const Q5 = ({ route, navigation }) => {
  const {
    mode,
    lastPeriodDate,
    periodLength,
    cycleLength,
    dueDate,
    conceptionDate,
  } = route.params;
  const [birthdate, setBirthdate] = useState();
  const { interview } = useContext(AuthContext);
  const dispatch = useDispatch();
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
  const onNextPress = (bd) => {
    //todo: need to check if save function was successfull or not
    saveProfileData({
      pregnant: mode.pregnant,
      pregnancyTry: mode.pregnancy_try,
      lastPeriodDate,
      periodLength,
      cycleLength,
      birthdate: bd,
    }).then(async (i) => {
      const c = await CycleModule();
      if (lastPeriodDate) {
        c.setFirstPeriod(periodLength, lastPeriodDate);
      } else {
        c.determineLastPeriodDate();
      }
      if (mode.pregnant) {
        savePregnancyData({ dueDate, conceptionDate });
      }
      await storeData('@startPages', 'true');
      interview();
      dispatch(fetchInitialCycleData());
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        source={require('../../../assets/images/start/4.png')}
        style={styles.bg}>
        <Text style={styles.question}>
          با وارد کردن تاریخ تولدت
          {'\n'}
          به ما در تحلیل بهتر اطلاعات کمک کن.
        </Text>
        <View style={styles.picker}>
          <PersianDatePicker onDateSelected={setDate} />
        </View>
        <View>
          <Button
            title="بعدا وارد میکنم"
            titleStyle={styles.darkBtnTitle}
            type="clear"
            onPress={() => onNextPress(null)}
          />
          <View style={styles.buttons}>
            <Button
              title="بعدی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={() => onNextPress(birthdate)}
            />
            <Button
              title="قبلی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.prevButton}
              titleStyle={styles.darkBtnTitle}
              type="solid"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Q5;
