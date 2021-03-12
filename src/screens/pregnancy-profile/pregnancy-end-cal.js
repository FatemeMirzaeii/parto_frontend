import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Calendar from '../../components/Calendar';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import styles from './styles';
import PregnancyModule from '../../util/pregnancy';
import CycleModule from '../../util/cycle';
import { endPregnancy, updateUserStatus } from '../../util/database/query';
import {
  fetchInitialCycleData,
  setGoal,
  setPregnancyMode,
} from '../../store/actions/cycle';
import { FORMAT } from '../../constants/cycle';
const today = moment();

const PregnancyEndCalendar = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const save = async () => {
    const p = await PregnancyModule();
    const c = await CycleModule();
    !route.params.type
      ? await endPregnancy(selectedDate)
      : await endPregnancy(null, selectedDate);
    if (route.params.mode) {
      updateUserStatus(0, 1);
      dispatch(setGoal(1));
    } else {
      updateUserStatus(0, 0);
      dispatch(setGoal(0));
    }
    await p.determineNefasDays(selectedDate);
    await c.determineLastPeriodDate();
    dispatch(setPregnancyMode(0));
    dispatch(fetchInitialCycleData());
    navigation.popToTop();
  };

  const determineTitle = () => {
    switch (route.params.type) {
      case 0:
        return 'تاریخ زایمان را وارد کنید.';
      case 1:
        return 'تاریخ سقط را وارد کنید.';
    }
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/main/interview.png')}
      style={styles.bg}>
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: '50%',
        }}>
        <Text style={styles.question}>{determineTitle()}</Text>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true },
          }}
          maxDate={today.format(FORMAT)}
        />
        <Button
          title="ذخیره"
          disabled={!selectedDate}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.nextButton}
          titleStyle={styles.saveTitle}
          type="solid"
          onPress={save}
        />
      </View>
    </ImageBackground>
  );
};
export default PregnancyEndCalendar;
