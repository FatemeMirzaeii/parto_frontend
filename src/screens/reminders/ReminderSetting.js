import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import moment from 'moment';
import { useSelector } from 'react-redux';

// utils
import { setupNotifications } from '../../util/notifications';
import { getReminder, saveReminder } from '../../util/database/query';
import { DateContext } from '../../contexts';

//components
import Card from '../../components/Card';
import DateTimePicker from '../../components/DateTimePicker';
import PickerListItem from '../../components/PickerListItem';

//styles and constants
import { COLOR } from '../../styles/static';
import styles from './styles';
import { FORMAT } from '../../constants/cycle';
import { BREAST_EXAM } from '../../constants/reminders';

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
  const userId = useSelector((state) => state.user.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: reminder.title,
      headerLeft: () => (
        <Button
          title="ثبت"
          type="outline"
          onPress={save}
          containerStyle={[styles.btnContainer, { width: 50, height: 30 }]}
          buttonStyle={styles.button}
          titleStyle={styles.btnTitle}
          loadingStyle={{ color: COLOR.pink }}
        />
      ),
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

    const save = () => {
      let cusTime;
      reminder.id === BREAST_EXAM
        ? (cusTime = `${moment(today)
            .add(daysAgo, 'days')
            .format(FORMAT)}_${hours}:${minutes}`)
        : (cusTime = `${hours}:${minutes}`);
      saveReminder(
        userId,
        reminder.id,
        isActive,
        message,
        cusTime,
        daysAgo,
      ).then(() => {
        setupNotifications(userId);
        navigation.pop();
      });
    };
  }, [
    daysAgo,
    hours,
    isActive,
    message,
    minutes,
    navigation,
    reminder,
    today,
    userId,
  ]);

  useEffect(() => {
    getReminder(userId, reminder.id).then((res) => {
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
  }, [reminder.id, userId]);

  const determineRepeatType = (i) => {
    switch (i) {
      case 0: //daily
        setRepeatType(0);
        setDaysAgo(1);
        break;
      case 1: //weekly
        setRepeatType(1);
        setDaysAgo(7);
        break;
      case 2: //monthly
        setRepeatType(2);
        setDaysAgo(30);
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
                    ? `هر ${daysAgo} روز ساعت ${hours}:${minutes}`
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
