import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { Card, ListItem, Button, Input } from 'react-native-elements';
import DataBase from '../../components/Database';
import { toEnglishNumber, toPersianNum } from '../../app/Functions';
import styles from './Styles';
import PickerListItem from '../../components/PickerListItem';
import { TextInput } from 'react-native-gesture-handler';
const db = new DataBase();

const ReminderSetting = ({ navigation }) => {
  const [isActive, activate] = useState();
  const [time, setTime] = useState();
  const [text, setText] = useState('دو روز به سیکل بعدی باقی مانده است.');
  useEffect(() => {
    // db.rawQuery(
    //   'SELECT * FROM reminder WHERE type_id=1',
    //   'reminder',
    // ).then((n) => setReminders(n));
  }, []);
  return (
    <ScrollView>
      <Card>
        <ListItem
          title="فعال"
          //leftIcon={{ name: 'lock' }}
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
                  value={text}
                  onChangeText={setText}
                />
              }
              subtitle={text}
            />
            <PickerListItem
              TimePicker
              title="زمان"
              onTimeSelected={() => console.log('time', time)}
              //leftIcon={{ name: 'lock' }}
              rightTitle={{ title: time }}
            />
          </>
        ) : null}
      </Card>
    </ScrollView>
  );
};
export default ReminderSetting;
