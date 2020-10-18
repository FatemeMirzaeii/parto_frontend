import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';

import { Button, ListItem, Icon as IconElement } from 'react-native-elements';
import { Icon } from 'native-base';
import moment from 'moment';
import Card from '../../components/Card';
import DateTimePicker from '../../components/DateTimePicker';
import PickerListItem from '../../components/PickerListItem';
import { COLOR, FONT } from '../../styles/static';
import { getReminder, saveReminder } from '../../util/database/query';
import CycleModule from '../../util/cycle';
import {
  OVULATION_DAY_NO,
  FORMAT,
  MIN_LENGTH_BETWEEN_PERIODS,
  OVULATION_WINDOW_LENGTH,
} from '../../constants/cycle';
import globalStyles from '../../styles';
import styles from './Styles';
import NotifService from '../../util/notifications/NotificationService';
import { periodLate } from '../../util/notifications';

const d = new Date();
const ReminderSetting = ({ navigation, route }) => {
  // const notif = new NotifService(onRegister, onNotif);

  const { reminder } = route.params;
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(`${d.getHours()}:${d.getMinutes()}`);
  const [hours, setHours] = useState(`${d.getHours()}`);
  const [minutes, setMinutes] = useState(`${d.getMinutes()}`);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(reminder.message);
  const [daysAgo, setDaysAgo] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: reminder.title,
      headerLeft: () => (
        <Button
          title="ثبت"
          type="outline"
          onPress={save}
          titleStyle={globalStyles.headerBtnTitle}
          containerStyle={globalStyles.smallHeaderBtn}
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
      saveReminder(
        reminder.id,
        isActive,
        message,
        hours,
        minutes,
        daysAgo,
      ).then(() => navigation.pop());
    };
  }, [
    daysAgo,
    hours,
    isActive,
    message,
    minutes,
    navigation,
    reminder.id,
    reminder.title,
    time,
  ]);

  useEffect(() => {
    getReminder(1, reminder.id).then((res) => {
      console.log('getReminder()000000', res);
      setData(res);
      if (res.length === 0) return;
      setIsActive(res.active === 1 ? true : false);
      setMessage(res.custom_message);
      setTime(res.custom_time);
      setMinutes(res.custom_time.split(':')[1]);
      setHours(res.custom_time.split(':')[0]);
      setDaysAgo(res.Xdays_ago);
      setIsLoading(false);
    });
  }, [reminder.id]);

  // useEffect(() => {
  //   console.log('data', data);
  //   console.log('active', isActive);
  //   console.log('mes', message);
  // }, [data, isActive, message]);
  console.log('res.custom_time.spli[0]', time.split(':')[0]);

  //  const periodStart = ()=>{
  //  const time=`${hours}:${minutes}`;
  //     const pd = '2020/8/20';
  //    // const time='19:50';
  //    // console.log('test',pd.subtract(daysAgo, 'days'))
  //   const d= moment(pd).subtract(2, 'days')._d
  //  return d

  //   }
  const initialData = async () => {
    const c = await CycleModule();
    const d = c.nextPeriodDate('2020-09-10');
    console.log(d);
    const n = moment(d).subtract(3, 'days').format(FORMAT);
    console.log(n);
    return d;
  };

  // console.log('test', moment(nextPeriodDate('2020-08-8')).subtract(daysAgo, 'days')._d)
  //  console.log('period', initialData())
  return (
    <ScrollView>
      {data && (
        <Card>
          <ListItem
            title="یادآور"
            leftIcon={
              <Icon
                type="MaterialIcons"
                name={isActive ? 'notifications-active' : 'notifications-off'}
                style={
                  isActive
                    ? { color: COLOR.btn }
                    : { color: COLOR.textColorDark }
                }
              />
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
                    />
                  }
                  bottomDivider={false}
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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
        }}>
        <Text style={{}}>Example app react-native-push-notification</Text>
        <View style={{}}></View>
        <TextInput
          style={{}}
          value={registerToken}
          placeholder="Register token"
          onChangeText={(text) => setRegisterToken(text)}
        />
        <View style={{}}></View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // notif.local(reminder.title, message);
            //periodStart(daysAgo)
            periodLate();
          }}>
          <Text>Local Notification (now)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{}}
          // onPress={() => {
          //   notif.local(reminder.title,message,'sample.mp3');
          // }}
          onPress={() => {
            // notif.scheduled(reminder.title, message, null, 'sample.mp3');
          }}>
          <Text> Scheduled Local Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // notif.getScheduledLocalNotifications((notifs) =>
            //   console.log(notifs),
            // );
          }}>
          <Text>Console.Log Scheduled Local Notifications</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default ReminderSetting;
