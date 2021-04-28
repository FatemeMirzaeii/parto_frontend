import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView, ToastAndroid } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import { COLOR } from '../../styles/static';
import { getReminders } from '../../util/database/query';
import { userAppChecking, periodLate } from '../../util/notifications';
import styles from './styles';

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
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.pink}
          onPress={() => navigation.pop()}
          containerStyle={{ right: 40 }}
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
    </ScrollView>
  );
};
export default Reminders;
