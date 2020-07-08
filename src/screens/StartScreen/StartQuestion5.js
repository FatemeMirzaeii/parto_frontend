import { Button, Title, Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Theme } from '../../app/Theme';
import Database from '../../components/Database';
import { PROFILE } from '../../constants/TableDataBase';
import { storeData } from '../../app/Functions';
import PersianDatePicker from '../../components/PersianDatePicker';
const moment = require('moment');

const { size, fonts } = Theme;
const db = new Database();

let questionArray = [];
let forgetPragnancy = false;

let data = [];

const Start5 = (props) => {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  useEffect(() => {
    questionArray = props.navigation.state.params.questionArray;
    forgetPragnancy = props.navigation.state.params.forgetPragnancy;
    console.log('day: ', questionArray);
  }, [props]);
  const setDate = (date, persianDate) => {
    console.log('hi from interview', date);
    if (date) {
      const dateArray = date.split('/');
      setDay(parseInt(dateArray[2]));
      setMonth(parseInt(dateArray[1]));
      setYear(parseInt(dateArray[0]));
    }
  };
  const nextPress = () => {
    let d,
      m,
      y = '';
    if (day < 9) {
      d = '0' + day;
    } else {
      d = day;
    }
    if (month < 9) {
      m = '0' + month;
    } else {
      m = month;
    }

    y = year;
    let _date = (y + m + d).toString();
    questionArray.push({ birthdate: _date });
    console.log('day: ', questionArray);
    saveToLocal();
  };
  const saveToLocal = () => {
    const today = moment();
    if (forgetPragnancy == true) {
      console.log('pragnancy ok');
      goToHome();
    } else {
      db.rawQuery(
        `INSERT INTO ${PROFILE}
             (pregnant,pregnancy_try,avg_cycle_length,avg_period_length,birthdate,created_at,last_period_date)
             VALUES(${questionArray[0].pregnant},
                ${questionArray[0].pregnancy_try},
                ${questionArray[2].periodDays},
                ${questionArray[3].periodlength},
                ${questionArray[5].birthdate.toString()},
                ${today.format('YYYYMMDD')},
                ${questionArray[1].periodDate})`,
        [],
        PROFILE,
      ).then((res) => {
        goToHome();
      });
    }
  };
  const goToHome = async () => {
    await storeData('@startPages', 'true');
    props.navigation.navigate('Home');
  };
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#D164A6', '#C2428F', '#780048']}
      style={styles.gradiant}>
      <View style={styles.view}>
        <Text style={styles.txt}>تاریخ تولد شما، چیست ؟</Text>
        <PersianDatePicker onDateSelected={setDate} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button
          rounded
          style={styles.btn}
          onPress={() => props.navigation.goBack()}>
          <Icon name="arrowright" type="AntDesign" />
          <Title style={[styles.txtbtn, { marginRight: 20 }]}>قبلی</Title>
        </Button>
        <Button rounded style={styles.btn} onPress={() => nextPress()}>
          <Title style={[styles.txtbtn, { marginLeft: 20 }]}>بعدی</Title>
          <Icon name="arrowleft" type="AntDesign" />
        </Button>
      </View>
    </LinearGradient>
  );
};

export default Start5;

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
    paddingBottom: 100,
    borderRadius: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
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
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#C2428F',
  },
  txtbtn: {
    alignSelf: 'center',
    fontFamily: fonts.regular,
  },
});
