import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, ImageBackground, Text } from 'react-native';
import moment from 'moment';
import { Button, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

//store
import { setPregnancyMode } from '../../store/actions/cycle';

//components
import WeekCalendar from '../../components/WeekCalendar';
import HomeCalendar from '../../components/HomeCalendar';
import CalendarButton from '../../components/CalendarButton';
import PlusButton from '../../components/PlusButton';

//util
import CycleModule from '../../util/cycle';
import PregnancyModule from '../../util/pregnancy';
import { pregnancyMode } from '../../util/database/query';
import Tour from '../../util/tourGuide/Tour';

//constants
import { FORMAT } from '../../constants/cycle';

//styles and images
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';
import MainBg from '../../../assets/images/main/home.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';
import PartnerBg from '../../../assets/images/partner/home.png';

const today = moment().format(FORMAT);

const Home = ({ navigation }) => {
  const cycle = useSelector((state) => state.cycle);
  const template = useSelector((state) => state.user.template);
  console.log('useSelector', cycle);
  const dispatch = useDispatch();
  const [mainSentence, setMainSentence] = useState('');
  const [subSentence, setSubSentence] = useState('');
  const [thirdSentence, setThirdSentence] = useState('');
  const [date, setDate] = useState(today);
  const [appTourTargets, setAppTourTargets] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      determineMode();
    });
    return unsubscribe;
  }, [navigation, determineMode]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      setDate(today);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    determineMode();
  }, [date, determineMode]);

  const determineMode = useCallback(async () => {
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
      const s = c.determinePhaseSentence(momentDate, template === 'Teenager');
      setMainSentence(s.mainSentence);
      setSubSentence(s.subSentence);
      setThirdSentence(s.thirdSentence);
    }
  }, [date, dispatch]);
  Tour(appTourTargets, 'calendarIcon', 'Home');

  const renderText = () => {
    if (mainSentence) {
      switch (template) {
        case 'Main':
          return (
            <View style={styles.sentenceContainer}>
              <Text style={{ ...styles.subSentence, ...styles.mainTxt }}>
                {thirdSentence}
              </Text>
              <Text style={{ ...styles.thirdSentence, ...styles.mainTxt }}>
                {subSentence}
              </Text>
              <View style={styles.mainSentenceContainer}>
                <Text style={{ ...styles.mainSentence, ...styles.mainTxt }}>
                  {mainSentence}
                </Text>
              </View>
            </View>
          );
        case 'Teenager':
          return <Text style={styles.teenagerText}>{mainSentence}</Text>;
        case 'Partner':
          return (
            <View style={styles.sentenceContainer}>
              <Text style={{ ...styles.subSentence, ...styles.partnerTxt }}>
                {subSentence}
              </Text>
              <Text style={{ ...styles.thirdSentence, ...styles.partnerTxt }}>
                {thirdSentence}
              </Text>
              <View style={styles.mainSentenceContainer}>
                <Text style={{ ...styles.mainSentence, ...styles.partnerTxt }}>
                  {mainSentence}
                </Text>
              </View>
            </View>
          );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={
          template === 'Teenager'
            ? TeenagerBg
            : template === 'Partner'
            ? PartnerBg
            : MainBg
        }
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
          theme={{
            calendarBackground: 'transparent',
            headerColor: template === 'Partner' ? COLOR.white : COLOR.black,
            dayHeaderColor: template === 'Partner' ? COLOR.white : COLOR.black,
            dayTextColor: template === 'Partner' ? COLOR.white : COLOR.black,
          }}
        />
        <View style={styles.moonText}>{renderText()}</View>
        <PlusButton
          navigation={navigation}
          addAppTourTarget={(appTourTarget) => {
            appTourTargets.push(appTourTarget);
          }}
        />
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
