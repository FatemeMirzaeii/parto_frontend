import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  FlatList,
} from 'react-native';
import styles from './styles';

const Interview = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/interview/main/choiceScreen.png')}
        style={styles.bg}>
        <View style={styles.cont}>
          <Text style={styles.question}>
            پرتویی جان سلام!
            {'\n'}
            پرتو چطور میتونه کمکت کنه؟
          </Text>
          <View style={styles.btnGroup}>
            <TouchableOpacity
              style={styles.mode}
              onPress={() => {
                props.navigation.navigate('Q2', {
                  mode: { pregnant: 0, pregnancy_try: 0, period: 1 },
                });
              }}>
              <Text style={styles.btnTitle}>ثبت دوره‌های قاعدگی</Text>
              <Text style={styles.btnSubtitle}>تصمیم به بارداری ندارم</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mode}
              onPress={() => {
                props.navigation.navigate('Q2', {
                  mode: { pregnant: 0, pregnancy_try: 1, period: 0 },
                });
              }}>
              <Text style={styles.btn1Title}>تلاش برای بارداری</Text>
              <Text style={styles.btnSubtitle}>
                برخی از روزها برایم مهم‌تر هستند
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mode}
              onPress={() => {
                props.navigation.navigate('Pregnancy_Q2', {
                  mode: { pregnant: 1, pregnancy_try: 0, period: 0 },
                });
              }}>
              <Text style={styles.btnTitle}>باردار هستم</Text>
              <Text style={styles.btnSubtitle}>می‌خواهم شرایطم را ثبت کنم</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Interview;
