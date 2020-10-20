import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  Text,
  DeviceEventEmitter,
} from 'react-native';
import moment from 'moment';
import WeekCalendar from '../../components/WeekCalendar';
import HomeCalendar from '../../components/HomeCalendar';
import Ruler from '../../components/Ruler';
import CycleModule from '../../util/cycle';
import PregnancyModule from '../../util/pregnancy';
import styles from './styles';
import { Button, Icon } from 'react-native-elements';
import CalendarButton from '../../components/CalendarButton';
import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour';
import { pregnancyMode } from '../../util/database/query';
import { COLOR, FONT, SIZE } from '../../styles/static';
const today = moment();
const Home = ({ navigation }) => {
  const [mainSentence, setMainSentence] = useState('');
  const [subSentence, setSubSentence] = useState('');
  const [thirdSentence, setThirdSentence] = useState('');
  const [isPregnant, setPregnant] = useState();
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

  useEffect(() => {
    registerSequenceStepEvent();
    registerFinishSequenceEvent();
  }, []);

  useEffect(() => {
    let appTourSequence = new AppTourSequence();
    setTimeout(() => {
      appTourTargets.forEach((appTourTarget) => {
        appTourSequence.add(appTourTarget);
      });
      AppTour.ShowSequence(appTourSequence);
    }, 1000);
    return () => clearTimeout(appTourSequence);
  }, []);

  const registerSequenceStepEvent = () => {
    if (sequenceStepListener) {
      sequenceStepListener.remove();
    }

    const sequenceStepListener = DeviceEventEmitter.addListener(
      'onShowSequenceStepEvent',
      (e: Event) => {
        console.log(e);
      },
    );
  };

  const registerFinishSequenceEvent = () => {
    if (finishSequenceListener) {
      finishSequenceListener.remove();
    }
    const finishSequenceListener = DeviceEventEmitter.addListener(
      'onFinishSequenceEvent',
      (e: Event) => {
        console.log(e);
      },
    );
  };

  const determineMode = async () => {
    const preg = await pregnancyMode();
    setPregnant(preg);
    const momentDate = moment(date);
    if (preg) {
      const p = await PregnancyModule();
      const pregnancyAge = p.determinePregnancyWeek(momentDate);
      setMainSentence(`شما در هفته ${pregnancyAge.week} بارداری هستید.`);
      setSubSentence(
        `${p.remainingDaysToDueDate(momentDate)} روز تا تولد فرزند شما!`,
      );
    } else {
      const c = await CycleModule();
      const s = c.determinePhaseSentence(momentDate);
      setMainSentence(s.mainSentence);
      setSubSentence(s.subSentence);
      setThirdSentence(s.thirdSentence);
    }
  };

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
        {/* <Icon
          name="calendar"
          type="evilicon"
          size={35}
          color={COLOR.black}
          containerStyle={styles.calendarIcon}
          onPress={() => {
            navigation.navigate('Calendar', { isPregnant });
          }}
        /> */}
        <CalendarButton
          addAppTourTarget={(appTourTarget) => {
            appTourTargets.push(appTourTarget);
          }}
          onPress={() => {
            navigation.navigate('Calendar', { isPregnant });
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
        <Button
          title={isPregnant ? 'پروفایل بارداری' : 'ثبت روزهای خونریزی'}
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
            navigation.navigate(
              isPregnant ? 'PregnancyProfile' : 'TrackingOptions',
            );
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Home;
