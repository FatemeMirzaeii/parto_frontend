import { Footer, Icon, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toPersianNum } from '../../app/Functions';
import Database from '../../components/Database';
// import TopAgenda from '../../components/TopAgenda';
import WeekCalendar from '../../components/WeekCalendar';
import styles from './Styles';
const moment2 = require('moment-jalaali');
var jalaali = require('jalaali-js');
moment2.loadPersian({ dialect: 'persian-modern' });
const Home = (props) => {
  const [state, setState] = useState({
    items: [],
    thisDay: '',
    thisMonth: '',
    thisYear: '',
    today: '',
  });
  // const [weekDay, setweekDay] = useState([
  //   'شنبه',
  //   'یک‌شنبه',
  //   'دوشنبه',
  //   'سه‌شنبه',
  //   'چهارشنبه',
  //   'پنج‌شنبه',
  //   'جمعه',
  // ]);
  useEffect(() => {
    GetTimeNow();
  }, [state.thisDay]);
  useEffect;
  const checkSwitch = (param) => {
    switch (param) {
      case 1:
        return 'فروردین';
      case 2:
        return 'اردیبهشت';
      case 3:
        return 'خرداد';
      case 4:
        return 'تیر';
      case 5:
        return 'مرداد';
      case 6:
        return 'شهریور';
      case 7:
        return 'مهر';
      case 8:
        return 'آبان';
      case 9:
        return 'آذر';
      case 10:
        return 'دی';
      case 11:
        return 'بهمن';
      case 12:
        return 'اسفند';
    }
  };
  const GetTimeNow = async () => {
    const Persian = jalaali.toJalaali(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
    );
    const month = checkSwitch(Persian.jm);
    setState({
      thisDay: Persian.jd,
      thisMonth: month,
      thisYear: Persian.jy,
      today: toPersianNum(Persian.jd) + ' ' + month,
    });
  };

  var db = new Database();
  useEffect(() => {
    db.rawQuery('select * from user_profile;').then((b) => { });
  });
  return (
    <ImageBackground
      source={require('../../../assets/images/bg7.png')}
      style={styles.sky}>
      {/* <WeekCalendar
        onDateChanged={(day, propUpdate) => {
          if (propUpdate === 'dayPress') {
            props.navigation.navigate('Calendar');
          }
        }}
      /> */}
      <ImageBackground
        source={require('../../../assets/images/moon7.png')}
        style={styles.moon}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        {/*
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: size[15],
            color: '#121C3D',
            marginTop: Height / 14,
            alignSelf: 'center',
          }}>
          {toPersianNum(state.thisDay)} {state.thisMonth}{' '}
          {toPersianNum(state.thisYear)}
        </Text>
        <FlatList
          horizontal={true}
          data={weekDay}
          style={{alignSelf: 'center', marginTop: 10}}
          renderItem={({item}) => (
            <Text
              style={{
                marginHorizontal: Width / 50,
                fontFamily: fonts.regular,
                fontSize: size[12],
                height: size[50],
                color: '#121C3D',
              }}>
              {item}
            </Text>
          )}
        />
         <TopAgenda onDayPress={() => props.navigation.navigate('Calendar')} /> */}
        <View style={styles.moonText}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('TrackingOptions', {
                date:
                  new Date().getFullYear() +
                  '-' +
                  new Date().getMonth() +
                  '-' +
                  new Date().getDate(),
              })
            }>
            <Text style={styles.text}>{toPersianNum(2)} روز</Text>
            <Text style={styles.text}>تا پریود بعدی</Text>
            <Text style={styles.text}>{state.today}</Text>
            <Text style={styles.text}>{/* احتمال بالای باروری  */}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Footer style={styles.footer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Calendar')}
          style={styles.tab}>
          <Icon name="calendar" type="AntDesign" style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor: '#FCF3CA',
              borderRadius: 150,
            },
          ]}>
          <Icon name="home" type="AntDesign" style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Charts')}
          style={styles.tab}>
          <Icon name="linechart" type="AntDesign" style={styles.tabIcon} />
        </TouchableOpacity>
      </Footer>
    </ImageBackground>
  );
};
export default Home;
