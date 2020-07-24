import { Button, Icon, Title } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-jalali-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { Theme } from '../../app/Theme';
const moment = require('moment');
const today = moment();

const { colors, size, fonts } = Theme;
let questionArray = [];

const pregnancyCalendar = (props) => {
  const [type, setType] = useState('');
  useEffect(() => {
    questionArray = props.navigation.state.params.questionArray;
    console.log('day: ', questionArray);
    if (questionArray[1].zygosisDate == 1) setType('zygosisDate');
    if (questionArray[1].childbirthDate == 1) setType('childbirthDate');
    if (questionArray[1].lastPeriodDate == 1) setType('lastPeriodDate');
  }, [props]);

  function dayPress(day) {
    questionArray.splice(2, 1);
    switch (type) {
      case 'zygosisDate':
        questionArray.push({
          periodDate: 0,
          childbirthDate: 0,
          zygosisDate: day.dateString,
        });
        break;
      case 'childbirthDate':
        questionArray.push({
          periodDate: 0,
          childbirthDate: day.dateString,
          zygosisDate: 0,
        });
        break;
      case 'lastPeriodDate':
        questionArray.push({
          periodDate: day.dateString,
          childbirthDate: 0,
          zygosisDate: 0,
        });
        break;
    }
    props.navigation.navigate('StartQuestion5', {
      questionArray,
      forgetPragnancy: true,
    });
  }
  switch (type) {
    case 'zygosisDate':
      return (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#D164A6', '#C2428F', '#780048']}
          style={styles.gradiant}>
          <View style={styles.view}>
            <Text style={styles.txt}>تاریخ لقاح چه زمانی بوده است ؟</Text>
            <View style={{ marginTop: 20 }}>
              <Calendar
                firstDay={6}
                jalali={true}
                maxDate={today.format('YYYY-MM-DD')}
                onDayPress={(day) => {
                  dayPress(day);
                }}
                theme={{
                  selectedDayTextColor: 'white',
                  selectedDayBackgroundColor: 'pink',
                  textDayFontFamily: fonts.regular,
                  textMonthFontFamily: fonts.regular,
                  textDayHeaderFontFamily: fonts.regular,
                }}
                markingType={'multi-period'}
              />
            </View>
          </View>

          <Button
            rounded
            style={styles.btn}
            onPress={() => props.navigation.goBack()}>
            <Icon name="arrowright" type="AntDesign" />
            <Title style={styles.txtbtn}>قبلی</Title>
          </Button>
        </LinearGradient>
      );
    case 'childbirthDate':
      return (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#D164A6', '#C2428F', '#780048']}
          style={styles.gradiant}>
          <View style={styles.view}>
            <Text style={styles.txt}>تاریخ تولد نوزاد چه زمانی است ؟</Text>
            <View style={{ marginTop: 20 }}>
              <Calendar
                firstDay={6}
                jalali={true}
                onDayPress={(day) => {
                  dayPress(day);
                }}
                minDate={today.format('YYYY-MM-DD')}
                theme={{
                  selectedDayTextColor: 'white',
                  selectedDayBackgroundColor: 'pink',
                  textDayFontFamily: fonts.regular,
                  textMonthFontFamily: fonts.regular,
                  textDayHeaderFontFamily: fonts.regular,
                }}
                markingType={'multi-period'}
              />
            </View>
          </View>

          <Button
            rounded
            style={styles.btn}
            onPress={() => props.navigation.goBack()}>
            <Icon name="arrowright" type="AntDesign" />
            <Title style={styles.txtbtn}>قبلی</Title>
          </Button>
        </LinearGradient>
      );
    case 'lastPeriodDate':
      return (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#D164A6', '#C2428F', '#780048']}
          style={styles.gradiant}>
          <View style={styles.view}>
            <Text style={styles.txt}>آخرین بار ، دوره ماهانه تان</Text>
            <Text style={styles.txt}>چه زمانی آغاز شد؟</Text>
            <View style={{ marginTop: 20 }}>
              <Calendar
                firstDay={6}
                jalali={true}
                onDayPress={(day) => {
                  dayPress(day);
                }}
                maxDate={today.format('YYYY-MM-DD')}
                theme={{
                  selectedDayTextColor: 'white',
                  selectedDayBackgroundColor: 'pink',
                  textDayFontFamily: fonts.regular,
                  textMonthFontFamily: fonts.regular,
                  textDayHeaderFontFamily: fonts.regular,
                }}
                markingType={'multi-period'}
              />
            </View>
          </View>

          <Button
            rounded
            style={styles.btn}
            onPress={() => props.navigation.goBack()}>
            <Icon name="arrowright" type="AntDesign" />
            <Title style={styles.txtbtn}>قبلی</Title>
          </Button>
        </LinearGradient>
      );
    default:
      return <View />;
  }
};

export default pregnancyCalendar;

const styles = StyleSheet.create({
  gradiant: {
    flex: 1,
    justifyContent: 'center',
  },
  view: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    height: '60%',
    paddingTop: 20,
    // justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
  },

  wrapperVertical: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    color: 'black',
  },
  OptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontFamily: fonts.regular,
    fontSize: size[15],
  },
  txt2: {
    marginTop: -10,
    color: 'gray',
    marginLeft: 30,
    marginVertical: 5,
    fontFamily: fonts.regular,
    fontSize: size[14],
  },
  btn: {
    marginHorizontal: 20,
    flexDirection: 'row',
    width: '40%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#C2428F',
  },
  txtbtn: {
    marginRight: 20,
    fontFamily: fonts.regular,
  },
});
