import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Calendar } from 'react-native-jalali-calendars';
import PregnancyPicker from '../../components/PregnancyPicker';
import Card from '../../components/Card';
import PickerListItem from '../../components/PickerListItem';
import pregnancyModule from '../../util/pregnancy';
import { getPregnancyData, savePregnancyData } from '../../util/database/query';
import styles from './styles';
import { COLOR, FONT } from '../../styles/static';

const PregnancyProfile = ({ navigation }) => {
  const [dueDate, setDueDate] = useState();
  const [pregnancyWeek, setPregnancyWeek] = useState(0);
  const [pregnancyWeekDay, setPregnancyWeekDay] = useState(0);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'پروفایل بارداری',
      headerLeft: () => (
        <Button
          title="ثبت"
          type="clear"
          disabled={!dueDate}
          onPress={() => save()}
          titleStyle={{ color: COLOR.btn, fontFamily: FONT.regular }}
        />
      ),
      headerRight: () => (
        <Icon
          reverse
          size={15}
          name="arrow-right"
          type="font-awesome"
          color={COLOR.btn}
          onPress={() => navigation.pop()}
        />
      ),
    });
    const save = () => {
      savePregnancyData({ dueDate });
      navigation.pop();
    };
  }, [dueDate, navigation]);

  useEffect(() => {
    getPregnancyData().then((d) => {
      setDueDate(d.due_date);
    });
    setInitialData();
  }, []);
  const setInitialData = async () => {
    const p = await pregnancyModule();
    setPregnancyWeek(p.determinePregnancyWeek());
  };

  return (
    <ScrollView>
      <Card>
        <PickerListItem
          title="سن بارداری"
          rightTitle={{
            title: `${pregnancyWeek} هفته و ${pregnancyWeekDay} روز`,
          }}
          leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          customComponent={
            <PregnancyPicker
              selectedWeek={pregnancyWeek}
              onWeekSelected={setPregnancyWeek}
              selectedDay={pregnancyWeekDay}
              onWeekDaySelected={setPregnancyWeekDay}
            />
          }
        />
        <PickerListItem
          DatePicker
          title="تاریخ زایمان"
          initialDate={dueDate}
          onDateSelected={setDueDate}
          rightTitle={{ title: dueDate }}
          leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          customComponent={
            <Calendar jalali firstDay={6} minDate={new Date()} />
          }
        />
      </Card>
      <Button
        raised
        title="پایان بارداری"
        onPress={() => navigation.navigate('PregnancyEnd')}
        type="outline"
        buttonStyle={styles.saveContainer}
        containerStyle={styles.saveButton}
        titleStyle={styles.saveTitle}
        // icon={{name: 'user'}}
      />
    </ScrollView>
  );
};
export default PregnancyProfile;
