import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, ImageBackground, Text } from 'react-native';
import moment from 'moment';
import { Button } from 'react-native-elements';

//redux
import { useDispatch, useSelector } from 'react-redux';

//store
import { setPregnancyMode } from '../../store/actions/cycle';

//components
import WeekCalendar from '../../components/WeekCalendar';
import HomeCalendar from '../../components/HomeCalendar';

//util
import CycleModule from '../../util/cycle';
import PregnancyModule from '../../util/pregnancy';
import { pregnancyMode } from '../../util/database/query';
import Tour from '../../util/tourGuide/Tour';

//constants
import { FORMAT } from '../../constants/cycle';

//assets
import MainBg from '../../../assets/images/home/main.png';
import TeenagerBg from '../../../assets/images/home/teenager.png';
import PartnerBg from '../../../assets/images/home/partner.png';

//styles
import { COLOR, FONT } from '../../styles/static';
import styles from './styles';

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
    navigation.addListener('focus', async () => {
      determineMode();
    });
  }, [navigation, determineMode]);

  useEffect(() => {
    determineMode();
  }, [date, determineMode]);

  const determineMode = useCallback(
    () => async () => {
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
    },
    [date, dispatch],
  );
  Tour(appTourTargets, 'calendarIcon', 'Home');

  const renderText = () => {
    switch (template) {
      case 'Main':
        return (
          <View style={styles.sentenceContainer}>
            <Text style={styles.mainSentence}>{mainSentence}</Text>
            <Text style={styles.subSentence}>{subSentence}</Text>
            <Text style={styles.thirdSentence}>{thirdSentence}</Text>
          </View>
        );
      case 'Teenager':
        return <Text style={styles.teenagerText}>{mainSentence}</Text>;
      case 'Partner':
        return (
          <View style={styles.sentenceContainer}>
            <Text style={styles.mainSentence}>{mainSentence}</Text>
            <Text style={styles.subSentence}>{subSentence}</Text>
            <Text style={styles.thirdSentence}>{thirdSentence}</Text>
          </View>
        );
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
        <WeekCalendar
          current={date}
          onDateChanged={(d) => setDate(d)}
          onDayPress={(d) => setDate(d.dateString)}
          theme={{
            calendarBackground: 'transparent',
          }}
          showTodayButton
        />
        <View style={styles.moonText}>
          {/* <Ruler /> */}
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
