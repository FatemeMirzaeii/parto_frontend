import { Footer, Icon, Text, View, Container } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toPersianNum } from '../../app/Functions';
import Database from '../../components/Database';
import TopAgenda from '../../components/TopAgenda';
import { Theme, Height, Width } from '../../app/Theme';
import styles from './Styles';
const moment2 = require('moment-jalaali');
var jalaali = require('jalaali-js');
moment2.loadPersian({ dialect: 'persian-modern' });
const moment = require('moment');
const today = moment()
var db = new Database();
const { colors, size, fonts } = Theme;

const Home = (props) => {
  const [state, setState] = useState({
    items: [],
    thisDay: '',
    thisMonth: '',
    thisYear: '',
    today: '',
    daytonextperiod: 0,
    type: ''
  });
  const [responseDB, setResponseDB] = useState(null)
  const [Condition, setCondition] = useState(null)
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
      ...state,
      thisDay: Persian.jd,
      thisMonth: month,
      thisYear: Persian.jy,
      today: toPersianNum(Persian.jd) + ' ' + month,
    });
  };

  useEffect(() => {
    async function getDataDB() {
      await db.rawQuery('select * from user_profile;').then((res) => {
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr: ", res[0])
        setResponseDB(res[0])
        if (res[0].pregnants == 1) setCondition("pregnant")
        else setCondition("period")
      });
    }
    getDataDB()
    const _today = today.format('YYYY-MM-DD')

    if (responseDB) {

      const diff = (moment(_today, 'YYYYMMDD')).diff(responseDB.last_period_date, 'days')
      //  (moment(_today, 'YYYYMMDD')).diff(responseDB.last_period_date, 'days')
      //  (moment(_today, 'YYYYMMDD')).diff('20200603', 'days')
      console.log("mmmmmmmmmmmmmmmmmmmmmmmmmm ", responseDB.avg_period_length - diff + responseDB.avg_cycle_length)
      console.log("mmmmmmmmmmmmmmmmmmmmmmmmmm ", responseDB.avg_period_length - diff)


      if (responseDB.avg_period_length - diff < 0 && responseDB.avg_period_length - diff + responseDB.avg_cycle_length >= 0)
        setState({ ...state, type: 'perioddate', daytonextperiod: (Math.abs(responseDB.avg_period_length - diff)).toString() })
      else {
        setState({ ...state, type: 'beforeperiod', daytonextperiod: (Math.abs(responseDB.avg_period_length - diff + 1)).toString() })
      }
    }

  }, [Condition]);

  function typeOfState() {
    switch (Condition) {
      case 'pregnant':
        return (
          <View >
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
                    <Text style={styles.text}>{toPersianNum(2)} روز</Text>
                    <Text style={styles.text}>تا پریود بعدی</Text>
                    <Text style={styles.text}>{state.today}</Text>
                    <Text style={styles.text}>{/* احتمال بالای باروری  */}</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </ImageBackground>
          </View>
        )
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
                    {state.type == "beforeperiod" ?
                      <View>
                        <Text style={styles.text}>{toPersianNum(parseInt(state.daytonextperiod))} روز</Text>
                        <Text style={styles.text}>تا پریود بعدی</Text>
                        <Text style={styles.text}>{state.today}</Text>
                        <Text style={styles.text2}> {(Math.abs(state.daytonextperiod) > 11 && Math.abs(state.daytonextperiod) < 17) ? " احتمال بالای باروری " : ""}</Text>
                      </View>
                      : state.type == "perioddate" ?
                        <View>
                          <Text style={styles.text}> روز {toPersianNum(parseInt(state.daytonextperiod))}</Text>
                          <Text style={styles.text}>دوره پریود</Text>
                          <Text style={styles.text}>{state.today}</Text>
                        </View> : null}

                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </ImageBackground>
          </View>
        )
      default:
        return (<View style={{ backgroundColor: 'green' }} />)
    }
  }
  return (
    <SafeAreaView>
      {typeOfState()}
      <Footer style={styles.footer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Profile')}
          style={styles.tab}>
          <Icon name="profile" type="AntDesign" style={styles.tabIcon} />
        </TouchableOpacity>
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
    </SafeAreaView>
  );

  // }

};
export default Home;
