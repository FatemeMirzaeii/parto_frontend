import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ImageBackground } from 'react-native';
import moment from 'moment';
import jalaali from 'moment-jalaali';
import WeekCalendar from '../../components/WeekCalendar';
import CycleModule from '../../lib/cycle';
import PregnancyModule from '../../lib/pregnancy';
import Ptxt from '../../components/Ptxt';
import styles from './styles';
import { Icon } from 'react-native-elements';
import { pregnancyMode, getPregnancyData } from '../../lib/database/query';
const today = moment();
const Home = ({ navigation }) => {
  const [text, setText] = useState('');
  // useEffect(() => {
  //   navigation.addListener('focus', async () => {
  //     const c = await CycleModule();
  //     setText(c.determinePhaseText(today));
  //   });
  // }, [navigation]);
  useEffect(() => {
    determineMode();
    getPregnancyData();
  }, []);
  const determineMode = async () => {
    const pregnant = await pregnancyMode();
    if (pregnant) {
      const p = await PregnancyModule();
      setText(`شما در هفته ${p.determinePregnancyWeek()} بارداری هستید`);
    } else {
      const c = await CycleModule();
      setText(c.determinePhaseText(today));
    }
  };
  const determineTextOfTheDay = () => {};
  const renderText = () => {
    return (
      <View style={styles.moonText}>
        <Ptxt style={styles.numtxt}>
          {jalaali().format('jD jMMMM')}
          {'\n'}
        </Ptxt>
        <Ptxt style={styles.phasetxt}>{text}</Ptxt>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../../assets/images/bg7.png')}
        style={styles.sky}>
        <WeekCalendar
          theme={{
            calendarBackground: '#f1f1f1',
          }}
          onDateChanged={(d, propUpdate) =>
            navigation.navigate('TrackingOptions', { day: d })
          }
        />
        <ImageBackground
          source={require('../../../assets/images/moon7.png')}
          style={styles.moon}>
          {renderText()}
        </ImageBackground>
        <Icon
          raised
          name="heartbeat"
          type="font-awesome"
          color="#f50"
          onPress={() => {
            navigation.navigate('TrackingOptions', {
              day: today.format('YYYY-MM-DD'),
            });
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Home;
