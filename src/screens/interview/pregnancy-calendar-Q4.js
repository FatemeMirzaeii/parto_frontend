import React, { useEffect, useState } from 'react';
import { SafeAreaView, ImageBackground, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Calendar } from 'react-native-jalali-calendars';
import moment from 'moment';
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';
import { FORMAT } from '../../constants/cycle';
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
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        source={require('../../../assets/images/start/3.png')}
        style={styles.bg}>
        <Text style={styles.question}>{determineTitle()}</Text>
        <Calendar
          firstDay={6}
          jalali
          enableSwipeMonths
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true },
          }}
          markingType="multi-period"
          style={styles.calendar}
          minDate={
            route.params.type === 'dueDate' ? today.format(FORMAT) : null
          }
          maxDate={
            route.params.type !== 'dueDate' ? today.format(FORMAT) : null
          }
          disableAllTouchEventsForDisabledDays
          hideExtraDays
          theme={{
            textSectionTitleColor: COLOR.black,
            calendarBackground: 'transparent',
            selectedDayTextColor: COLOR.white,
            textDisabledColor: COLOR.textColorDark,
            textDayFontFamily: FONT.regular,
            textMonthFontFamily: FONT.regular,
            textDayHeaderFontFamily: FONT.regular,
            selectedDayBackgroundColor: COLOR.tiffany,
            textDayHeaderFontSize: 8,
            arrowColor: COLOR.tiffany,
            todayTextColor: COLOR.tiffany,
          }}
        />
        <View>
          {/* <Button
            title="فراموش کردم"
            titleStyle={styles.darkBtnTitle}
            type="clear"
            onPress={() => onForgotPress()}
          /> */}
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
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Pregnancy_Q4;
