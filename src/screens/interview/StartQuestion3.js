import React, { useState } from 'react';
import {
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Theme } from '../../styles/Theme';
import styles from './Styles';
import { WheelPicker } from 'react-native-wheel-picker-android';
const { colors, fonts } = Theme;
let wheelPickerData = ['۳', '۴', '۵', '۶', '۷', '۸', '۹', '۱۰'];
const toastText =
  'پرتو طول دوره شما را 7 روزه قرار می دهد تا در دوره های بعدی خودتان آن را ثبت کنید تا بتوانیم به پیش بینی دقیق تری از دوره های شما برسیم';

const StartQuestion3 = ({ route, navigation }) => {
  const { mode, lastPeriodDate } = route.params;
  const [selectedItem, setSelectedItem] = useState();

  const nextPress = (periodLength) => {
    navigation.navigate('StartQuestion4', {
      mode,
      lastPeriodDate,
      periodLength,
    });
  };
  function forgetPress() {
    ToastAndroid.show(toastText, ToastAndroid.LONG);
    setTimeout(async () => {
      nextPress(7);
    }, 1500);
  }
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
                <View
                  style={[
                    styles.stepper,
                    { backgroundColor: colors.currentPage },
                  ]}
                />
                <View style={styles.stepper} />
                <View style={styles.stepper} />
              </View>
            </View>
            <View style={styles.v4q2}>
              <View style={styles.v5q2}>
                <Text style={styles.textStyle1}>
                  میانگین روزهای پریود شما چند روز است؟
                </Text>
                <Text style={styles.textStyle2}>( معمولا 4 الی 7 روز)</Text>
              </View>
            </View>
          </View>
          <View style={styles.v6q2}>
            <WheelPicker
              style={{ width: '60%', height: '50%' }}
              isCyclic={true}
              selectedItemTextFontFamily={fonts.regular}
              selectedItemTextSize={21}
              itemTextSize={21}
              itemTextFontFamily={fonts.regular}
              selectedItem={selectedItem}
              data={wheelPickerData}
              onItemSelected={setSelectedItem}
            />
          </View>
          <View style={{ flex: 1.5, justifyContent: 'flex-end' }}>
            <View style={styles.viewforget}>
              <TouchableOpacity
                onPress={() => forgetPress()}
                style={{ padding: 15 }}
                activeOpacity={0.5}>
                <Text style={styles.txtforget}>فراموش کردم</Text>
              </TouchableOpacity>
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
                  style={[styles.btnback, { backgroundColor: colors.btn }]}
                  activeOpacity={0.7}
                  onPress={() => nextPress(selectedItem + 3)}>
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

export default StartQuestion3;
