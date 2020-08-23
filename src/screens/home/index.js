import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ImageBackground } from 'react-native';
import moment from 'moment';
import jalaali from 'moment-jalaali';
import WeekCalendar from '../../components/WeekCalendar';
import { getProfileData } from '../../lib/database/query';
import { determinePhaseText } from '../../lib/cycle';
import Ptxt from '../../components/Ptxt';
import styles from './styles';
import { Icon } from 'react-native-elements';
const today = moment();
const Home = (props) => {
  const [profileData, setProfileData] = useState();
  const initialData = async () => {
    const pd = await getProfileData();
    setProfileData(pd);
  };
  useEffect(() => {
    initialData();
  }, []);
  const renderText = () => {
    if (profileData) {
      return (
        <View style={styles.moonText}>
          <Ptxt style={styles.numtxt}>{jalaali().format('jDD jMMMM')}</Ptxt>
          <Ptxt>
            {determinePhaseText(
              today,
              profileData.last_period_date,
              profileData.avg_cycle_length,
              profileData.avg_period_length,
            )}
          </Ptxt>
        </View>
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
        <Icon
          raised
          name="heartbeat"
          type="font-awesome"
          color="#f50"
          onPress={() =>
            props.navigation.navigate('TrackingOptions', { day: today })
          }
        />
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Home;
