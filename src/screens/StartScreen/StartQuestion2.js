import { Button, Icon, Title } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { Calendar } from 'react-native-calendars-persian';
import LinearGradient from 'react-native-linear-gradient';
import { Theme } from '../../app/Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { colors, size, fonts } = Theme;
let questionArray = [];
const toastText = 'شما میتوانید بعدا تاریختان را ثبت کنید و یا حتی با آغاز دوره ماهانه بعدی کار ثبت اطلاعاتتون رو آغاز کنید'

const Start2 = (props) => {

  useEffect(() => {
    questionArray = props.navigation.state.params.questionArray

    console.log("day: ", questionArray)
  }, [props]);

  function dayPress(day) {
    let foundIndex = questionArray.findIndex(obj => obj.periodDate)

    if (foundIndex > 0)
      questionArray.splice(foundIndex, 1)
    console.log("day: ", day.year + day.month + day.day)
    let _day = "", _month = ""
    if (day.day < 10) _day = "0" + day.day
    else _day = day.day
    if (day.month < 10) _month = "0" + day.month
    else _month = day.month

    questionArray.push({ periodDate: (day.year).toString() + (_month).toString() + (_day).toString() })
    props.navigation.navigate("StartQuestion3", { questionArray: questionArray })
  }
  function forgetPress() {
    ToastAndroid.show(
      toastText,
      ToastAndroid.LONG,
    );
    setTimeout(async () => { dayPress({ dateString: '0000-00-00' }) }, 2000)
  }

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
            onDayPress={(day) => { dayPress(day) }}
            pastScrollRange={12}
            maxDate={'2020-06-30'}
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
      <TouchableOpacity activeOpacity={0.6}
        onPress={() => forgetPress()}>
        <Text style={{
          marginTop: 5,
          alignSelf: 'center',
          fontFamily: fonts.regular,
          fontSize: size[15],
          color: colors.text1,
          borderBottomWidth: 0.2,
          paddingHorizontal: 10,
          borderBottomColor: 'white',
          color: 'white'
        }}>فراموش کردم</Text>
      </TouchableOpacity>

      <Button
        rounded
        style={styles.btn}
        onPress={() => props.navigation.goBack()}>
        <Icon name="arrowright" type="AntDesign" />
        <Title style={styles.txtbtn}>قبلی</Title>
      </Button>
    </LinearGradient>
  );
};

export default Start2;

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
