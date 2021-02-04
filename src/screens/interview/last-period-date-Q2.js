import React, { useState, useEffect } from 'react';
import { SafeAreaView, ImageBackground, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';

//components
import Calendar from '../../components/Calendar';
import Stepper from '../../components/Stepper';
import { FORMAT } from '../../constants/cycle';

//styles and images
import Main from '../../../assets/images/main/interview.png';
import Teenager from '../../../assets/images/teenager/interview.png';
import styles from './styles';

const today = moment();

const Q2 = ({ route, navigation }) => {
  const [lastPeriodDate, setLastPeriodDate] = useState();
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const onNextPress = () => {
    navigation.navigate('Q3', {
      ...route.params,
      lastPeriodDate,
    });
  };
  const onForgotPress = () => {
    navigation.navigate('Notice', {
      ...route.params,
      txt:
        'نگران نباش!\nبا پرتو میتونی بعدا اطلاعات گذشته و دوره‌های جدیدت رو وارد تقویم کنی.',
      nextPage: 'Q3',
      lastPeriodDate: null,
    });
  };
  return (
    <ImageBackground
      source={route.params.template === 'Main' ? Main : Teenager}
      style={styles.bg}>
      <SafeAreaView style={styles.safeAreaView}>
        <Text style={styles.question}>آخرین پریودت چه روزی شروع شد؟</Text>
        <Text style={styles.subtext}>لطفا روی تقویم مشخص کن.</Text>
        <Calendar
          onDayPress={(day) => {
            setLastPeriodDate(day.dateString);
          }}
          maxDate={today.format(FORMAT)}
          markedDates={{
            [lastPeriodDate]: { selected: true },
          }}
          style={styles.calendar}
        />
        <View style={{ flex: 1 }}>
          <Button
            title="فراموش کردم"
            titleStyle={styles.darkBtnTitle}
            type="clear"
            onPress={onForgotPress}
          />
          <Stepper foursome index={1} />
          <View style={styles.buttons}>
            <Button
              title="بعدی"
              disabled={!lastPeriodDate}
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              onPress={onNextPress}
            />
            <Button
              title="قبلی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.prevButton}
              titleStyle={styles.darkBtnTitle}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Q2;
