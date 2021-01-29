import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import moment from 'moment';
import setupNotifications from '../../util/notifications';
import { BREAST_EXAM } from '../../constants/reminders';
import { DateContext } from '../../contexts';
import Card from '../../components/Card';
import DateTimePicker from '../../components/DateTimePicker';
import PickerListItem from '../../components/PickerListItem';
import { COLOR } from '../../styles/static';
import { getReminder, saveReminder } from '../../util/database/query';
import globalStyles from '../../styles';
import styles from './Styles';
import { FORMAT } from '../../constants/cycle';

const d = new Date();
const ReminderSetting = ({ navigation, route }) => {
  const { reminder } = route.params;
  const { today } = useContext(DateContext);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(`${d.getHours()}:${d.getMinutes()}`);
  const [hours, setHours] = useState(`${d.getHours()}`);
  const [minutes, setMinutes] = useState(`${d.getMinutes()}`);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(reminder.message);
  const [daysAgo, setDaysAgo] = useState(1);
  const [repeatType, setRepeatType] = useState();

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
    const save = () => {
      let cusTime;
      reminder.id === BREAST_EXAM
        ? (cusTime = `${moment(today)
            .add(daysAgo, 'days')
            .format(FORMAT)}_${hours}:${minutes}`)
        : (cusTime = `${hours}:${minutes}`);
      saveReminder(reminder.id, isActive, message, cusTime, daysAgo).then(
        () => {
          setupNotifications();
          navigation.pop();
        },
      );
    };
  }, [
    daysAgo,
    hours,
    isActive,
    message,
    minutes,
    navigation,
    reminder,
    repeatType,
    today,
  ]);

  useEffect(() => {
    getReminder(1, reminder.id).then((res) => {
      console.log('getReminder()', res);
      setData(res);
      if (res.length === 0) return;
      const t = res.custom_time.slice(
        res.custom_time.indexOf('_') + 1,
        res.custom_time.length,
      );
      const [hour, minute] = t.split(/:/);
      setIsActive(res.active ? true : false);
      setMessage(res.custom_message);
      setTime(res.custom_time);
      setMinutes(minute);
      setHours(hour);
      setDaysAgo(res.Xdays_ago);
    });
  }, [reminder.id]);

  const determineRepeatType = (i) => {
    switch (i) {
      case 0: //monthly
        setRepeatType(0);
        setDaysAgo(30);
        break;
      case 1: //weekly
        setRepeatType(1);
        setDaysAgo(7);
        break;
      case 2: //daily
        setRepeatType(2);
        setDaysAgo(1);
        break;
      default:
        break;
    }
  };
  return (
    <ScrollView>
      {data && (
        <Card>
          <ListItem
            title="یادآور"
            leftIcon={
              <Icon
                type="material"
                name={isActive ? 'notifications-active' : 'notifications-off'}
                color={isActive ? COLOR.btn : COLOR.textColorDark}
              />
            }
            switch={{
              value: isActive,
              onValueChange: setIsActive,
              trackColor: { true: COLOR.lightPink, false: '#aaa' },
              thumbColor: isActive ? COLOR.btn : '#f4f3f4',
            }}
            bottomDivider={isActive}
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
                  <Icon type="entypo" name="new-message" color="#aaa" />
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
              <PickerListItem
                title="زمان"
                subtitle={
                  reminder.id === BREAST_EXAM
                    ? `هر ${daysAgo} روز یک‌بار ساعت ${hours}:${minutes}`
                    : `${daysAgo} روز قبل ساعت ${hours}:${minutes}`
                }
                leftIcon={
                  <Icon
                    type="font-awesome"
                    name="calendar-check-o"
                    color="#aaa"
                  />
                }
                customComponent={
                  <DateTimePicker
                    isFrequent={reminder.id === BREAST_EXAM}
                    daySelectedItem={
                      reminder.id === BREAST_EXAM ? repeatType : daysAgo
                    }
                    onDaySelected={
                      reminder.id === BREAST_EXAM
                        ? determineRepeatType
                        : setDaysAgo
                    }
                    hourSelectedItem={Number(hours)}
                    onHourSelected={setHours}
                    minSelectedItem={Number(minutes)}
                    onMinSelected={setMinutes}
                  />
                }
              />
            </>
          ) : null}
        </Card>
      )}
    </ScrollView>
  );
};
export default ReminderSetting;
