import { Button, Title } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmoothPicker from 'react-native-smooth-picker';
import { Calendar } from 'react-native-calendars-persian';
import { toPersianNum } from '../../app/Functions';
import { Theme } from '../../app/Theme';

const { colors, size, fonts } = Theme;
let questionArray = [];

const Start2 = (props) => {

  useEffect(() => {
    questionArray = props.navigation.state.params.questionArray

    console.log("day: ", questionArray)
  }, [props]);

  function dayPress(day) {
    let foundIndex = questionArray.findIndex(obj => obj.periodDate)

    if (foundIndex > 0)
      questionArray.splice(foundIndex, 1)

    console.log("daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay: ", day)
    questionArray.push({ periodDate: day })
    props.navigation.navigate("StartQuestion3", { questionArray })

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
      {/* <Button
        rounded
        style={styles.btn}
        onPress={() => nextPage()}>
        <Title style={styles.txtbtn}>بعدی</Title>
      </Button> */}
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
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#C2428F',
  },
  txtbtn: {
    fontFamily: fonts.regular,
  },
});
