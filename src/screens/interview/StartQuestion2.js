import React, { useState } from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-jalali-calendars';
import { COLOR, FONT } from '../../styles/static';
import styles from './Styles';
const moment = require('moment');
const toastText = //todo: toast should turn into a compelete page
  'شما میتوانید بعدا تاریختان را ثبت کنید و یا حتی با آغاز دوره ماهانه بعدی کار ثبت اطلاعاتتون رو آغاز کنید';
const today = moment();
const StartQuestion2 = ({ route, navigation }) => {
  const { mode } = route.params;
  const [lastPeriodDate, setLastPeriodDate] = useState();

  function nextPage() {
    lastPeriodDate
      ? navigation.navigate('StartQuestion3', { mode, lastPeriodDate })
      : ToastAndroid.show('لطفا تاریخی را انتخاب کنید', ToastAndroid.LONG);
  }
  function onForgotPress() {
    ToastAndroid.show(toastText, ToastAndroid.LONG);
    setTimeout(async () => {
      navigation.navigate('StartQuestion3', {
        mode,
        lastPeriodDate: '00-00-00',
      });
    }, 1500);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.parentView}>
        <Image
          source={require('../../../assets/images/start/pink3.png')}
          style={styles.img1q2}
        />
        <View style={styles.v1q2}>
          <View style={{ flex: 1.5 }}>
            <View style={styles.v2q2}>
              <View style={styles.v3q3}>
                <View
                  style={[
                    styles.stepper,
                    { backgroundColor: COLOR.currentPage },
                  ]}
                />
                <View style={styles.stepper} />
                <View style={styles.stepper} />
                <View style={styles.stepper} />
              </View>
            </View>
            <View style={styles.v4q2}>
              <View style={styles.v5q2}>
                <Text style={styles.textq2}>
                  تاریخ شروع آخرین پریود خود را وارد کنید
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.v6q2}>
            <View style={styles.v7q2}>
              <Calendar
                firstDay={6}
                jalali={true}
                onDayPress={(day) => {
                  setLastPeriodDate(day.dateString);
                }}
                maxDate={today.format('YYYY-MM-DD')}
                disableAllTouchEventsForDisabledDays={true}
                hideExtraDays={true}
                theme={{
                  calendarBackground: 'transparent',
                  selectedDayTextColor: 'white',
                  textDisabledColor: COLOR.nextPage,
                  textDayFontFamily: FONT.regular,
                  textMonthFontFamily: FONT.regular,
                  textDayHeaderFontFamily: FONT.regular,
                  selectedDayBackgroundColor: COLOR.currentPage,
                  textDayHeaderFontSize: 8,
                }}
                markedDates={{
                  [lastPeriodDate]: { selected: true },
                }}
                markingType="multi-period"
              />
            </View>
          </View>
          <View
            style={{
              flex: 1.5,
              justifyContent: 'flex-end',
            }}>
            <View style={styles.viewforget}>
              <TouchableOpacity
                onPress={() => onForgotPress()}
                style={{ padding: 15 }}
                activeOpacity={0.5}>
                <Text style={styles.txtforget}>فراموش کردم</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnsview}>
              <View style={[styles.viewforget, { flex: 1 }]}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.btnback}
                  activeOpacity={0.7}>
                  <Text style={styles.txtbtn}>قبلی</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.viewforget, { flex: 1 }]}>
                <TouchableOpacity
                  onPress={() => nextPage()}
                  style={[styles.btnback, { backgroundColor: COLOR.btn }]}
                  activeOpacity={0.7}>
                  <Text style={[styles.txtbtn, { color: 'white' }]}>بعدی</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartQuestion2;
