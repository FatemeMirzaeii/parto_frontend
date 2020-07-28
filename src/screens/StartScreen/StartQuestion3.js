import { Button, Icon, Title } from 'native-base';
import React, { useEffect, useState } from 'react';
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
import { WheelPicker } from 'react-native-wheel-picker-android';
const moment = require('moment');
const { colors, size, fonts } = Theme;
let questionArray = [];
let wheelPickerData = ['۳', '۴', '۵', '۶', '۷', '۸', '۹', '۱۰'];
const toastText =
  'پرتو طول دوره شما را 7 روزه قرار می دهد تا در دوره های بعدی خودتان آن را ثبت کنید تا بتوانیم به پیش بینی دقیق تری از دوره های شما برسیم';
const today = moment();
const StartQuestion3 = ({ route, navigation }) => {
  const [state, setState] = useState({
    selectedItem: 0,
  });

  useEffect(() => {
    questionArray = route.params.questionArray;
    console.log('day: ', questionArray);
  }, [route.params.questionArray]);

  const onItemSelected = (selectedItem) => {
    console.log('selected: ', selectedItem + 3);
    setState({ selectedItem });
  };

  const nextPress = (item) => {
    let foundIndex = questionArray.findIndex((obj) => obj.periodDays);

    if (foundIndex > 0) questionArray.splice(foundIndex, 1);

    questionArray.push({ periodDays: item });
    navigation.navigate('StartQuestion4', { questionArray });
  };
  function forgetPress() {
    ToastAndroid.show(toastText, ToastAndroid.LONG);
    setTimeout(async () => {
      nextPress(7);
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
                  میانگین روزهای پریود شما چند روز است؟
                </Text>
                <Text style={styles.textStyle2}>( معمولا 4 الی 7 روز)</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 2.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <WheelPicker
              style={{ width: '60%', height: '50%' }}
              //backgroundColor="red"
              isCyclic={true}
              selectedItemTextFontFamily={fonts.regular}
              selectedItemTextSize={21}
              itemTextSize={21}
              itemTextFontFamily={fonts.regular}
              selectedItem={state.selectedItem}
              data={wheelPickerData}
              onItemSelected={onItemSelected}
            />
          </View>
          <View style={{ flex: 1.5, justifyContent: 'flex-end' }}>
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
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('StartQuestion4', {
                      questionArray: questionArray,
                    })
                  }>
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

export default StartQuestion3;

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
  textStyle2: {
    alignSelf: 'center',
    fontSize: size[14],
    fontFamily: fonts.regular,
    marginTop: 10,
    opacity: 0.5,
  },
});
