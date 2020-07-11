import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import PickerListItem from '../../components/PickerListItem';
import DataBase from '../../components/Database';
import styles from './Styles';
const db = new DataBase();

const CycleSettings = ({ navigation }) => {
  const [periodLength, setPeriodLength] = useState();
  const [cycleLength, setCycleLength] = useState();
  const [pmsLength, setPmsLength] = useState();
  const [pregnancyPrediction, setPregnancyPrediction] = useState(false);
  const [forcast, setForcast] = useState(false);
  const [periodCount, setPeriodCount] = useState(false);

  useEffect(() => {
    navigation.setParams({ save });
    db.rawQuery(
      'SELECT avg_period_length, avg_cycle_length, pms_length FROM user_profile',
      'user_profile',
    ).then((n) => {
      const row = n[0];
      if (row) {
        setCycleLength(row.avg_cycle_length);
        setPeriodLength(row.avg_period_length);
        setPmsLength(row.pms_length);
      }
    });
  }, []);

  const save = () => {
    console.log('Im hereeeeeeee');
    db.rawQuery(
      `UPDATE user_profile SET avg_period_length='${periodLength}',
                                         avg_cycle_length='${cycleLength}',
                                         pms_length='${pmsLength}'`,
      'user_profile',
    );
  };

  return (
    <ScrollView>
      <Card>
        <PickerListItem
          title="طول روزهای خونریزی"
          range={{ min: 3, max: 10 }}
          selectedItem={periodLength}
          onItemSelected={setPeriodLength}
          initPosition={4}
          rightTitle={periodLength}
          leftIcon={{ name: 'restore' }}
        />
        <PickerListItem
          title="طول چرخه قاعدگی"
          range={{ min: 15, max: 50 }}
          selectedItem={cycleLength}
          onItemSelected={setCycleLength}
          initPosition={14}
          rightTitle={cycleLength}
          leftIcon={{ name: 'restore' }}
        />
        <PickerListItem
          title="طول سندروم پیش از قاعدگی"
          range={{ min: 3, max: 10 }}
          selectedItem={pmsLength}
          onItemSelected={setPmsLength}
          rightTitle={pmsLength}
          leftIcon={{ name: 'restore' }}
        />
        <ListItem
          title="نمایش احتمال بارداری"
          leftIcon={{ name: 'restore' }}
          bottomDivider
          switch={{
            value: pregnancyPrediction,
            onValueChange: () => setPregnancyPrediction(!pregnancyPrediction),
          }}
          subtitle="با خاموش کردن این بخش فقط روزهای تخمک گذاری برای شما نمایش داده میشود."
          titleStyle={styles.listItem}
        />
        <ListItem
          title="پیش بینی هوشمند"
          leftIcon={{ name: 'restore' }}
          bottomDivider
          switch={{
            value: forcast,
            onValueChange: () => setForcast(!forcast),
          }}
          subtitle="با فعال کردن این گزینه در شرایطی که قاعدگی نامنظم دارید، از اطلاعات شرح حال برای پیش بینی دوره های شما استفاده میشود."
          titleStyle={styles.listItem}
        />
        <ListItem
          title="نمایش شمارش روزهای قرمز"
          leftIcon={{ name: 'restore' }}
          switch={{
            value: periodCount,
            onValueChange: () => setPeriodCount(!periodCount),
          }}
          subtitle="با فعال کردن این گزینه بالای تقویم تعداد روزهای قرمز شما شمارش میشوند."
          titleStyle={styles.listItem}
        />
      </Card>
    </ScrollView>
  );
};
CycleSettings.navigationOptions = ({ navigation }) => ({
  title: 'تنظیمات دوره ها',
  headerRight: () => (
    <Button
      title="ثبت"
      type="clear"
      onPress={() => navigation.getParam('save')()}
      titleStyle={{ color: 'tomato' }}
    />
  ),
});
export default CycleSettings;
