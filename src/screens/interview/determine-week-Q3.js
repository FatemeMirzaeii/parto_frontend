import React, { useEffect } from 'react';
import { TouchableOpacity, ImageBackground, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

//components
import Stepper from '../../components/Stepper';

//styles
import styles from './styles';

const Pregnancy_Q3 = ({ route, navigation }) => {
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const navigateToCal = (type) => {
    navigation.navigate('Pregnancy_Q4', { ...route.params, type });
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/main/choiceScreen.png')}
      style={styles.bg}>
      <View style={{ flex: 1 }} />
      <View style={styles.cont}>
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={styles.mode}
            onPress={() => navigateToCal('lastPeriodDate')}>
            <Text style={styles.btnTitle}>ثبت تاریخ آخرین پریود</Text>
            <Text style={styles.btnSubtitle}>
              اولین روز پریود قبلی‌ام را می‌دانم
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mode}
            onPress={() => navigateToCal('dueDate')}>
            <Text style={styles.btnTitle}>ثبت تاریخ زایمان</Text>
            <Text style={styles.btnSubtitle}>
              پیش‌بینی تاریخ زایمان را می‌دانم
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mode}
            onPress={() => navigateToCal('conceptionDate')}>
            <Text style={styles.btnTitle}>ثبت تاریخ لقاح</Text>
            <Text style={styles.btnSubtitle}>تاریخ لقاح را می‌دانم</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: '5%' }}>
          <Stepper index={2} />
          <Button
            title="قبلی"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.prevButton}
            titleStyle={styles.darkBtnTitle}
            type="solid"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
export default Pregnancy_Q3;
