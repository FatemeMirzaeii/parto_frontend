import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Card from '../../components/Card';
import PickerListItem from '../../components/PickerListItem';
import { getPregnancyData, savePregnancyData } from '../../util/database/query';
import styles from './styles';
import { COLOR, FONT } from '../../styles/static';

const PregnancyProfile = ({ navigation }) => {
  const [dueDate, setDueDate] = useState();
  const [pregnancyWeek, setPregnancyWeek] = useState();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'پروفایل بارداری',
      headerLeft: () => (
        <Button
          title="ثبت"
          type="clear"
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
  }, []);

  return (
    <ScrollView>
      <Card>
        <PickerListItem
          PregnancyPicker
          title="سن بارداری"
          range={{ min: 3, max: 10 }}
          selectedItem={pregnancyWeek}
          onItemSelected={setPregnancyWeek}
          rightTitle={{ title: pregnancyWeek }}
          leftIcon={{ name: 'restore', color: COLOR.tiffany }}
        />
        <PickerListItem
          DatePicker
          title="تاریخ زایمان"
          range={{ min: 15, max: 50 }}
          selectedItem={dueDate}
          onItemSelected={setDueDate}
          rightTitle={{ title: dueDate }}
          leftIcon={{ name: 'restore', color: COLOR.tiffany }}
        />
      </Card>
      <Button
        raised
        title="پایان بارداری"
        // onPress={() => save()}
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
