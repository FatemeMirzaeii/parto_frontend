import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import PickerListItem from '../../components/PickerListItem';
import {
  updateProfileData,
  getCycleInfoFromProfile,
} from '../../util/database/query';
import styles from './styles';

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
      updateProfileData({ periodLength, cycleLength, pmsLength });
      navigation.pop();
    };
  }, [navigation, cycleLength, periodLength, pmsLength]);

  useEffect(() => {
    getCycleInfoFromProfile().then((info) => {
      setCycleLength(info.avg_cycle_length);
      setPeriodLength(info.avg_period_length);
      setPmsLength(info.pms_length);
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
