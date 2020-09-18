import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Card from '../../components/Card';
import { COLOR } from '../../styles/static';
import DataBase from '../../util/database';
import styles from './Styles';
const db = new DataBase();

const Reminders = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);
  useEffect(() => {
    db.rawQuery('SELECT * FROM reminder', 'reminder').then((res) =>
      setReminders(res),
    );
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
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
