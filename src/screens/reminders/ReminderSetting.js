import { Icon } from 'native-base';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Button, ListItem, Icon as IconElement } from 'react-native-elements';
import Card from '../../components/Card';
import DateTimePicker from '../../components/DateTimePicker';
import PickerListItem from '../../components/PickerListItem';
import { COLOR, FONT } from '../../styles/static';
import { getReminder, saveReminder } from '../../util/database/query';
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
  const [daysAgo, setDaysAgo] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: reminder.title,
      headerTitleStyle: {
        alignSelf: 'flex-end',
        color: 'black',
        fontSize: 17,
        fontFamily: FONT.medium,
      },
      headerLeft: () => (
        <Button
          title="ثبت"
          type="clear"
          onPress={save}
          titleStyle={{ color: COLOR.btn, fontFamily: FONT.regular }}
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
      setDaysAgo(res.Xdays_ago);
      setIsLoading(false);
    });
  }, [reminder.id]);

  // useEffect(() => {
  //   console.log('data', data);
  //   console.log('active', isActive);
  //   console.log('mes', message);
  // }, [data, isActive, message]);

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
    </ScrollView>
  );
};
export default ReminderSetting;
