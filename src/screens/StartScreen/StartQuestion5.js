import { Button, Icon, Title } from 'native-base';
import React, { useEffect, useState, useContext } from 'react';
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
import Database from '../../components/Database';
import { PROFILE } from '../../constants/TableDataBase';
import { storeData } from '../../app/Functions';
import PersianDatePicker from '../../components/PersianDatePicker';
import { AuthContext } from '../../contexts/AuthContext';
const moment = require('moment');
const { colors, size, fonts } = Theme;
const db = new Database();

let questionArray = [];
let forgetPragnancy = false;

let data = [];
const StartQuestion5 = ({ route, navigation }) => {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const { interview } = useContext(AuthContext);

  const [forgetDate, setforgetDate] = useState(false);
  useEffect(() => {
    questionArray = route.params.questionArray;
    forgetPragnancy = route.params.forgetPragnancy;
    console.log('day: ', questionArray);
  }, [route.params.forgetPragnancy, route.params.questionArray]);
  const setDate = (date, persianDate) => {
    console.log('hi from interview', date);
    if (date) {
      const dateArray = date.split('/');
      setDay(parseInt(dateArray[2]));
      setMonth(parseInt(dateArray[1]));
      setYear(parseInt(dateArray[0]));
    }
  };
  const nextPress = () => {
    let d,
      m,
      y = '';
    if (day < 9) {
      d = '0' + day;
    } else {
      d = day;
    }
    if (month < 9) {
      m = '0' + month;
    } else {
      m = month;
    }

    y = year;
    let _date = (y + m + d).toString();
    questionArray.push({ birthdate: _date });
    console.log('date: ', day + ' ' + month + ' ' + year);
    console.log('day: ', questionArray);
    saveToLocal();
  };
  const saveToLocal = (item) => {
    const today = moment();
    if (item == 'forget') {
      db.rawQuery(
        `INSERT INTO ${PROFILE}
             (pregnant,pregnancy_try,avg_cycle_length,avg_period_length,created_at,last_period_date)
             VALUES(${questionArray[0].pregnant},
                ${questionArray[0].pregnancy_try},
                ${questionArray[2].periodDays},
                ${questionArray[3].periodlength},
                ${today.format('YYYYMMDD')},
                ${questionArray[1].periodDate})`,
        [],
        PROFILE,
      ).then((res) => {
        goToHome();
      });
    } else {
      db.rawQuery(
        `INSERT INTO ${PROFILE}
             (pregnant,pregnancy_try,avg_cycle_length,avg_period_length,birthdate,created_at,last_period_date)
             VALUES(${questionArray[0].pregnant},
                ${questionArray[0].pregnancy_try},
                ${questionArray[2].periodDays},
                ${questionArray[3].periodlength},
                ${questionArray[5].birthdate.toString()},
                ${today.format('YYYYMMDD')},
                ${questionArray[1].periodDate})`,
        [],
        PROFILE,
      ).then((res) => {
        goToHome();
      });
    }
  };
  function nextStep() {
    saveToLocal('forget');
  }
  const goToHome = async () => {
    await storeData('@startPages', 'true');
    interview();
  };
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
                    backgroundColor: colors.currentPage,
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
                  لطفا با وارد کردن تاریخ تولدت به ما در
                </Text>
                <Text style={styles.textStyle1}>
                  بالا بردن دقت تحلیل ها کمک کن
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
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <PersianDatePicker onDateSelected={setDate} />
            </View>
          </View>
          <View style={{ flex: 1.5, justifyContent: 'flex-end' }}>
            <View
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '90%',
                  backgroundColor: '#FFFBD8',
                  borderRadius: 20,
                }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 3 }}></View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        opacity: 0.7,
                        marginHorizontal: 10,
                        fontFamily: fonts.medium,
                        fontSize: size[12],
                      }}>
                      توجه !
                    </Text>
                    <Icon
                      name="warning"
                      type="FontAwesome"
                      style={{
                        fontSize: 14,
                        color: '#FFD158',
                      }}></Icon>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1.5,
                  }}>
                  <Text style={styles.textStyle}>
                    دوست عزیز پرتو برای نوجوانان نسخه ی مناسب و جذابی دارد
                  </Text>
                  <Text style={styles.textStyle}>
                    که می توانید آن را دانلود کنید
                  </Text>
                </View>
              </View>
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

export default StartQuestion5;

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
