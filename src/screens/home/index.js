import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ImageBackground, StatusBar } from 'react-native';
import moment from 'moment';
import jalaali from 'moment-jalaali';
import WeekCalendar from '../../components/WeekCalendar';
import CycleModule from '../../util/cycle';
import PregnancyModule from '../../util/pregnancy';
import Ptxt from '../../components/Ptxt';
import styles from './styles';
import { Icon } from 'react-native-elements';
import { pregnancyMode } from '../../util/database/query';
import { COLOR } from '../../styles/static';
const today = moment();
const Home = ({ navigation }) => {
  const [text, setText] = useState('');
  useEffect(() => {
    navigation.addListener('focus', async () => {
      determineMode();
    });
  }, [navigation]);
  useEffect(() => {
    determineMode();
  }, []);
  const determineMode = async () => {
    const pregnant = await pregnancyMode();
    if (pregnant) {
      const p = await PregnancyModule();
      setText(
        `شما در هفته ${p.determinePregnancyWeek()} بارداری هستید. ${'\n'} ${p.remainingDaysToDueDate()} روز تا تولد فرزند شما!`,
      );
    } else {
      const c = await CycleModule();
      setText(c.determinePhaseText(today));
    }
  };
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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/bg.jpeg')}
        style={styles.sky}>
        <Icon
          name="calendar"
          type="font-awesome"
          size={20}
          color={COLOR.btn}
          containerStyle={{
            top: 30,
            zIndex: 10,
            alignItems: 'flex-start',
            paddingLeft: 40,
          }}
          onPress={() => {
            navigation.navigate('Calendar');
          }}
        />
        <WeekCalendar
          theme={{
            calendarBackground: '#e1e8f0',
          }}
          showTodayButton
          // onDateChanged={(d, propUpdate) =>
          //   navigation.navigate('TrackingOptions', { day: d })
          // }
        />
        {renderText()}
        {/* <ImageBackground
          source={require('../../../assets/images/moon7.png')}
          style={styles.moon}>
          {renderText()}
        </ImageBackground> */}
        <Icon
          raised
          name="plus"
          type="font-awesome"
          color={COLOR.btn}
          size={25}
          containerStyle={{
            left: 15,
            bottom: 65,
          }}
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
