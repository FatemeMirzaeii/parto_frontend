import { Icon } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { storeData } from '../../lib/func';
import { saveProfileData } from '../../lib/database/query';
import CycleModule from '../../lib/cycle';
import { COLOR, FONT, SIZE } from '../../styles/static';
import PersianDatePicker from '../../components/PersianDatePicker';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './Styles';

let questionArray = [];
let forgetPragnancy = false;
const c = new CycleModule();
const StartQuestion5 = ({ route, navigation }) => {
  const { mode, lastPeriodDate, periodLength, cycleLength } = route.params;
  const [birthdate, setBirthdate] = useState();
  const { interview } = useContext(AuthContext);

  useEffect(() => {
    console.log('params', route.params);
    forgetPragnancy = route.params.forgetPragnancy;
    console.log('day: ', questionArray);
  }, [route.params]);
  const setDate = (date, persianDate) => {
    console.log('hi from interview', date);
    if (date) {
      setBirthdate(date);
    }
  };
  const onNextPress = () => {
    //todo: need to check if save function was successfull or not
    saveProfileData({
      pregnant: mode.pregnant,
      pregnancyTry: mode.pregnancy_try,
      lastPeriodDate,
      periodLength,
      cycleLength,
      birthdate,
    }).then(async (i) => {
      c.setFirstPeriod(periodLength, lastPeriodDate);
      await storeData('@startPages', 'true');
      interview();
    });
  };

  const onForgetPress = () => {
    //todo: need to check if save function was successfull or not
    saveProfileData({
      pregnant: mode.pregnant,
      pregnancyTry: mode.pregnancy_try,
      lastPeriodDate,
      periodLength,
      cycleLength,
      birthdate: null,
    });
    navigation.navigate('Forgetpage', { questionArray });
  };

  return (
    <View style={styles.container}>
      <View style={styles.parentView}>
        <Image
          source={require('../../../assets/images/start/pink3.png')}
          style={styles.img1q2}
        />
        <View style={styles.v1q2}>
          <View style={{ flex: 1.5 }}>
            <View style={styles.v2q2}>
              <View style={styles.v3q3}>
                <View style={styles.stepper} />
                <View style={styles.stepper} />
                <View style={styles.stepper} />
                <View
                  style={[
                    styles.stepper,
                    { backgroundColor: COLOR.currentPage },
                  ]}
                />
              </View>
            </View>
            <View style={styles.v4q2}>
              <View style={styles.v5q2}>
                <Text style={styles.textStyle1}>
                  لطفا با وارد کردن تاریخ تولدت به ما در
                </Text>
                <Text style={styles.textStyle1}>
                  بالا بردن دقت تحلیل ها کمک کن
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.v6q2}>
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
          <View style={{ flex: 2, justifyContent: 'flex-end' }}>
            <View style={styles.viewforget}>
              <TouchableOpacity
                onPress={() => onForgetPress()}
                style={{ padding: 15 }}
                activeOpacity={0.5}>
                <Text style={styles.txtforget}>بعدا وارد میکنم</Text>
              </TouchableOpacity>
              <View
                style={{
                  height: '100%',
                  width: '90%',
                  backgroundColor: '#FFFBD8',
                  borderRadius: 20,
                }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 3 }} />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: COLOR.textColorDark,
                        marginHorizontal: 10,
                        fontFamily: FONT.medium,
                        fontSize: SIZE[12],
                      }}>
                      توجه !
                    </Text>
                    <Icon
                      name="warning"
                      type="FontAwesome"
                      style={{
                        fontSize: 14,
                        color: '#FFD158',
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1.5,
                  }}>
                  <Text style={styles.textStyle}>
                    دوست عزیز پرتو برای نوجوانان نسخه ی مناسب و جذابی دارد که می
                    توانید آن را دانلود کنید.
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.btnsview}>
              <View style={styles.v4q2}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.btnback}
                  activeOpacity={0.7}>
                  <Text style={styles.txtbtn}>قبلی</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.v4q2}>
                <TouchableOpacity
                  onPress={() => onNextPress()}
                  style={[styles.btnback, { backgroundColor: COLOR.btn }]}
                  activeOpacity={0.7}>
                  <Text style={[styles.txtbtn, { color: 'white' }]}>بعدی</Text>
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
