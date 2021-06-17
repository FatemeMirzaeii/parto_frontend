import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView, ToastAndroid } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

// components and utils
import Card from '../../components/Card';
import BackButton from '../../components/BackButton';
import { getReminders } from '../../util/database/query';

// styles
import globalStyles from '../../styles';

const Reminders = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);
  const [disabled, setDisabled] = useState([]);
  const cycle = useSelector((state) => state.cycle);
  const template = useSelector((state) => state.user.template);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'یادآور‌ها',
      headerLeft: null,
      headerRight: () => <BackButton navigation={navigation} />,
    });
  });

  useEffect(() => {
    getReminders().then((r) => {
      if (template === 'Teenager') r.splice(1, 1);
      if (template === 'Partner') r.splice(0, 1);
      setReminders(r);
    });
  }, []);

  useEffect(() => {
    let r = [];
    reminders.map((i, index) => {
      i.id !== 1 && (!cycle.lastPeriodDate || cycle.isPregnant !== 0)
        ? (r[index] = true)
        : (r[index] = false);
    });
    setDisabled(r);
    console.log('t', r);
  }, [reminders, cycle.lastPeriodDate, cycle.isPregnant]);

  return (
    <ScrollView>
      <Card>
        {reminders.map((r, index) => {
          return (
            <ListItem
              key={r.id}
              title={r.title}
              Subtitle={r.title}
              onPress={() =>
                !disabled[index]
                  ? navigation.navigate('ReminderSetting', { reminder: r })
                  : ToastAndroid.show(
                      cycle.isPregnant !== 0
                        ? 'فعال‌سازی این یادآور در حالت بارداری امکان‌پذیر نمی‌باشد.'
                        : 'لطفا پیش از فعال‌سازی این یادآور، تاریخ آخرین پریود خود را وارد کنید.',
                      ToastAndroid.LONG,
                    )
              }
              bottomDivider={index === reminders.length - 1 ? false : true}
              titleStyle={
                !disabled[index]
                  ? globalStyles.listItemTitle
                  : [
                      globalStyles.listItemTitle,
                      globalStyles.disabledListItemTitle,
                    ]
              }
              containerStyle={globalStyles.listItem}
              contentContainerStyle={globalStyles.listItemContentContainer}
            />
          );
        })}
      </Card>
    </ScrollView>
  );
};
export default Reminders;
