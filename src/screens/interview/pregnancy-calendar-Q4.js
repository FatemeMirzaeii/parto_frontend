import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';

//components
import Calendar from '../../components/Calendar';
import Stepper from '../../components/Stepper';
import { FORMAT } from '../../constants/cycle';

//styles and images
import styles from './styles';
import Main from '../../../assets/images/main/interview.png';

const today = moment();

const Pregnancy_Q4 = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState();
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const onNextPress = () => {
    navigation.navigate('Q5', {
      ...route.params,
      [route.params.type]: selectedDate,
    });
  };
  const determineTitle = () => {
    switch (route.params.type) {
      case 'conceptionDate':
        return 'تاریخ لقاح چه زمانی بوده است؟';
      case 'dueDate':
        return 'تاریخ تولد نوزاد چه زمانی است؟';
      case 'lastPeriodDate':
        return 'آخرین بار دوره ماهانه شما چه زمانی آغاز شد؟';
    }
  };
  return (
    <ImageBackground source={Main} style={styles.bg}>
      <View style={{ flex: 1 }} />
      <View style={styles.safeAreaView}>
        <ScrollView>
          <Text style={styles.question}>{determineTitle()}</Text>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: { selected: true },
            }}
            minDate={
              route.params.type === 'dueDate' ? today.format(FORMAT) : null
            }
            maxDate={
              route.params.type !== 'dueDate' ? today.format(FORMAT) : null
            }
            style={styles.calendar}
          />
          <View>
            <Stepper index={3} />
            <View style={styles.buttons}>
              <Button
                title="بعدی"
                disabled={!selectedDate}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.nextButton}
                titleStyle={styles.btnTitle}
                type="solid"
                onPress={onNextPress}
              />
              <Button
                title="قبلی"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.prevButton}
                titleStyle={styles.darkBtnTitle}
                type="solid"
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};
export default Pregnancy_Q4;
