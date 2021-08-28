import moment from 'moment';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  BackHandler,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import analytics from '@react-native-firebase/analytics';
//redux
import { useDispatch, useSelector } from 'react-redux';

//store
import { setPregnancyMode } from '../../store/actions/cycle';

//components
import WeekCalendar from '../../components/WeekCalendar';
import CalendarButton from '../../components/CalendarButton';
import HomeCalendar from '../../components/HomeCalendar';
import PlusButton from '../../components/PlusButton';
import Loader from '../../components/Loader';

//constants
import { FORMAT } from '../../constants/cycle';
import WeekId from '../../constants/WeekId';

//util
import CycleModule from '../../util/cycle';
import { getPregnancyEndDate, pregnancyMode } from '../../util/database/query';
import PregnancyModule from '../../util/pregnancy';
import Tour from '../../util/tourGuide/Tour';

//assets
import MainBg from '../../../assets/images/main/home.png';
import PartnerBg from '../../../assets/images/partner/home.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';
import PregnancyModeBg from '../../../assets/images/main/pregnancyMode.png';

//styles
import styles from './styles';
import { COLOR } from '../../styles/static';

//services
import { authCode } from '../../services/authCode';
import { articlesBaseUrl } from '../../services/urls';

const today = moment().format(FORMAT);

const Home = ({ navigation }) => {
  const [mainSentence, setMainSentence] = useState('');
  const [subSentence, setSubSentence] = useState('');
  const [thirdSentence, setThirdSentence] = useState('');
  const [pregnancyWeek, setPregnancyWeek] = useState();
  const [date, setDate] = useState(today);
  const [appTourTargets, setAppTourTargets] = useState([]);
  const cycle = useSelector((state) => state.cycle);
  const template = useSelector((state) => state.user.template);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(false);
  // const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      determineMode();
    });
    return unsubscribe;
  }, [navigation, determineMode]);

  const onMainSentencePress = () => {
    if (cycle.isPregnant) {
      setLoading(true);
      goToWeekArticle();
    } else return;
  };

  const goToWeekArticle = async () => {
    const ar = await getArticle();
    console.log('article', article);
    setLoading(false);
    navigation.navigate('ArticleDetails', {
      articleContent: ar,
      catName: 'هفته های بارداری',
    });
    await analytics().logEvent('app_pregnancy_week_article_press', {
      template: template,
      userId: userId,
    });
  };
  const getArticle = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${articlesBaseUrl}/rest/api/content/${WeekId(pregnancyWeek + 1)}`,
        headers: {
          Authorization: 'Basic ' + authCode,
          'X-Atlassian-Token': 'no-check',
        },
      });
      let con = [];
      con = res.data;
      // if (con.length === 0) {
      //   setVisible(false);
      // }
      try {
        const response = await axios({
          method: 'get',
          url: `${articlesBaseUrl}/rest/api/content/${con.id}/child/attachment`,
          headers: {
            Authorization: 'Basic ' + authCode,
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'X-Atlassian-Token': 'no-check',
          },
        });
        const dataSource = response.data.results;
        const imgUrl = [];
        for (let j = 0; j < dataSource.length; j++) {
          imgUrl.push(
            `${articlesBaseUrl}${
              dataSource[j]._links.download.split('?')[0]
            }?os_authType=basic`,
          );
        }
        setArticle({
          ...con,
          cover: imgUrl[0],
          images: imgUrl,
          catId: '10813837',
        }); // todo: setArticle or return?
        // setVisible(true);
        return {
          ...con,
          cover: imgUrl[0],
          images: imgUrl,
          catId: '10813837',
        };
      } catch (err) {
        console.error(err, err.response);
        if (err.toString() === 'Error: Network Error') {
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        }
      }
    } catch (err) {
      console.error(err, err.response);
      if (err.toString() === 'Error: Network Error') {
        ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      let backPressed = 0;
      const handleBackButton = () => {
        if (backPressed > 0) {
          BackHandler.exitApp();
          backPressed = 0;
        } else {
          backPressed++;
          ToastAndroid.show(
            'برای خروج دوباره کلید بازگشت را لمس کنید.',
            ToastAndroid.SHORT,
          );
          setTimeout(() => {
            backPressed = 0;
          }, 2000);
          return true;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, []),
  );

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
    const pregnancyEndDate = await getPregnancyEndDate();
    dispatch(setPregnancyMode(preg));
    const momentDate = moment(date);
    if (preg) {
      const p = await PregnancyModule();
      const pregnancyAge = p.determinePregnancyWeek(momentDate);
      await analytics().logEvent('app_use_pregnancy_mode', {
        template,
        userId,
      });
      if (!pregnancyAge) {
        setMainSentence(
          'لطفا تاریخ آخرین پریود خود را جهت محاسبه سن بارداری وارد کنید.',
        );
        setSubSentence('');
        setThirdSentence('');
      } else if (pregnancyAge.week >= 0) {
        setPregnancyWeek(pregnancyAge.week);

        setMainSentence(
          pregnancyAge.days
            ? `در حال سپری کردن هفته ${pregnancyAge.week + 1} بارداری `
            : `هفته ${pregnancyAge.week} بارداری سپری شده است.`,
        );
        setSubSentence(
          `سن بارداری ${pregnancyAge.week} هفته ${
            pregnancyAge.days ? `و ${pregnancyAge.days} روز می‌باشد.` : ''
          }`,
        );
        p.remainingDaysToDueDate(momentDate) <= 0
          ? setThirdSentence('')
          : setThirdSentence(
              `${p.remainingDaysToDueDate(momentDate)} روز تا تولد نوزاد!`,
            );
      } else if (pregnancyAge.week < 0) {
        setMainSentence('پیش از بارداری');
        setSubSentence('');
        setThirdSentence('');
      }
    } else if (
      momentDate.diff(moment(pregnancyEndDate), 'days') < 10 &&
      momentDate.diff(moment(pregnancyEndDate), 'days') >= 0
    ) {
      setMainSentence('نفاس');
      setSubSentence('پس از بارداری');
      setThirdSentence('');
    } else {
      const c = await CycleModule();
      const s = c.determinePhaseSentence(
        momentDate,
        template === 'Teenager',
        template === 'Partner',
      );
      setMainSentence(s.mainSentence);
      setSubSentence(s.subSentence);
      setThirdSentence(s.thirdSentence);
    }
  }, [date, dispatch, template]);

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
                <TouchableWithoutFeedback onPress={onMainSentencePress}>
                  <Text
                    style={
                      !cycle.isPregnant
                        ? { ...styles.mainSentence, ...styles.mainTxt }
                        : [
                            { ...styles.mainSentence, ...styles.mainTxt },
                            {
                              elevation: 0.001,
                              borderRadius: 50,
                              paddingHorizontal: 15,
                              paddingVertical: 5,
                            },
                          ]
                    }>
                    {loading ? <Loader size={'small'} /> : mainSentence}
                  </Text>
                </TouchableWithoutFeedback>
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
            : cycle.isPregnant
            ? PregnancyModeBg
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
          onPress={async () => {
            navigation.navigate('Calendar');
            await analytics().logEvent('app_calendar_button_press', {
              template: template,
              userId: userId,
            });
          }}
        />
        {cycle.isPregnant ? (
          <Icon
            reverse
            type="parto"
            name="baby"
            color={COLOR.purple}
            size={20}
            onPress={async () => {
              navigation.navigate('PregnancyProfile');
              await analytics().logEvent('app_pregnancy_profile_press', {
                template: template,
                userId: userId,
              });
            }}
            containerStyle={styles.pregnancyIcon}
          />
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
