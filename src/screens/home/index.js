import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import MainBg from '../../../assets/images/main/home.png';
import PartnerBg from '../../../assets/images/partner/home.png';
import PregnancyProfile from '../../../assets/images/PregnancyProfile.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';
import CalendarButton from '../../components/CalendarButton';
import HomeCalendar from '../../components/HomeCalendar';
import PlusButton from '../../components/PlusButton';

//components
import WeekCalendar from '../../components/WeekCalendar';

//constants
import { FORMAT } from '../../constants/cycle';

//store
import { setPregnancyMode } from '../../store/actions/cycle';

//styles and images
import { COLOR } from '../../styles/static';

//util
import CycleModule from '../../util/cycle';
import { pregnancyMode } from '../../util/database/query';
import PregnancyModule from '../../util/pregnancy';
import Tour from '../../util/tourGuide/Tour';
import styles from './styles';

const today = moment().format(FORMAT);

const Home = ({ navigation }) => {
  const [mainSentence, setMainSentence] = useState('');
  const [subSentence, setSubSentence] = useState('');
  const [thirdSentence, setThirdSentence] = useState('');
  const [date, setDate] = useState(today);
  const [appTourTargets, setAppTourTargets] = useState([]);
  const cycle = useSelector((state) => state.cycle);
  const template = useSelector((state) => state.user.template);
  //console.log('useSelector', cycle);
  const dispatch = useDispatch();

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

  const determineMode = useCallback(async () => {
    const preg = await pregnancyMode();
    dispatch(setPregnancyMode(preg));
    const momentDate = moment(date);
    if (preg) {
      const p = await PregnancyModule();
      const pregnancyAge = p.determinePregnancyWeek(momentDate);
      if (pregnancyAge) {
        setMainSentence(`از هفته ${pregnancyAge.week} بارداری لذت ببر.`);
        setSubSentence(
          `${p.remainingDaysToDueDate(momentDate)} روز تا تولد نوزاد!`,
        );
        setThirdSentence('');
      } else {
        setMainSentence('لطفا تاریخ آخرین پریود خود را وارد کنید.');
      }
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
        {cycle.isPregnant ? (
          <TouchableOpacity
            containerStyle={styles.pregnancyIcon}
            onPress={() => {
              navigation.navigate('PregnancyProfile');
            }}>
            <View style={styles.imageWrapper}>
              {/* <Text
                style={{
                  fontFamily: FONT.bold,
                  color: COLOR.white,
                  fontSize: 11,
                }}>
                پروفایل بارداری
              </Text> */}
              <Image source={PregnancyProfile} style={styles.pregnancyImage} />
            </View>
          </TouchableOpacity>
        ) : null}

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
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Home;
