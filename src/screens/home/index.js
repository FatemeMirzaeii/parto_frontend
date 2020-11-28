import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ImageBackground, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import WeekCalendar from '../../components/WeekCalendar';
import HomeCalendar from '../../components/HomeCalendar';
import CalendarButton from '../../components/CalendarButton';
import Ruler from '../../components/Ruler';
import styles from './styles';
import { Button } from 'react-native-elements';
import CycleModule from '../../util/cycle';
import PregnancyModule from '../../util/pregnancy';
import { pregnancyMode } from '../../util/database/query';
import Tour from '../../util/tourGuide/Tour';
import { COLOR, FONT } from '../../styles/static';
import { setPregnancyMode } from '../../store/actions/cycle';
const today = moment();
const Home = ({ navigation }) => {
  const cycle = useSelector((state) => state.cycle);
  console.log('useSelector', cycle);
  const dispatch = useDispatch();
  const [mainSentence, setMainSentence] = useState('');
  const [subSentence, setSubSentence] = useState('');
  const [thirdSentence, setThirdSentence] = useState('');
  const [date, setDate] = useState(today);
  const [appTourTargets, setAppTourTargets] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', async () => {
      determineMode();
    });
  }, [navigation]);

  useEffect(() => {
    determineMode();
  }, [date]);

  const determineMode = async () => {
    const preg = await pregnancyMode();
    dispatch(setPregnancyMode(preg));
    const momentDate = moment(date);
    if (preg) {
      const p = await PregnancyModule();
      const pregnancyAge = p.determinePregnancyWeek(momentDate);
      setMainSentence(`از هفته ${pregnancyAge.week} بارداری لذت ببر.`);
      setSubSentence(
        `${p.remainingDaysToDueDate(momentDate)} روز تا تولد نوزاد!`,
      );
      setThirdSentence('');
    } else {
      const c = await CycleModule();
      const s = c.determinePhaseSentence(momentDate);
      setMainSentence(s.mainSentence);
      setSubSentence(s.subSentence);
      setThirdSentence(s.thirdSentence);
    }
  };

  Tour(appTourTargets, 'calendarIcon', 'Home');

  const renderText = () => {
    return (
      <View style={styles.sentenceContainer}>
        <Text style={styles.mainSentence}>{mainSentence}</Text>
        <Text style={styles.subSentence}>{subSentence}</Text>
        <Text style={styles.thirdSentence}>{thirdSentence}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/bg.png')}
        style={styles.sky}>
        <HomeCalendar
          addAppTourTarget={(appTourTarget) => {
            appTourTargets.push(appTourTarget);
          }}
        />
        <CalendarButton
          addAppTourTarget={(appTourTarget) => {
            appTourTargets.push(appTourTarget);
          }}
          onPress={() => {
            navigation.navigate('Calendar');
          }}
        />
        <WeekCalendar
          current={date}
          onDateChanged={(d) => setDate(d)}
          onDayPress={(d) => setDate(d.dateString)}
          dividerColor={COLOR.lightPink}
          theme={{
            calendarBackground: 'transparent',
          }}
          showTodayButton
        />
        <View style={styles.moonText}>
          <Ruler />
          {renderText()}
        </View>
        {cycle.isPregnant ? (
          <Button
            title="پروفایل بارداری"
            type="outline"
            buttonStyle={{
              borderWidth: 0,
            }}
            containerStyle={{
              height: 25,
              width: 140,
              borderRadius: 40,
              bottom: 65,
              left: 15,
              justifyContent: 'center',
              backgroundColor: COLOR.btn,
            }}
            titleStyle={{
              fontFamily: FONT.bold,
              color: COLOR.white,
              fontSize: 11,
            }}
            onPress={() => {
              navigation.navigate('PregnancyProfile');
            }}
          />
        ) : null}
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Home;
