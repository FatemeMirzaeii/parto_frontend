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
import { toPersianNum } from '../../app/Functions';
import { WheelPicker } from 'react-native-wheel-picker-android';
const moment = require('moment');
const { colors, size, fonts } = Theme;
let questionArray = [];
const today = moment();
let data = [];
const toastText =
  'پرتو فاصله میان دوره های شما را 28 روزه قرار می دهد تا در دوره های بعدی خودتان آن را ثبت کنید تا بتوانیم به پیش بینی دقیق تری از دوره های شما برسیم';

const dataSet = () => {
  for (let i = 15; i < 100; i++) data.push(toPersianNum(i));
};
dataSet();
const StartQuestion4 = ({ route, navigation }) => {
  const [state, setState] = useState({
    items: [1],
    selectedItem: 0,
  });

  useEffect(() => {
    questionArray = route.params.questionArray;
    console.log('day: ', questionArray);
  }, [route.params.questionArray]);

  const onItemSelected = (selectedItem) => {
    console.log('selected: ', selectedItem + 15);
    setState({ selectedItem });
  };

  const nextPress = (item) => {
    let foundIndex = questionArray.findIndex((obj) => obj.periodlength);

    if (foundIndex > 0) questionArray.splice(foundIndex, 2);
    questionArray.push({ periodlength: item }, { pregnancyWeek: 0 });
    navigation.navigate('StartQuestion5', { questionArray });
  };
  function forgetPress() {
    ToastAndroid.show(toastText, ToastAndroid.LONG);
    setTimeout(async () => {
      nextPress(28);
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
                    backgroundColor: colors.nextPage,
                    borderRadius: 50,
                  }}></View>
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
                  میانگین فاصله دوره های تان چند روز است؟
                </Text>
                <Text style={styles.textStyle2}>( معمولا 26 الی 30 روز)</Text>
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
              //style={{ width: 200, height: 200 }}
              isCyclic={true}
              selectedItemTextFontFamily={fonts.regular}
              selectedItemTextSize={21}
              itemTextSize={21}
              itemTextFontFamily={fonts.regular}
              selectedItem={state.selectedItem}
              data={data}
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
              <TouchableOpacity
                onPress={() => forgetPress()}
                style={{ padding: 15 }}
                activeOpacity={0.5}>
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
                  onPress={() => navigation.goBack()}
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
                    قبلی
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
                  onPress={() => nextPress(state.selectedItem + 15)}>
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

export default StartQuestion4;

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
    opacity: 0.5,
  },
  textStyle2: {
    alignSelf: 'center',
    fontSize: size[14],
    fontFamily: fonts.regular,
    marginTop: 10,
    opacity: 0.5,
  },
});
