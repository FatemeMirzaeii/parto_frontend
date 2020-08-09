import React, { useEffect, useState } from 'react';
import {
  Image,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-jalali-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../../app/Theme';
import styles from './Styles';
const moment = require('moment');
const { colors, size, fonts } = Theme;
let questionArray = [];
const toastText =
  'شما میتوانید بعدا تاریختان را ثبت کنید و یا حتی با آغاز دوره ماهانه بعدی کار ثبت اطلاعاتتون رو آغاز کنید';
const today = moment();
const StartQuestion2 = ({ route, navigation }) => {
  const [dayselect, setDayselect] = useState();
  useEffect(() => {
    questionArray = route.params.questionArray;
  }, [route.params]);

  function dayPress(day) {
    setDayselect(day);
  }
  function nextPage() {
    if (dayselect != undefined) {
      let foundIndex = questionArray.findIndex((obj) => obj.periodDate);

      if (foundIndex > 0) questionArray.splice(foundIndex, 1);
      let _day = '',
        _month = '';
      if (dayselect.day < 10) _day = '0' + dayselect.day;
      else _day = dayselect.day;
      if (dayselect.month < 10) _month = '0' + dayselect.month;
      else _month = dayselect.month;

      questionArray.push({
        periodDate:
          dayselect.year.toString() + _month.toString() + _day.toString(),
      });
      navigation.navigate('StartQuestion3', {
        questionArray: questionArray,
      });
    } else ToastAndroid.show('لطفا تاریخی را انتخاب کنید', ToastAndroid.LONG);
  }
  function forgetPress() {
    ToastAndroid.show(toastText, ToastAndroid.LONG);
    setTimeout(async () => {
      questionArray.push({ day: '00', month: '00', year: '00' });
      navigation.navigate('StartQuestion3', { questionArray });
    }, 1500);
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bgColor,
      }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"></StatusBar>
      <View style={styles.viewParent}>
        <Image
          source={require('../../../assets/images/start/pink3.png')}
          style={styles.img1q2}></Image>
        <View style={styles.v1q2}>
          <View style={{ flex: 1.5 }}>
            <View style={styles.v2q2}>
              <View style={styles.v3q3}>
                <View
                  style={[
                    styles.viewtop,
                    { backgroundColor: colors.currentPage },
                  ]}></View>
                <View style={styles.viewtop}></View>
                <View style={styles.viewtop}></View>
                <View style={styles.viewtop}></View>
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
                  dayPress(day);
                }}
                pastScrollRange={12}
                maxDate={today.format('YYYY-MM-DD')}
                theme={{
                  calendarBackground: 'transparent',
                  selectedDayTextColor: 'white',
                  textDisabledColor: colors.nextPage,
                  textDayFontFamily: fonts.regular,
                  textMonthFontFamily: fonts.regular,
                  textDayHeaderFontFamily: fonts.regular,
                  selectedDayBackgroundColor: '#00adf5',
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
                onPress={() => forgetPress()}
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
                  style={[styles.btnback, { backgroundColor: colors.btn }]}
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
