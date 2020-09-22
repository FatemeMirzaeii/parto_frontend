import { Icon } from 'native-base';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Button, ListItem, Icon as IconElement } from 'react-native-elements';
import Card from '../../components/Card';
import DateTimePicker from '../../components/DateTimePicker';
import PickerListItem from '../../components/PickerListItem';
import { USER_REMINDER } from '../../constants/database-tables';
import { COLOR } from '../../styles/static';
import DataBase from '../../util/database';
import styles from './Styles';

const db = new DataBase();
const d = new Date();
const ReminderSetting = ({ navigation, route }) => {
  const { reminder } = route.params;
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(`${d.getHours()}:${d.getMinutes()}`);
  const [hours, setHours] = useState(`${d.getHours()}`);
  const [minutes, setMinutes] = useState(`${d.getMinutes()}`);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(reminder.message);
  const [daysAgo, setDaysAgo] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: reminder.title,
      headerLeft: () => (
        <Button
          title="ثبت"
          type="clear"
          onPress={save}
          titleStyle={{ color: COLOR.btn }}
        />
      ),
      headerRight: () => (
        <IconElement
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
      console.log('time', time);
      db.rawQuery(
        `INSERT INTO ${USER_REMINDER} (reminder_id, user_id, active, custom_message , custom_time, Xdays_ago) VALUES 
        (${reminder.id}, ${1}, ${
          isActive ? 1 : 0
        }, '${message}', '${hours}:${minutes}', ${daysAgo}) ON CONFLICT (user_id, reminder_id) DO UPDATE SET active=${
          isActive ? 1 : 0
        }, custom_message='${message}', custom_time='${hours}:${minutes}', Xdays_ago=${daysAgo}`,
        [],
        USER_REMINDER,
      ).then(() => navigation.pop());
    };
  }, [isActive, message, hours, minutes, daysAgo, navigation, reminder.id]);

  useLayoutEffect(
    () => {
      db.rawQuery(
        `SELECT * FROM ${USER_REMINDER} WHERE reminder_id=${reminder.id}`,
        [],
        USER_REMINDER,
      ).then((res) => {
        if (res.rows !== 'EMPTY_TABLE') {
          //   const t=res.custom_time.split(':');
          // console.log('t', t);
          console.log('dddddetail', res);
          setData(res);
          //if(res.active ==1) setIsActive(true); else setIsActive(false);
          setIsActive(res.active === 1 ? true : false);
          //setIsActive(res.active );
          setMessage(res.custom_message);
          //  setHours(t[0]);
          //  setMinutes(t[1]);
          setTime(res.custom_time);
          setDaysAgo(res.Xdays_ago);
          setIsLoading(false);
        }
        console.log('active', isActive);
        console.log('mes', message);
        // console.log('hours', hours);
        // console.log('min', minutes);
      });
    },
    //[ isActive,reminder.id,]
    [reminder.id],
  );
  console.log('data', data);
  console.log('dataactive', data.active);
  return (
    <ScrollView>
      {data && (
        <Card>
          <ListItem
            title="یادآور"
            leftIcon={
              isActive ? (
                <Icon
                  type="MaterialIcons"
                  name="notifications-active"
                  style={{ color: COLOR.btn }}
                />
              ) : (
                <Icon
                  type="MaterialIcons"
                  name="notifications-off"
                  style={{ color: COLOR.textColorDark }}
                />
              )
            }
            switch={{
              value: isActive,
              onValueChange: setIsActive,
              trackColor: { true: COLOR.lightPink, false: '#aaa' },
              thumbColor: isActive ? COLOR.btn : '#f4f3f4',
            }}
            bottomDivider={isActive ? true : false}
            titleStyle={styles.listItemTitle}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
          />
          {isActive ? (
            <>
              <PickerListItem
                title="عنوان"
                bottomDivider
                leftIcon={
                  <Icon
                    type="Entypo"
                    name="new-message"
                    style={{ color: '#aaa' }}
                  />
                }
                customComponent={
                  <TextInput
                    multiline
                    selectionColor={COLOR.btn}
                    style={styles.inputMessage}
                    value={message}
                    onChangeText={setMessage}
                  />
                }
                subtitle={message}
              />
              {
                <PickerListItem
                  title="زمان"
                  subtitle={`${daysAgo} روز قبل ساعت ${hours}:${minutes}`}
                  leftIcon={
                    <Icon
                      type="FontAwesome"
                      name="calendar-check-o"
                      style={{ color: '#aaa' }}
                      bottomDivider={false}
                    />
                  }
                  customComponent={
                    <DateTimePicker
                      daySelectedItem={daysAgo}
                      onDaySelected={setDaysAgo}
                      hourSelectedItem={Number(hours)}
                      onHourSelected={setHours}
                      minSelectedItem={Number(minutes)}
                      onMinSelected={setMinutes}
                    />
                  }
                />
              }
            </>
          ) : null}
        </Card>
      )}
    </ScrollView>
  );
};
export default ReminderSetting;
