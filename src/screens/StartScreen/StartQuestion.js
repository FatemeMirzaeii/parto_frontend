import { Button, Radio, Title, View } from 'native-base';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Theme, Width, Height } from '../../app/Theme';
import Database from '../../components/Database';

let questionArray = [{ pregnant: 1, pregnancy_try: 0, period: 0 }];
const db = new Database();
const { colors, size, fonts } = Theme;

const StartQuestion = (props) => {
  return (
    <View style={{ backgroundColor: colors.bgColor, flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent></StatusBar>
      <ImageBackground
        //source={require('../../../assets/images/start/pink1.png')}
        style={{
          width: '100%',
          height: Height * 0.27,
        }}>
        <ImageBackground
          source={require('../../../assets/images/start/pink1.png')}
          style={{
            width: (Height * 0.27) / 0.72,
            height: Height * 0.27,
            alignSelf: 'flex-end',
          }}></ImageBackground>
        <Image
          source={require('./../../../assets/images/start/flower.png')}
          style={{ position: 'absolute' }}></Image>
      </ImageBackground>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: Height * 0.16,
        }}>
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: size[14],
            textAlign: 'center',
            opacity: 0.5,
          }}>
          خوش آمدی دوست عزیز
        </Text>
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: size[14],
            textAlign: 'center',
            opacity: 0.5,
            marginTop: 25,
          }}>
          به ما بگو در کدوم یکی از موارد زیر میتونیم به
        </Text>
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: size[14],
            textAlign: 'center',
            opacity: 0.5,
          }}>
          شما کمک کنیم.
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          //backgroundColor: 'red',
          height: Height * 0.32,
          width: Width * 1,
          top: Height * 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.BTNStyle}
          activeOpacity={0.7}
          onPress={() => {
            questionArray.push({ pregnant: 0, pregnancy_try: 1, period: 0 });
            props.navigation.navigate('StartQuestion2', { questionArray });
          }}>
          <Text style={styles.TextBTNStyle}>ثبت دوره</Text>
          <Text style={styles.TextBTNStyle1}>تصمیم به بارداری ندارم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.BTNStyle}
          activeOpacity={0.7}
          onPress={() => {
            questionArray.push({ pregnant: 1, pregnancy_try: 0, period: 0 });
            props.navigation.navigate('StartQuestionpragnent', {
              questionArray,
            });
          }}>
          <Text style={styles.TextBTNStyle}>باردار هستم</Text>
          <Text style={styles.TextBTNStyle1}>میخواهم شرایط م را ثبت کنم</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.BTNStyle}
          activeOpacity={0.7}
          onPress={() => {
            questionArray.push({ pregnant: 0, pregnancy_try: 0, period: 1 });
            props.navigation.navigate('StartQuestion2', {
              questionArray,
            });
          }}>
          <Text style={styles.TextBTNStyle}>تلاش برای بارداری</Text>
          <Text style={styles.TextBTNStyle1}>
            برخی از روزها برایم مهم تر هستند
          </Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require('./../../../assets/images/start/pink2.png')}
        style={{
          width: (Height * 0.2) / 0.4,
          height: Height * 0.2,
          position: 'absolute',
          bottom: 0,
          left: -91,
        }}></ImageBackground>
    </View>
  );
};
export default StartQuestion;
const styles = StyleSheet.create({
  BTNStyle: {
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 40,
    width: Width * 0.9,
    height: Height * 0.094,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextBTNStyle: {
    fontFamily: fonts.medium,
    fontSize: size[14],
    opacity: 0.7,
    marginBottom: 10,
  },
  TextBTNStyle1: { fontFamily: fonts.medium, fontSize: size[14], opacity: 0.5 },
});
