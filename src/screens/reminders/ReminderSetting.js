import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Button, ListItem, Icon as IconElement } from 'react-native-elements';
import { Icon } from 'native-base';
import setupNotifications from '../../util/notifications';
import { BREAST_EXAM } from '../../constants/reminders';
import Card from '../../components/Card';
import DateTimePicker from '../../components/DateTimePicker';
import PickerListItem from '../../components/PickerListItem';
import { COLOR } from '../../styles/static';
import { getReminder, saveReminder } from '../../util/database/query';
import globalStyles from '../../styles';
import styles from './Styles';

const d = new Date();
const ReminderSetting = ({ navigation, route }) => {
  const { reminder } = route.params;
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(`${d.getHours()}:${d.getMinutes()}`);
  const [hours, setHours] = useState(`${d.getHours()}`);
  const [minutes, setMinutes] = useState(`${d.getMinutes()}`);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(reminder.message);
  const [daysAgo, setDaysAgo] = useState(1);
  const [repeatType, setRepeatType] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
      ).then(() => {
        setupNotifications();
        navigation.pop();
      });
    };
  }, [daysAgo, hours, isActive, message, minutes, navigation, reminder, time]);

  useEffect(() => {
    getReminder(1, reminder.id).then((res) => {
      console.log('getReminder()', res);
      setData(res);
      if (res.length === 0) return;
      const [hour, minute] = res.custom_time.split(':');
      setIsActive(res.active ? true : false);
      setMessage(res.custom_message);
      setTime(res.custom_time);
      setMinutes(minute);
      setHours(hour);
      setDaysAgo(res.Xdays_ago);
      setIsLoading(false);
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
              <PickerListItem
                title="زمان"
                subtitle={
                  reminder.id === BREAST_EXAM
                    ? `هر ${daysAgo} روز یک‌بار ساعت ${hours}:${minutes}`
                    : `${daysAgo} روز قبل ساعت ${hours}:${minutes}`
                }
                leftIcon={
                  <Icon
                    type="FontAwesome"
                    name="calendar-check-o"
                    style={{ color: '#aaa' }}
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
