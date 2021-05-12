import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, ListItem } from 'react-native-elements';
import jalaali from 'moment-jalaali';

//components
import Card from '../../components/Card';
import CycleSettingbtn from '../../components/CycleSettingbtn';
import PickerListItem from '../../components/PickerListItem';

//utils
import {
  getCycleInfoFromProfile,
  updateProfileData,
  getLastPeriodDate,
} from '../../util/database/query';
import Tour from '../../util/tourGuide/Tour';

//styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';

const CycleSetting = ({ navigation }) => {
  const [periodLength, setPeriodLength] = useState();
  const [cycleLength, setCycleLength] = useState();
  const [pmsLength, setPmsLength] = useState();
  const [appTourTargets, setAppTourTargets] = useState([]);
  const [pregnancyPrediction, setPregnancyPrediction] = useState(false);
  const [forcast, setForcast] = useState(false);
  const [periodCount, setPeriodCount] = useState(false);
  const [lastPeriod, setLastPeriod] = useState();
  const template = useSelector((state) => state.user.template);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'تنظیمات دوره‌ها',
      headerLeft: () =>
        template !== 'Partner' && (
          <CycleSettingbtn
            addAppTourTarget={(appTourTarget) => {
              appTourTargets.push(appTourTarget);
            }}
            onPress={save}
          />
        ),
      headerRight: () => (
        <Icon
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.pink}
          onPress={() => navigation.pop()}
          containerStyle={{ right: 40 }}
        />
      ),
    });
    const save = () => {
      updateProfileData({ periodLength, cycleLength, pmsLength });
      navigation.pop();
    };
  }, [navigation, cycleLength, periodLength, pmsLength, template]);

  useEffect(() => {
    getCycleInfoFromProfile().then((info) => {
      setCycleLength(info.avg_cycle_length);
      setPeriodLength(info.avg_period_length);
      setPmsLength(info.pms_length);
    });
    getLastPeriodDate().then((lpd) => {
      if (lpd) {
        setLastPeriod(jalaali(lpd).format('jYYYY / jMM / jDD'));
      }
    });
  }, []);

  Tour(appTourTargets, 'settingbtn', 'CycleTour');

  return (
    <SafeAreaView
      style={styles.safeAreaView}
      contentContainerStyle={styles.container}>
      <ScrollView>
        <Card>
          <ListItem
            title="تاریخ آخرین پریود"
            // leftIcon={{ name: 'restore', color: COLOR.tiffany }}
            rightTitle={lastPeriod ?? '---- / ---- / ----'}
            titleStyle={globalStyles.listItemTitle}
            rightTitleStyle={globalStyles.listItemTitle}
            containerStyle={globalStyles.listItem}
            contentContainerStyle={globalStyles.listItemContentContainer}
          />
        </Card>
        <Card>
          <PickerListItem
            title="طول روزهای خونریزی"
            range={{ min: 3, max: 10 }}
            selectedItem={periodLength ?? '7'}
            onItemSelected={setPeriodLength}
            rightTitle={{ title: periodLength, suffix: 'روز' }}
            // leftIcon={{ name: 'restore', color: COLOR.tiffany }}
            bottomDivider
          />
          <PickerListItem
            title="طول چرخه قاعدگی"
            range={{ min: 15, max: 50 }}
            selectedItem={cycleLength ?? '28'}
            onItemSelected={setCycleLength}
            rightTitle={{ title: cycleLength, suffix: 'روز' }}
            // leftIcon={{ name: 'restore', color: COLOR.tiffany }}
            bottomDivider
          />
          <PickerListItem
            title="طول سندروم پیش از قاعدگی"
            range={{ min: 1, max: 10 }}
            selectedItem={pmsLength ?? '3'}
            onItemSelected={setPmsLength}
            rightTitle={{ title: pmsLength, suffix: 'روز' }}
            // leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          />
          {/* <ListItem
            title="نمایش احتمال بارداری"
            leftIcon={{ name: 'restore', color: COLOR.tiffany }}
            bottomDivider
            switch={{
              value: pregnancyPrediction,
              onValueChange: () => setPregnancyPrediction(!pregnancyPrediction),
              trackColor: { true: COLOR.lightPink, false: '#aaa' },
              thumbColor: pregnancyPrediction ? COLOR.btn : '#f4f3f4',
            }}
            subtitle="با خاموش کردن این بخش فقط روزهای تخمک گذاری برای شما نمایش داده میشود."
            titleStyle={globalStyles.listItemTitle}
            subtitleStyle={globalStyles.listItemTitle}
            containerStyle={globalStyles.listItem}
            contentContainerStyle={globalStyles.listItemContentContainer}
          />
          <ListItem
            title="پیش بینی هوشمند"
            leftIcon={{ name: 'restore', color: COLOR.tiffany }}
            bottomDivider
            switch={{
              value: forcast,
              onValueChange: () => setForcast(!forcast),
              trackColor: { true: COLOR.lightPink, false: '#aaa' },
              thumbColor: forcast ? COLOR.btn : '#f4f3f4',
            }}
            subtitle="با فعال کردن این گزینه در شرایطی که قاعدگی نامنظم دارید، از اطلاعات شرح حال برای پیش بینی دوره های شما استفاده میشود."
            titleStyle={globalStyles.listItemTitle}
            subtitleStyle={globalStyles.listItemTitle}
            containerStyle={globalStyles.listItem}
            contentContainerStyle={globalStyles.listItemContentContainer}
          />
          <ListItem
            title="نمایش شمارش روزهای قرمز"
            leftIcon={{ name: 'restore', color: COLOR.tiffany }}
            switch={{
              value: periodCount,
              onValueChange: () => setPeriodCount(!periodCount),
              trackColor: { true: COLOR.lightPink, false: '#aaa' },
              thumbColor: periodCount ? COLOR.btn : '#f4f3f4',
            }}
            subtitle="با فعال کردن این گزینه بالای تقویم تعداد روزهای قرمز شما شمارش میشوند."
            titleStyle={globalStyles.listItemTitle}
            subtitleStyle={globalStyles.listItemTitle}
            containerStyle={globalStyles.listItem}
            contentContainerStyle={globalStyles.listItemContentContainer}
          /> */}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CycleSetting;
