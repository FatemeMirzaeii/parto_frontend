import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import styles from './styles';
import Ptxt from '../../components/Ptxt';

const Interview = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/start/0.png')}
        style={styles.bg}>
        <Ptxt style={styles.question}>
          دوست عزیز پرتو خوش آمدی!
          {'\n'}
          {'\n'}
          {'\n'}
          به ما بگو در کدوم یکی از موارد زیر میتونیم به شما کمک کنیم.
        </Ptxt>
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={styles.mode}
            onPress={() => {
              props.navigation.navigate('StartQuestion2', {
                mode: { pregnant: 0, pregnancy_try: 0, period: 1 },
              });
            }}>
            <Text style={styles.btnTitle}>ثبت دوره</Text>
            <Text style={styles.btnSubtitle}>تصمیم به بارداری ندارم</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mode}
            onPress={() => {
              props.navigation.navigate('StartQuestion2', {
                mode: { pregnant: 0, pregnancy_try: 1, period: 0 },
              });
            }}>
            <Text style={styles.btnTitle}>تلاش برای بارداری</Text>
            <Text style={styles.btnSubtitle}>
              برخی از روزها برایم مهم تر هستند
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mode}
            onPress={() => {
              props.navigation.navigate('StartQuestionpragnent', {
                mode: { pregnant: 1, pregnancy_try: 0, period: 0 },
              });
            }}>
            <Text style={styles.btnTitle}>باردار هستم</Text>
            <Text style={styles.btnSubtitle}>میخواهم شرایطم را ثبت کنم</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Interview;
