import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ImageBackground } from 'react-native';
import moment from 'moment';
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
  const [date, setDate] = useState(today);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      determineMode();
    });
  }, [navigation]);
  useEffect(() => {
    determineMode();
  }, [date]);
  const determineMode = async () => {
    const pregnant = await pregnancyMode();
    if (pregnant) {
      const p = await PregnancyModule();
      const pregnancyAge = p.determinePregnancyWeek(date);
      setText(
        `شما در هفته ${
          pregnancyAge.week
        } بارداری هستید. ${'\n'} ${p.remainingDaysToDueDate(
          date,
        )} روز تا تولد فرزند شما!`,
      );
    } else {
      const c = await CycleModule();
      setText(c.determinePhaseText(date));
    }
  };
  const renderText = () => {
    return (
      <View style={styles.moonText}>
        {/* <Ptxt style={styles.numtxt}>
          {jalaali().format('jD jMMMM')}
          {'\n'}
        </Ptxt> */}
        <Ptxt style={styles.phasetxt}>{text}</Ptxt>
        <View
          style={{
            backgroundColor: 'white',
            margin: 10,
            width: 15,
            height: 15,
            borderRadius: 50,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/bg.png')}
        style={styles.sky}>
        <Icon
          name="calendar"
          type="evilicon"
          size={35}
          color={COLOR.black}
          containerStyle={{
            top: 40,
            zIndex: 10,
            alignItems: 'flex-start',
            paddingLeft: 20,
          }}
          onPress={() => {
            navigation.navigate('Calendar');
          }}
        />
        <WeekCalendar
          dividerColor={COLOR.lightPink}
          theme={{
            calendarBackground: '#B9B2CD',
          }}
          showTodayButton
          onDateChanged={(d, propUpdate) =>
            // navigation.navigate('TrackingOptions', { day: d })
            setDate(moment(d))
          }
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
