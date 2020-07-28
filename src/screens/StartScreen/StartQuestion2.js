import { Button, Icon, Title } from 'native-base';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-jalali-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { Theme, Width, Height } from '../../app/Theme';
const moment = require('moment');
const { colors, size, fonts } = Theme;
let questionArray = [];
const toastText =
  'شما میتوانید بعدا تاریختان را ثبت کنید و یا حتی با آغاز دوره ماهانه بعدی کار ثبت اطلاعاتتون رو آغاز کنید';
const today = moment();
const StartQuestion2 = ({ route, navigation }) => {
  useEffect(() => {
    questionArray = route.params.questionArray;

    console.log('day: ', questionArray);
  }, [route.params]);

  function dayPress(day) {
    let foundIndex = questionArray.findIndex((obj) => obj.periodDate);

    if (foundIndex > 0) questionArray.splice(foundIndex, 1);
    console.log('day: ', day.year + day.month + day.day);
    let _day = '',
      _month = '';
    if (day.day < 10) _day = '0' + day.day;
    else _day = day.day;
    if (day.month < 10) _month = '0' + day.month;
    else _month = day.month;

    questionArray.push({
      periodDate: day.year.toString() + _month.toString() + _day.toString(),
    });
    navigation.navigate('StartQuestion3', {
      questionArray: questionArray,
    });
  }
  function forgetPress() {
    ToastAndroid.show(toastText, ToastAndroid.LONG);
    setTimeout(async () => {
      dayPress({ day: '00', month: '00', year: '00' });
    }, 2000);
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgColor,
      }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"></StatusBar>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../assets/images/start/pink3.png')}
          style={{
            width: Width * 1.22,
            height: Height * 0.8,
            position: 'absolute',
          }}></Image>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}>
          <View style={{ flex: 1.5 }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: '30%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: Width * 0.083,
                    height: Height * 0.008,
                    backgroundColor: colors.currentPage,
                    borderRadius: 50,
                    marginHorizontal: 5,
                  }}></View>
                <View
                  style={{
                    width: Width * 0.083,
                    height: Height * 0.008,
                    backgroundColor: colors.nextPage,
                    borderRadius: 50,
                  }}></View>
                <View
                  style={{
                    width: Width * 0.083,
                    height: Height * 0.008,
                    backgroundColor: colors.nextPage,
                    borderRadius: 50,
                    marginHorizontal: 5,
                  }}></View>
                <View
                  style={{
                    width: Width * 0.083,
                    height: Height * 0.008,
                    backgroundColor: colors.nextPage,
                    borderRadius: 50,
                  }}></View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '85%',
                  height: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.textStyle1}>
                  تاریخ شروع آخرین پریود خود را وارد کنید
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 2.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: '95%',
                elevation: 0,
              }}>
              <Calendar
                firstDay={6}
                jalali={true}
                onDayPress={(day) => {
                  dayPress(day);
                }}
                pastScrollRange={12}
                maxDate={today.format('YYYY-MM-DD')}
                theme={{
                  selectedDayTextColor: 'white',
                  selectedDayBackgroundColor: 'pink',
                  textDayFontFamily: fonts.regular,
                  textMonthFontFamily: fonts.regular,
                  textDayHeaderFontFamily: fonts.regular,
                }}
                markingType={'multi-period'}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1.5,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={{ padding: 15 }} activeOpacity={0.5}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: size[17],
                    textDecorationLine: 'underline',
                    opacity: 0.7,
                  }}>
                  فراموش کردم
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1.2,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: '40%',
                    width: '80%',
                    backgroundColor: 'white',
                    borderRadius: 40,
                    elevation: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  activeOpacity={0.7}>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 14 }}>
                    قبل
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: '40%',
                    width: '80%',
                    backgroundColor: colors.btn,
                    borderRadius: 40,
                    elevation: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  activeOpacity={0.7}>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      fontSize: 14,
                      color: 'white',
                    }}>
                    بعدی
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StartQuestion2;

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    fontSize: size[14],
    fontFamily: fonts.medium,
    marginTop: 7,
    opacity: 0.7,
  },
  textStyle1: {
    alignSelf: 'center',
    fontSize: size[17],
    fontFamily: fonts.medium,
    marginTop: 3,
    opacity: 0.7,
  },
});
