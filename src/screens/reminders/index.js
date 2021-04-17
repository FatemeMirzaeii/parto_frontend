import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView, ToastAndroid } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import { COLOR } from '../../styles/static';
import { getReminders } from '../../util/database/query';
import { userAppChecking, periodLate } from '../../util/notifications';
import styles from './Styles';

const Reminders = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);
  const cycle = useSelector((state) => state.cycle);

  useEffect(() => {
    getReminders().then(setReminders);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'یادآور‌ها',
      headerLeft: null,
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
  });

  return (
    <ScrollView>
      <Card>
        {reminders.map((r, index) => {
          return (
            <ListItem
              key={r.id}
              title={r.title}
              onPress={() =>
                navigation.navigate('ReminderSetting', { reminder: r })
              }
              bottomDivider={index === reminders.length - 1 ? false : true}
              disabled={
                r.id !== 1 &&
                (cycle.lastPeriodDate !== '' || cycle.isPregnant !== 0)
                  ? true
                  : false
              }
              leftIcon={{ name: 'alarm' }}
              titleStyle={styles.listItemText}
              containerStyle={styles.listItem}
              contentContainerStyle={styles.listItemContent}
            />
          );
        })}
      </Card>
      <Card>
        <ListItem
          title="‌فعال‌سازی اعلان‌ها"
          onPress={() => {
            userAppChecking();
            periodLate();
            ToastAndroid.show('اعلان‌ها برای شما فعال شد.', ToastAndroid.LONG);
          }}
          leftIcon={{ name: 'alarm' }}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
      </Card>
    </ScrollView>
  );
};
export default Reminders;
