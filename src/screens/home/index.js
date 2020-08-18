import React, { Component } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { periodLate } from '../../lib/notifications';
import Database from '../../components/Database';
import WeekCalendar from '../../components/WeekCalendar';
import { SIZE, FONT, HEIGHT } from '../../styles/static';
import { PROFILE } from '../../constants/database-tables';
import styles from './styles';
import { Icon } from 'react-native-elements';
const moment = require('moment');
const today = moment();
var db = new Database();
const _today = today.format('YYYYMMDD');
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      thisDay: '',
      thisMonth: '',
      thisYear: '',
      today: '',
      dayToNextPeriod: 0,
      type: '',
      pregnancyWeek: 0,
      uData: [],
    };
  }
  componentDidMount() {
    this.getDataDB();
  }
  async getDataDB() {
    await db.rawQuery(`select * from ${PROFILE}`).then((res) => {
      const r = res[0];
      console.log('rrrrrrrrrrrrrrrrrrrrrrrrrr: ', r);
      if (r) {
        r.pregnant
          ? this.setState({ mode: 'pregnant' })
          : this.setState({ mode: 'period' });
        this.setState({ uData: r });
        this.checkPeriod();
      }
    });
    periodLate(
      this.state.uData.last_period_date,
      this.state.uData.avg_period_length,
    );
  }
  checkPeriod() {
    let response = this.state.uData;
    const diff = moment(_today, 'YYYYMMDD').diff(
      response.last_period_date,
      'days',
    );
    console.log('diiiiif: ', diff);
    if (
      response.avg_period_length - diff < 0 &&
      response.avg_period_length - diff + this.state.uData.avg_cycle_length >= 0
    ) {
      this.setState({
        type: 'periodDate',
        dayToNextPeriod: Math.abs(response.avg_period_length - diff).toString(),
      });
    } else if (diff > response.avg_period_length) {
      this.setLatestPeriodCycle(diff);
    } else {
      this.setState({
        type: 'beforePeriod',
        dayToNextPeriod: Math.abs(
          response.avg_period_length - diff + 1,
        ).toString(),
      });
    }
  }
  async setLatestPeriodCycle(diff) {
    const lastPeriod = moment(
      moment(_today)
        .add(-(diff - this.state.uData.avg_period_length), 'days')
        .format('YYYYMMDD'),
    );
    //  _today(diff - this.state.uData.avg_period_length)
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
  renderHomePage() {
    switch (this.state.mode) {
      case 'pregnant':
        return (
          <ImageBackground
            source={require('../../../assets/images/bg2.png')}
            style={styles.sky}>
            <ImageBackground
              source={require('../../../assets/images/moon2.png')}
              style={styles.moon}>
              <Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: SIZE[15],
                  color: '#121C3D',
                  marginTop: HEIGHT / 20,
                  alignSelf: 'center',
                }}>
                {this.state.thisDay} {this.state.thisMonth}{' '}
                {this.state.thisYear}
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
                    هفته {parseInt(this.state.pregnancyWeek)}
                  </Text>
                  <Text style={styles.text}>فعال بودن حالت بارداری</Text>
                  <Text style={styles.text}>{this.state.today}</Text>
                  <Text style={styles.text}>{/* احتمال بالای باروری  */}</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ImageBackground>
        );
      case 'period':
        return (
          <ImageBackground
            source={require('../../../assets/images/bg7.png')}
            style={styles.sky}>
            <WeekCalendar
              theme={{
                calendarBackground: 'transparent',
              }}
            />
            <ImageBackground
              source={require('../../../assets/images/moon7.png')}
              style={styles.moon}>
              <Text style={styles.numtxt}>
                {this.state.thisDay} {this.state.thisMonth}{' '}
                {this.state.thisYear}
              </Text>
              <View style={styles.moonText}>
                {this.state.type === 'beforePeriod' ? (
                  <View>
                    <Text style={styles.text}>
                      {parseInt(this.state.dayToNextPeriod)} روز
                    </Text>
                    <Text style={styles.text}>تا پریود بعدی</Text>
                    <Text style={styles.text}>{this.state.today}</Text>
                    <Text style={styles.text2}>
                      {' '}
                      {Math.abs(this.state.dayToNextPeriod) > 11 &&
                      Math.abs(this.state.dayToNextPeriod) < 17
                        ? ' احتمال بالای باروری '
                        : ''}
                    </Text>
                  </View>
                ) : this.state.type === 'periodDate' ? (
                  <View>
                    <Text style={styles.text}>
                      {' '}
                      روز {parseInt(this.state.dayToNextPeriod)}
                    </Text>
                    <Text style={styles.text}>دوره پریود</Text>
                    <Text style={styles.text}>{this.state.today}</Text>
                  </View>
                ) : null}
              </View>
            </ImageBackground>
            <Icon
              raised
              name="heartbeat"
              type="font-awesome"
              color="#f50"
              onPress={() =>
                this.props.navigation.navigate('TrackingOptions', { today })
              }
            />
          </ImageBackground>
        );
    }
  }
  render() {
    return <SafeAreaView>{this.renderHomePage()}</SafeAreaView>;
  }
}
