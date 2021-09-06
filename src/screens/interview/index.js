import React from 'react';
import { TouchableOpacity, ImageBackground, View, Text } from 'react-native';

//styles
import styles from './styles';

const Interview = ({ route, navigation }) => {
  return (
    <ImageBackground
      source={require('../../../assets/images/main/choiceScreen.png')}
      style={styles.bg}>
      <View style={styles.cont}>
        <Text style={styles.question}>
          سلام!
          {'\n'}
          پرتو چطور میتونه کمکت کنه؟
        </Text>
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={styles.mode}
            onPress={() => {
              navigation.navigate('Q2', {
                ...route.params,
                mode: { pregnant: 0, pregnancy_try: 0, period: 1 },
              });
            }}>
            <Text style={styles.btnTitle}>ثبت دوره‌های قاعدگی</Text>
            <Text style={styles.btnSubtitle}>تصمیم به بارداری ندارم</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mode}
            onPress={() => {
              navigation.navigate('Q2', {
                ...route.params,
                mode: { pregnant: 0, pregnancy_try: 1, period: 0 },
              });
            }}>
            <Text style={styles.btnTitle}>تلاش برای بارداری</Text>
            <Text style={styles.btnSubtitle}>
              برخی از روزها برایم مهم‌تر هستند
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mode}
            onPress={() => {
              navigation.navigate('Pregnancy_Q2', {
                ...route.params,
                mode: { pregnant: 1, pregnancy_try: 0, period: 0 },
              });
            }}>
            <Text style={styles.btnTitle}>باردار هستم</Text>
            <Text style={styles.btnSubtitle}>می‌خواهم شرایطم را ثبت کنم</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Interview;
