import React, { useEffect, useState } from 'react';
import { SafeAreaView, ImageBackground, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Calendar from '../../components/Calendar';
import moment from 'moment';
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';
import { FORMAT } from '../../constants/cycle';
import Main from '../../../assets/images/main/interview.png';
import Stepper from '../../components/Stepper';
const today = moment();

const Pregnancy_Q4 = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState();
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const onNextPress = () => {
    navigation.navigate('Q5', {
      ...route.params,
      [route.params.type]: selectedDate,
    });
  };
  const onForgotPress = () => {};
  const determineTitle = () => {
    switch (route.params.type) {
      case 'conceptionDate':
        return 'تاریخ لقاح چه زمانی بوده است؟';
      case 'dueDate':
        return 'تاریخ تولد نوزاد چه زمانی است؟';
      case 'lastPeriodDate':
        return 'آخرین بار دوره ماهانه شما چه زمانی آغاز شد؟';
    }
  };
  return (
    <ImageBackground source={Main} style={styles.bg}>
      <SafeAreaView style={styles.safeAreaView}>
        <Text style={styles.question}>{determineTitle()}</Text>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true },
          }}
          minDate={
            route.params.type === 'dueDate' ? today.format(FORMAT) : null
          }
          maxDate={
            route.params.type !== 'dueDate' ? today.format(FORMAT) : null
          }
        />
        <View>
          <Stepper index={3} />
          <View style={styles.buttons}>
            <Button
              title="بعدی"
              disabled={!selectedDate}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={onNextPress}
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
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Pregnancy_Q4;
