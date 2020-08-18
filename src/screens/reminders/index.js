import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import DataBase from '../../components/Database';
import styles from './Styles';
const db = new DataBase();

const Reminders = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);
  useEffect(() => {
    db.rawQuery('SELECT * FROM reminder', 'reminder').then((res) =>
      setReminders(res),
    );
  }, []);
  return (
    <ScrollView>
      <Card>
        {reminders.map((r) => {
          return (
            <ListItem
              key={r.id}
              title={r.title}
              onPress={() =>
                navigation.navigate('ReminderSetting', { reminder: r })
              }
              bottomDivider
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
