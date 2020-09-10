import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import DataBase from '../../util/database';
import PickerListItem from '../../components/PickerListItem';
import styles from './Styles';
import { COLOR } from '../../styles/static';
const db = new DataBase();

const ReminderSetting = ({ navigation, route }) => {
  const { reminder } = route.params;
  const [isActive, activate] = useState();
  const [time, setTime] = useState();
  const [message, setMessage] = useState(reminder.message);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: reminder.title,
      headerRight: () => (
        <Button
          title="ثبت"
          type="clear"
          onPress={() => save()}
          titleStyle={{ color: COLOR.btn }}
        />
      ),
    });
    const save = () => {
      db.rawQuery(
        `INSERT INTO user_reminder (reminder_id, activate, custom_message) VALUES (${
          reminder.id
        }, ${isActive ? 1 : 0}, '${message}')
        ON CONFLICT(reminder_id) DO UPDATE SET activate=${
          isActive ? 1 : 0
        }, custom_message='${message}'`,
        'user_reminder',
      ).then(() => navigation.pop());
    };
  }, [isActive, message, navigation, reminder.id, reminder.title]);

  useEffect(() => {
    db.rawQuery(
      `SELECT * FROM user_reminder WHERE reminder_id=${reminder.id}`,
      'user_reminder',
    ).then((n) => {
      if (n.rows !== 'EMPTY_TABLE') {
        console.log('dddddetail', n);
        setMessage(n.custom_message);
      }
    });
  }, [reminder.id]);
  return (
    <ScrollView>
      <Card>
        <ListItem
          title="فعال"
          switch={{
            value: isActive,
            onValueChange: activate,
          }}
          bottomDivider
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        {isActive ? (
          <>
            <PickerListItem
              title="متن"
              customComponent={
                <TextInput
                  multiline
                  style={{
                    elevation: 2,
                    backgroundColor: '#f6f6f6',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    minHeight: 100,
                    textAlignVertical: 'top',
                  }}
                  value={message}
                  onChangeText={setMessage}
                />
              }
              subtitle={message}
            />
            <PickerListItem
              TimePicker
              title="زمان"
              onTimeSelected={setTime}
              rightTitle={{
                title: time ? `${time.getHours()}:${time.getMinutes()}` : null,
              }}
            />
          </>
        ) : null}
      </Card>
    </ScrollView>
  );
};
export default ReminderSetting;
