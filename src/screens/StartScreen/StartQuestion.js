import { View } from 'native-base';
import React from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Theme } from '../../app/Theme';
import styles from './Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
let questionArray = [];
const { colors } = Theme;

const StartQuestion = (props) => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.bgColor, flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent></StatusBar>

      <ImageBackground
        source={require('../../../assets/images/start/pink1.png')}
        style={styles.imgbackground1}></ImageBackground>
      <Image
        source={require('./../../../assets/images/start/flower.png')}
        style={{ position: 'absolute' }}></Image>
      <View style={styles.viq1}>
        <Text style={styles.txtTop}>خوش آمدی دوست عزیز</Text>
        <Text style={[styles.txtTop, { marginTop: 25 }]}>
          به ما بگو در کدوم یکی از موارد زیر میتونیم به
        </Text>
        <Text style={styles.txtTop}>شما کمک کنیم.</Text>
      </View>
      <View style={styles.viewbtnsq1}>
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
          <Text style={styles.TextBTNStyle1}>میخواهم شرایطم را ثبت کنم</Text>
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
        style={styles.imgendq1}></ImageBackground>
    </SafeAreaView>
  );
};
export default StartQuestion;
