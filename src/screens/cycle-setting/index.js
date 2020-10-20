import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView ,  DeviceEventEmitter} from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour';
import Card from '../../components/Card';
import PickerListItem from '../../components/PickerListItem';
import CycleSettingbtn from '../../components/CycleSettingbtn';
import {
  updateProfileData,
  getCycleInfoFromProfile,
} from '../../util/database/query';
import globalStyles from '../../styles';
import styles from './styles';
import { COLOR } from '../../styles/static';

const CycleSetting = ({ navigation }) => {
  const [periodLength, setPeriodLength] = useState();
  const [cycleLength, setCycleLength] = useState();
  const [pmsLength, setPmsLength] = useState();
  const [markedDatesBeforeEdit, setMarkedDatesBeforeEdit] = useState({});
  const [appTourTargets, setAppTourTargets] = useState([]);
  const [pregnancyPrediction, setPregnancyPrediction] = useState(false);
  const [forcast, setForcast] = useState(false);
  const [periodCount, setPeriodCount] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'تنظیمات دوره‌ها',
      headerLeft: () => (
        // <Button
        //   title="ثبت"
        //   type="outline"
        //   onPress={() => save()}
        //   titleStyle={globalStyles.headerBtnTitle}
        //   containerStyle={globalStyles.smallHeaderBtn}
        // />
        <CycleSettingbtn 
        addAppTourTarget={(appTourTarget) => {
          appTourTargets.push(appTourTarget);
        }}
        onPress={() => save()}
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

  useEffect(() => {
    registerSequenceStepEvent();
    registerFinishSequenceEvent();
    
  }, []);

  useEffect(() => {
    let appTourSequence = new AppTourSequence();
    setTimeout(() => {
      appTourTargets.forEach((appTourTarget) => {
        appTourSequence.add(appTourTarget);
      });
      AppTour.ShowSequence(appTourSequence);
    }, 1000);
    return () => clearTimeout(appTourSequence);
  }, []);

  const registerSequenceStepEvent = () => {
    if (sequenceStepListener) {
      sequenceStepListener.remove();
    }
    const sequenceStepListener = DeviceEventEmitter.addListener(
      'onShowSequenceStepEvent',
      (e: Event) => {
        console.log(e);
      },
    );
  };

  const registerFinishSequenceEvent = () => {
    if (finishSequenceListener) {
      finishSequenceListener.remove();
    }
    const finishSequenceListener = DeviceEventEmitter.addListener(
      'onFinishSequenceEvent',
      (e: Event) => {
        console.log(e);
      },
    );
  };

  return (
    <SafeAreaView
      style={styles.safeAreaView}
      contentContainerStyle={styles.container}>
      <ScrollView>
        <Card>
          <PickerListItem
            title="طول روزهای خونریزی"
            range={{ min: 3, max: 10 }}
            selectedItem={periodLength ?? '7'}
            onItemSelected={setPeriodLength}
            rightTitle={{ title: periodLength, suffix: 'روز' }}
            leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          />
          <PickerListItem
            title="طول چرخه قاعدگی"
            range={{ min: 15, max: 50 }}
            selectedItem={cycleLength ?? '28'}
            onItemSelected={setCycleLength}
            rightTitle={{ title: cycleLength, suffix: 'روز' }}
            leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          />
          <PickerListItem
            title="طول سندروم پیش از قاعدگی"
            range={{ min: 1, max: 10 }}
            selectedItem={pmsLength ?? '3'}
            onItemSelected={setPmsLength}
            rightTitle={{ title: pmsLength, suffix: 'روز' }}
            leftIcon={{ name: 'restore', color: COLOR.tiffany }}
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
            titleStyle={styles.listItemText}
            subtitleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
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
            titleStyle={styles.listItemText}
            subtitleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
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
            titleStyle={styles.listItemText}
            subtitleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
          /> */}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CycleSetting;
