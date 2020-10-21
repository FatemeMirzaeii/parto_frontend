import React, { useState, useEffect } from 'react';
import { SafeAreaView, ImageBackground, View, Text } from 'react-native';
import moment from 'moment';
import { Calendar } from 'react-native-jalali-calendars';
import { Button } from 'react-native-elements';
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';
import { FORMAT } from '../../constants/cycle';
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
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        source={require('../../../assets/images/start/1.png')}
        style={styles.bg}>
        <Text style={styles.question}>
          آخرین پریودت چه روزی شروع شد؟
          {'\n'}
          لطفا روی تقویم مشخص کن.
        </Text>
        <Calendar
          firstDay={6}
          jalali
          enableSwipeMonths
          onDayPress={(day) => {
            setLastPeriodDate(day.dateString);
          }}
          maxDate={today.format(FORMAT)}
          disableAllTouchEventsForDisabledDays
          hideExtraDays
          theme={{
            textSectionTitleColor: COLOR.black,
            calendarBackground: 'transparent',
            selectedDayTextColor: COLOR.white,
            textDisabledColor: COLOR.textColorDark,
            textDayFontFamily: FONT.medium,
            textMonthFontFamily: FONT.bold,
            textDayHeaderFontFamily: FONT.medium,
            selectedDayBackgroundColor: COLOR.tiffany,
            textDayHeaderFontSize: 8,
            arrowColor: COLOR.tiffany,
            todayTextColor: COLOR.tiffany,
          }}
          markedDates={{
            [lastPeriodDate]: { selected: true },
          }}
          markingType="multi-period"
          style={styles.calendar}
        />
        <View>
          <Button
            title="فراموش کردم"
            titleStyle={styles.darkBtnTitle}
            type="clear"
            onPress={onForgotPress}
          />
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
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Q2;
