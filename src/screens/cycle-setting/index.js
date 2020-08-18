import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import PickerListItem from '../../components/PickerListItem';
import DataBase from '../../components/Database';
import styles from './styles';
const db = new DataBase();

const CycleSetting = ({ navigation }) => {
  const [periodLength, setPeriodLength] = useState();
  const [cycleLength, setCycleLength] = useState();
  const [pmsLength, setPmsLength] = useState();
  const [pregnancyPrediction, setPregnancyPrediction] = useState(false);
  const [forcast, setForcast] = useState(false);
  const [periodCount, setPeriodCount] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="ثبت"
          type="clear"
          onPress={() => save()}
          titleStyle={{ color: 'tomato' }}
        />
      ),
    });
    const save = () => {
      db.rawQuery(
        `UPDATE user_profile SET avg_period_length=${periodLength},
                                         avg_cycle_length=${cycleLength},
                                         pms_length=${pmsLength}`,
        'user_profile',
      ).then(() => navigation.pop());
    };
  }, [navigation, cycleLength, periodLength, pmsLength]);

  useEffect(() => {
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

  return (
    <ScrollView>
      <Card>
        <PickerListItem
          title="طول روزهای خونریزی"
          range={{ min: 3, max: 10 }}
          selectedItem={periodLength}
          onItemSelected={setPeriodLength}
          rightTitle={{ title: periodLength, suffix: 'روز' }}
          leftIcon={{ name: 'restore' }}
        />
        <PickerListItem
          title="طول چرخه قاعدگی"
          range={{ min: 15, max: 50 }}
          selectedItem={cycleLength}
          onItemSelected={setCycleLength}
          rightTitle={{ title: cycleLength, suffix: 'روز' }}
          leftIcon={{ name: 'restore' }}
        />
        <PickerListItem
          title="طول سندروم پیش از قاعدگی"
          range={{ min: 1, max: 10 }}
          selectedItem={pmsLength}
          onItemSelected={setPmsLength}
          rightTitle={{ title: pmsLength, suffix: 'روز' }}
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
          titleStyle={styles.listItemText}
          subtitleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
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
          titleStyle={styles.listItemText}
          subtitleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="نمایش شمارش روزهای قرمز"
          leftIcon={{ name: 'restore' }}
          switch={{
            value: periodCount,
            onValueChange: () => setPeriodCount(!periodCount),
          }}
          subtitle="با فعال کردن این گزینه بالای تقویم تعداد روزهای قرمز شما شمارش میشوند."
          titleStyle={styles.listItemText}
          subtitleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
      </Card>
    </ScrollView>
  );
};
export default CycleSetting;
