import React, { useState, useEffect } from 'react';
import { SafeAreaView, ImageBackground, View, Text } from 'react-native';
import moment from 'moment';
import { Calendar } from 'react-native-jalali-calendars';
import { Button } from 'react-native-elements';
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';
const today = moment();

const StartQuestion2 = ({ route, navigation }) => {
  const [lastPeriodDate, setLastPeriodDate] = useState();
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const onNextPress = () => {
    navigation.navigate('StartQuestion3', {
      ...route.params,
      lastPeriodDate,
    });
  };
  const onForgotPress = () => {
    navigation.navigate('Notice', {
      ...route.params,
      txt:
        'شما میتوانید بعدا تاریختان را ثبت کنید و یا حتی با آغاز دوره ماهانه بعدی کار ثبت اطلاعاتتون رو آغاز کنید.',
      nextPage: 'StartQuestion3',
      lastPeriodDate: null,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/start/1.png')}
        style={styles.bg}>
        <Text style={styles.question}>
          تاریخ شروع آخرین پریود خود را وارد کنید
        </Text>
        <Calendar
          firstDay={6}
          jalali
          enableSwipeMonths
          onDayPress={(day) => {
            setLastPeriodDate(day.dateString);
          }}
          maxDate={today.format('YYYY-MM-DD')}
          disableAllTouchEventsForDisabledDays={true}
          hideExtraDays={true}
          theme={{
            textSectionTitleColor: '#111111',
            calendarBackground: 'transparent',
            selectedDayTextColor: '#ffffff',
            textDisabledColor: COLOR.nextPage,
            textDayFontFamily: FONT.regular,
            textMonthFontFamily: FONT.regular,
            textDayHeaderFontFamily: FONT.regular,
            selectedDayBackgroundColor: COLOR.currentPage,
            textDayHeaderFontSize: 8,
            arrowColor: COLOR.currentPage,
            todayTextColor: COLOR.currentPage,
          }}
          markedDates={{
            [lastPeriodDate]: { selected: true },
          }}
          markingType="multi-period"
          style={styles.calendar}
        />
        <View style={{ top: 250 }}>
          <Button
            title="فراموش کردم"
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
              disabled={!lastPeriodDate}
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

export default StartQuestion2;
