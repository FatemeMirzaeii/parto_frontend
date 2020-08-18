import React, { useState } from 'react';
import {
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLOR, FONT } from '../../styles/static';
import styles from './Styles';
import { setPickerRange } from '../../lib/func';
import { WheelPicker } from 'react-native-wheel-picker-android';
let data = setPickerRange(15, 60);
const toastText =
  'پرتو فاصله میان دوره های شما را 28 روزه قرار می دهد تا در دوره های بعدی خودتان آن را ثبت کنید تا بتوانیم به پیش بینی دقیق تری از دوره های شما برسیم';

const StartQuestion4 = ({ route, navigation }) => {
  const { mode, lastPeriodDate, periodLength } = route.params;
  const [selectedItem, setSelectedItem] = useState(0);

  const nextPress = (cycleLength) => {
    navigation.navigate('StartQuestion5', {
      mode,
      lastPeriodDate,
      periodLength,
      cycleLength,
    });
  };
  function forgetPress() {
    ToastAndroid.show(toastText, ToastAndroid.LONG);
    setTimeout(async () => {
      nextPress(28);
    }, 2000);
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
                <View style={styles.stepper} />
                <View
                  style={[
                    styles.stepper,
                    { backgroundColor: COLOR.currentPage },
                  ]}
                />
                <View style={styles.stepper} />
              </View>
            </View>
            <View style={styles.v4q2}>
              <View style={styles.v5q2}>
                <Text style={styles.textStyle1}>
                  میانگین فاصله دوره های تان چند روز است؟
                </Text>
                <Text style={styles.textStyle2}>( معمولا 26 الی 30 روز)</Text>
              </View>
            </View>
          </View>
          <View style={styles.v6q2}>
            <WheelPicker
              style={{ width: '60%', height: '50%' }}
              //style={{ width: 200, height: 200 }}
              isCyclic={true}
              selectedItemTextFontFamily={FONT.regular}
              selectedItemTextSize={21}
              itemTextSize={21}
              itemTextFontFamily={FONT.regular}
              selectedItem={selectedItem}
              data={data}
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
                  style={[styles.btnback, { backgroundColor: COLOR.btn }]}
                  activeOpacity={0.7}
                  onPress={() => nextPress(selectedItem + 15)}>
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

export default StartQuestion4;
