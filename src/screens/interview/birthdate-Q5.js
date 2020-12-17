import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import PersianDatePicker from '../../components/PersianDatePicker';
import { interview } from '../../store/actions/auth';
import { fetchInitialCycleData } from '../../store/actions/cycle';
import CycleModule from '../../util/cycle';
import { addPregnancy, saveProfileData } from '../../util/database/query';
import styles from './styles';
let counter = 0;

const Q5 = ({ route, navigation }) => {
  const [birthdate, setBirthdate] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const {
    mode,
    lastPeriodDate,
    periodLength,
    cycleLength,
    dueDate,
    conceptionDate,
  } = route.params;
  const modeState = useSelector((state) => state.user.template);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);

  useEffect(() => {
    if (
      birthdate &&
      counter === 0 &&
      modeState === 'main' &&
      Number(birthdate.split('/')[0]) >= 1381
    ) {
      setAlertVisible(true);
    }
  }, [birthdate, modeState]);

  const setDate = (date, persianDate) => {
    console.log('hi from interview', date);
    if (date) {
      setBirthdate(date);
    }
  };

  const onNextPress = (bd) => {
    //todo: need to check if save function was successfull or
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
        addPregnancy({ dueDate, conceptionDate });
      }
      dispatch(interview());
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
          <PersianDatePicker
            onDateSelected={setDate}
            startOfRange={modeState === 'teenager' ? 1381 : 1340}
            endOfRange={1390}
          />
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
      <Modal
        animationType="fade"
        isVisible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
        onBackdropPress={() => setAlertVisible(false)}>
        <View style={styles.modal}>
          <View>
            <Text style={{ ...styles.question, ...styles.modalTxt }}>
              پرتویی جان! مایل هستی از نسخه نوجوان که به طور اختصاصی برای شما
              طراحی شده، استفاده کنی؟
            </Text>
            <View style={styles.buttons}>
              <Button
                title="بله"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.nextButton}
                titleStyle={styles.btnTitle}
                type="solid"
                onPress={() => navigation.navigate('Template')}
              />
              <Button
                title="نه"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.prevButton}
                titleStyle={styles.darkBtnTitle}
                type="solid"
                onPress={() => setAlertVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Q5;
