import { Icon, Text, View, Container } from 'native-base';
import React, { useEffect, useState, useRef } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toPersianNum } from '../../app/Functions';
import Database from '../../components/Database';
import { Theme, Height, Width } from '../../app/Theme';
import { PROFILE } from '../../constants/TableDataBase';
import styles from './Styles';
var jalaali = require('jalaali-js');
const moment = require('moment');
const today = moment();
var db = new Database();
const _today = today.format('YYYYMMDD');
const { colors, size, fonts } = Theme;

const Home = (props) => {
  const [state, setState] = useState({
    items: [],
    thisDay: '',
    thisMonth: '',
    thisYear: '',
    today: '',
    daytonextperiod: 0,
    type: '',
    pregnantweek: 0,
  });
  const isInitialMount = useRef(true);
  const [responseDB, setResponseDB] = useState(null);
  const [Condition, setCondition] = useState(null);
  const [weekDay, setweekDay] = useState([
    'شنبه',
    'یک‌شنبه',
    'دوشنبه',
    'سه‌شنبه',
    'چهارشنبه',
    'پنج‌شنبه',
    'جمعه',
  ]);
  useEffect(() => {
    a();
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
      ...state,
      thisDay: Persian.jd,
      thisMonth: month,
      thisYear: Persian.jy,
      today: toPersianNum(Persian.jd) + ' ' + month,
    });
  };
  async function setLatestPeriodCycle(diff) {
    const lastPeriod = moment(
      moment(_today)
        .add(-(diff - responseDB.avg_period_length), 'days')
        .format('YYYYMMDD'),
    );
    //  _today(diff - responseDB.avg_period_length)
    // let new_date = moment(moment(date).add(i, 'days').format('YYYY-MM-DD'));
    console.log('today : ', _today);
    console.log('lasttttttttttttttttt: ', lastPeriod);
    await db
      .rawQuery(
        `UPDATE ${PROFILE} set last_period_date=${lastPeriod._i} where id=1`,
        [],
        PROFILE,
      )
      .then((res) => {
        getDataDB();
        checkPeriod();
      });
  }
  function checkPeriod() {
    console.log('respDB', responseDB);

    const diff = moment(_today, 'YYYYMMDD').diff(
      responseDB.last_period_date,
      'days',
    );
    console.log('diiiiif: ', diff);
    // (moment(_today, 'YYYYMMDD')).diff(responseDB.last_period_date, 'days')
    if (
      responseDB.avg_period_length - diff < 0 &&
      responseDB.avg_period_length - diff + responseDB.avg_cycle_length >= 0
    )
      setState({
        ...state,
        type: 'perioddate',
        daytonextperiod: Math.abs(
          responseDB.avg_period_length - diff,
        ).toString(),
      });
    else if (diff > responseDB.avg_period_length) setLatestPeriodCycle(diff);
    else {
      setState({
        ...state,
        type: 'beforeperiod',
        daytonextperiod: Math.abs(
          responseDB.avg_period_length - diff + 1,
        ).toString(),
      });
    }
  }
  async function getDataDB() {
    await db.rawQuery(`select * from ${PROFILE}`).then((res) => {
      console.log('rrrrrrrrrrrrrrrrrrrrrrrrrr: ', res[0]);
      if (res[0].pregnant == 1) setCondition('pregnant');
      else if (res[0].pregnant == 0) setCondition('period');
      setResponseDB(res[0]);
      checkPeriod();
      // else console.log("else ok")
    });
  }
  // useEffect(() => {
  //   getDataDB()
  // }, [Load]);
  useEffect(() => {
    // if (isInitialMount.current) {
    //   isInitialMount.current = false;
    //   console.log("ok")
    // } else {
    getDataDB();
    console.log('ok no');

    // }
    0;
  }, [responseDB != null]);

  function typeOfState() {
    switch (Condition) {
      case 'pregnant':
        return (
          <View>
            <ImageBackground
              source={require('../../../assets/images/bg2.png')}
              style={styles.sky}>
              <ImageBackground
                source={require('../../../assets/images/moon2.png')}
                style={styles.moon}>
                <StatusBar
                  translucent
                  barStyle="light-content"
                  backgroundColor="transparent"
                />
                <Text
                  style={{
                    fontFamily: fonts.medium,
                    fontSize: size[15],
                    color: '#121C3D',
                    marginTop: Height / 20,
                    alignSelf: 'center',
                  }}>
                  {toPersianNum(state.thisDay)} {state.thisMonth}{' '}
                  {toPersianNum(state.thisYear)}
                </Text>
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
                    <Text style={styles.text}>
                      {' '}
                      هفته {toPersianNum(parseInt(state.pregnantweek))}
                    </Text>
                    <Text style={styles.text}>فعال بودن حالت بارداری</Text>
                    <Text style={styles.text}>{state.today}</Text>
                    <Text style={styles.text}>
                      {/* احتمال بالای باروری  */}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </ImageBackground>
          </View>
        );
      case 'period':
        return (
          <View>
            <ImageBackground
              source={require('../../../assets/images/bg7.png')}
              style={styles.sky}>
              <ImageBackground
                source={require('../../../assets/images/moon7.png')}
                style={styles.moon}>
                <StatusBar
                  translucent
                  barStyle="light-content"
                  backgroundColor="transparent"
                />
                <Text style={styles.numtxt}>
                  {toPersianNum(state.thisDay)} {state.thisMonth}{' '}
                  {toPersianNum(state.thisYear)}
                </Text>
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
                    {state.type == 'beforeperiod' ? (
                      <View>
                        <Text style={styles.text}>
                          {toPersianNum(parseInt(state.daytonextperiod))} روز
                        </Text>
                        <Text style={styles.text}>تا پریود بعدی</Text>
                        <Text style={styles.text}>{state.today}</Text>
                        <Text style={styles.text2}>
                          {' '}
                          {Math.abs(state.daytonextperiod) > 11 &&
                          Math.abs(state.daytonextperiod) < 17
                            ? ' احتمال بالای باروری '
                            : ''}
                        </Text>
                      </View>
                    ) : state.type == 'perioddate' ? (
                      <View>
                        <Text style={styles.text}>
                          {' '}
                          روز {toPersianNum(parseInt(state.daytonextperiod))}
                        </Text>
                        <Text style={styles.text}>دوره پریود</Text>
                        <Text style={styles.text}>{state.today}</Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </ImageBackground>
          </View>
        );
    }
  }
  return <SafeAreaView>{typeOfState()}</SafeAreaView>;
};
export default Home;
