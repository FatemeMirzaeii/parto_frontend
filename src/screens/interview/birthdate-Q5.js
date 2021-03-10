import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../../assets/images/main/interview.png';
import Teenager from '../../../assets/images/teenager/interview.png';

//components
import PersianDatePicker from '../../components/PersianDatePicker';
import Stepper from '../../components/Stepper';
import DialogBox from '../../components/DialogBox';

//services
import api from '../../services/api';

//store
import { interview } from '../../store/actions/auth';
import { fetchInitialCycleData } from '../../store/actions/cycle';

//util
import CycleModule from '../../util/cycle';
import { addPregnancy, saveProfileData } from '../../util/database/query';
import useModal from '../../util/hooks/useModal';

//style and images
import styles from './styles';

let counter = 0;

const Q5 = ({ route, navigation }) => {
  const [birthdate, setBirthdate] = useState();
  const { isVisible, toggle } = useModal();
  const {
    mode,
    lastPeriodDate,
    periodLength,
    cycleLength,
    dueDate,
    conceptionDate,
  } = route.params;
  const modeState = useSelector((state) => state.user.template);
  const userIdState = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);

  useEffect(() => {
    if (
      birthdate &&
      counter === 0 &&
      modeState === 'Main' &&
      Number(birthdate.split('/')[0]) >= 1381
    ) {
      toggle();
      counter++;
    }
  }, [birthdate, modeState, toggle]);

  const setDate = (date, persianDate) => {
    if (date) {
      setBirthdate(date);
    }
  };

  const setVersionType = async () => {
    const res = await api({
      method: 'POST',
      url: `/user/versionType/${userIdState}/fa`,
      // dev: true,
      data: { type: modeState },
    });
    if (res) {
      dispatch(interview());
    }
  };

  const onNextPress = async (bd) => {
    //todo: need to check if save function was successfull or
    if (userIdState) {
      setVersionType();
    }
    const res = await saveProfileData({
      pregnant: mode.pregnant,
      pregnancy_try: mode.pregnancy_try,
      last_period_date: lastPeriodDate,
      avg_period_length: periodLength,
      avg_cycle_length: cycleLength,
      birthdate: bd,
      userId: userIdState ?? null,
    });
    if (res.insertId) {
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
    }
  };

  console.log('userIdState', userIdState);
  return (
    <>
      <ImageBackground
        source={route.params.template === 'Main' ? Main : Teenager}
        style={styles.bg}>
        <View style={{ flex: 1 }} />
        <View style={styles.safeAreaView}>
          <Text style={styles.question}>
            با وارد کردن تاریخ تولدت
            {'\n'}
            به ما در تحلیل بهتر اطلاعات کمک کن.
          </Text>
          <View style={styles.picker}>
            <PersianDatePicker
              onDateSelected={setDate}
              startOfRange={modeState === 'Teenager' ? 1381 : 1340}
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
            <Stepper foursome={mode.pregnant ? false : true} index={4} />
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
        </View>
      </ImageBackground>
      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        text=" پرتویی جان! مایل هستی از نسخه نوجوان که به طور اختصاصی برای شما
        طراحی شده، استفاده کنی؟"
        twoButtons
        firstBtnPress={() => {
          toggle;
          navigation.navigate('Template');
        }}
        secondBtnPress={toggle}
      />
    </>
  );
};

export default Q5;
