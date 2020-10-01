import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Card from '../../components/Card';
import { FONT, COLOR } from '../../styles/static';
import { getReminders } from '../../util/database/query';
import styles from './Styles';

const Reminders = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);
  useEffect(() => {
    getReminders().then((res) => setReminders(res));
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'یادآوری‌ها',
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
    <ScrollView style={{ backgroundColor: 'white' }}>
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
