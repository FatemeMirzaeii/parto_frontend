import { Text, View } from 'native-base';
import React, { useEffect, useState, useRef, Component } from 'react';
import { ImageBackground, SafeAreaView, StatusBar, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toPersianNum } from '../../app/Functions';
import { periodLate } from '../../notifications/Notifications';
import Database from '../../components/Database';
import WeekCalendar from '../../components/WeekCalendar';
import { Theme, Height } from '../../app/Theme';
import { PROFILE } from '../../constants/TableDataBase';
import styles from './Styles';
const moment = require('moment');
const today = moment();
var db = new Database();
const _today = today.format('YYYYMMDD');
const { size, fonts } = Theme;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Condition: '',
      thisDay: '',
      thisMonth: '',
      thisYear: '',
      today: '',
      daytonextperiod: 0,
      type: '',
      pregnantweek: 0,
      responseDB: [],
    };
  }
  componentDidMount() {
    this.getDataDB();
  }
  render() {
    return <SafeAreaView>{this.typeOfState()}</SafeAreaView>;
  }
  async getDataDB() {
    await db.rawQuery(`select * from ${PROFILE}`).then((res) => {
      console.log('rrrrrrrrrrrrrrrrrrrrrrrrrr: ', res[0]);
      if (res[0].pregnant == 1) this.setState({ Condition: 'pregnant' });
      else if (res[0].pregnant == 0) this.setState({ Condition: 'period' });
      this.setState({ responseDB: res[0] });
      // this.checkPeriod();
    });
    console.log(
      this.state.responseDB.last_period_date +
        '    ' +
        this.state.responseDB.avg_period_length,
    );
    periodLate(
      this.state.responseDB.last_period_date,
      this.state.responseDB.avg_period_length,
    );
  }
  checkPeriod() {
    let response = this.state.responseDB;
    const diff = moment(_today, 'YYYYMMDD').diff(
      response.last_period_date,
      'days',
    );
    console.log('diiiiif: ', diff);
    if (
      response.avg_period_length - diff < 0 &&
      response.avg_period_length - diff + responseDB.avg_cycle_length >= 0
    )
      this.setState({
        type: 'perioddate',
        daytonextperiod: Math.abs(response.avg_period_length - diff).toString(),
      });
    else if (diff > response.avg_period_length) this.setLatestPeriodCycle(diff);
    else {
      this.setState({
        type: 'beforeperiod',
        daytonextperiod: Math.abs(
          response.avg_period_length - diff + 1,
        ).toString(),
      });
    }
  }
  async setLatestPeriodCycle(diff) {
    const lastPeriod = moment(
      moment(_today)
        .add(-(diff - this.state.responseDB.avg_period_length), 'days')
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
        this.getDataDB();
        this.checkPeriod();
      });
  }
  typeOfState() {
    switch (this.state.Condition) {
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
                  {toPersianNum(this.state.thisDay)} {this.state.thisMonth}{' '}
                  {toPersianNum(this.state.thisYear)}
                </Text>
                <View style={styles.moonText}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('TrackingOptions', {
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
                      هفته {toPersianNum(parseInt(this.state.pregnantweek))}
                    </Text>
                    <Text style={styles.text}>فعال بودن حالت بارداری</Text>
                    <Text style={styles.text}>{this.state.today}</Text>
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
                <WeekCalendar />
                <Button
                  title="َشرح حال"
                  onPress={() =>
                    this.props.navigation.navigate('TrackingOptions', {
                      today,
                    })
                  }
                />
                <Button
                  title="َامتیازدهی"
                  onPress={() => this.props.navigation.navigate('Rating')}
                />
                <Button
                  title="تماس با ما"
                  onPress={() => this.props.navigation.navigate('ContactUs')}
                />
                <Text style={styles.numtxt}>
                  {toPersianNum(this.state.thisDay)} {this.state.thisMonth}{' '}
                  {toPersianNum(this.state.thisYear)}
                </Text>
                <View style={styles.moonText}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('TrackingOptions', {
                        today,
                      })
                    }>
                    {this.state.type == 'beforeperiod' ? (
                      <View>
                        <Text style={styles.text}>
                          {toPersianNum(parseInt(this.state.daytonextperiod))}{' '}
                          روز
                        </Text>
                        <Text style={styles.text}>تا پریود بعدی</Text>
                        <Text style={styles.text}>{this.state.today}</Text>
                        <Text style={styles.text2}>
                          {' '}
                          {Math.abs(this.state.daytonextperiod) > 11 &&
                          Math.abs(this.state.daytonextperiod) < 17
                            ? ' احتمال بالای باروری '
                            : ''}
                        </Text>
                      </View>
                    ) : this.state.type == 'perioddate' ? (
                      <View>
                        <Text style={styles.text}>
                          {' '}
                          روز{' '}
                          {toPersianNum(parseInt(this.state.daytonextperiod))}
                        </Text>
                        <Text style={styles.text}>دوره پریود</Text>
                        <Text style={styles.text}>{this.state.today}</Text>
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
}
