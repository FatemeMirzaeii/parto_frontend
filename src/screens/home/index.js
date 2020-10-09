import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ImageBackground, Text } from 'react-native';
import moment from 'moment';
import WeekCalendar from '../../components/WeekCalendar';
import Ruler from '../../components/Ruler';
import CycleModule from '../../util/cycle';
import PregnancyModule from '../../util/pregnancy';
import styles from './styles';
import { Icon } from 'react-native-elements';
import { pregnancyMode } from '../../util/database/query';
import { COLOR } from '../../styles/static';
const today = moment();
const Home = ({ navigation }) => {
  const [mainSentence, setMainSentence] = useState('');
  const [subSentence, setSubSentence] = useState('');
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
      setMainSentence(`شما در هفته ${pregnancyAge.week} بارداری هستید.`);
      setSubSentence(
        `${p.remainingDaysToDueDate(date)} روز تا تولد فرزند شما!`,
      );
    } else {
      const c = await CycleModule();
      const s = c.determinePhaseSentence(date);
      setMainSentence(s.mainSentence);
      setSubSentence(s.subSentence);
    }
  };

  const renderText = () => {
    return (
      <View style={styles.sentenceContainer}>
        <Text style={styles.mainSentence}>{mainSentence}</Text>
        <Text style={styles.subSentence}>{subSentence}</Text>
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
          containerStyle={styles.calendarIcon}
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
          onDateChanged={(d, propUpdate) => setDate(moment(d))}
        />
        <View style={styles.moonText}>
          <Ruler />
          {renderText()}
        </View>
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
