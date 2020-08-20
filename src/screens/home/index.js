import React, { useEffect, useState } from 'react';
import { SafeAreaView, ImageBackground } from 'react-native';
import moment from 'moment';
import WeekCalendar from '../../components/WeekCalendar';
import Database from '../../components/Database';
import { determinePhaseText } from '../../lib/cycle';
import Ptxt from '../../components/Ptxt';
import { PROFILE } from '../../constants/database-tables';
import styles from './styles';
const today = moment();
const db = new Database();
const Home = () => {
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    db.rawQuery(`SELECT * FROM ${PROFILE}`, PROFILE).then((res) => {
      if (res[0]) {
        setProfileData(res[0]);
      }
    });
  }, []);
  useEffect(() => {
    console.log('resssss', profileData);
    console.log('today', today);
  }, [profileData]);

  const renderText = () => {
    if (profileData) {
      return (
        <Ptxt>
          {determinePhaseText(
            today,
            profileData.last_period_date,
            profileData.avg_cycle_length,
            profileData.avg_period_length,
          )}
        </Ptxt>
      );
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../../assets/images/bg7.png')}
        style={styles.sky}>
        <WeekCalendar
          theme={{
            calendarBackground: 'transparent',
          }}
        />
        <ImageBackground
          source={require('../../../assets/images/moon7.png')}
          style={styles.moon}>
          {renderText()}
        </ImageBackground>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Home;
