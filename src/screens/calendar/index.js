import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { CalendarList } from 'react-native-jalali-calendars';
import moment from 'moment';
import jalaali from 'moment-jalaali';
import { setBleedingDays } from '../../lib/database/query';
import CycleModule from '../../lib/cycle';
import { FONT, SIZE, COLOR } from '../../styles/static';
import styles from './styles';
import Ptxt from '../../components/Ptxt';
const Calendar = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [markedDatesBeforeEdit, setMarkedDatesBeforeEdit] = useState({});
  const weekdays = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه نشبه',
    'چهارشنبه',
    'پنجشنبه',
    'جمعه',
  ];
  const calendar = useRef();
  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     console.log('focus cal');
  //     markBleedingDays();
  //     markPerdictions();
  //   });
  // }, [navigation]);

  useEffect(() => {
    markBleedingDays();
    markPerdictions();
  }, [editMode]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <Button
          title="امروز"
          type="clear"
          onPress={() => calendar.current.scrollToDay(new Date())}
          titleStyle={{ color: 'tomato' }}
        />
      ),
      headerRight: () => (
        <>
          {editMode ? (
            <View style={{ flexDirection: 'row' }}>
              <Button
                title="ثبت"
                type="clear"
                onPress={() => onSubmitEditing()}
                titleStyle={{ color: 'tomato' }}
              />
              <Button
                title="بیخیال"
                type="clear"
                onPress={() => onCancelEditing()}
                titleStyle={{ color: 'tomato' }}
              />
            </View>
          ) : (
            <Icon
              name="edit"
              type="antdesign"
              onPress={() => onEditPress()}
              color="tomato"
              iconStyle={{ margin: 10 }}
            />
          )}
        </>
      ),
    });
  }, [editMode, navigation, markedDates]);
  const onDayPress = (day) => {
    if (editMode) {
      edit(day.dateString);
    } else {
      navigation.navigate('TrackingOptions', { day: day.dateString });
    }
  };
  const edit = (dateString) => {
    if (dateString in markedDates) {
      delete markedDates[dateString];
      setMarkedDates({ ...markedDates });
    } else {
      markedDateObj([dateString], COLOR.btn);
    }
  };
  const onEditPress = () => {
    setMarkedDatesBeforeEdit(markedDates);
    setEditMode(true);
  };
  const onSubmitEditing = async () => {
    const c = await CycleModule();
    console.log('before', markedDates, markedDatesBeforeEdit);
    const added = Object.keys(markedDates).filter(
      (key) => markedDatesBeforeEdit[key] !== markedDates[key],
    );
    console.log('added', added);
    const removed = Object.keys(markedDatesBeforeEdit).filter(
      (key) => markedDatesBeforeEdit[key] !== markedDates[key],
    );
    console.log('removed', removed);

    setBleedingDays(added, removed);
    await c.determineLastPeriodDate();
    setEditMode(false);
  };
  const onCancelEditing = () => {
    setMarkedDates(markedDatesBeforeEdit);
    setEditMode(false);
  };
  const markedDateObj = (dates, color) => {
    console.log('marked dates', dates);

    dates.forEach((date) => {
      markedDates[date] = {
        periods: [
          {
            color: color,
          },
        ],
      };
    });
    setMarkedDates({ ...markedDates });
  };
  const markBleedingDays = async () => {
    const c = await CycleModule();
    const past = await c.pastBleedingDays();
    if (past) {
      const formatted = past.map((day) => day.format('YYYY-MM-DD'));
      markedDateObj(formatted, COLOR.btn);
    }
  };
  const markPerdictions = async () => {
    const c = await CycleModule();
    const bleeding = c.perdictedPeriodDaysInCurrentYear();
    markedDateObj(bleeding, COLOR.bgColor);

    const ovulation = c.perdictedOvulationDaysInCurrentYear();
    markedDateObj(ovulation, COLOR.currentPage);
  };
  return (
    <SafeAreaView>
      {/* <View style={styles.dayNames}>
        {weekdays.map((day) => (
          <Ptxt style={styles.txt}>{day}</Ptxt>
        ))}
      </View> */}
      <CalendarList
        ref={calendar}
        jalali={true}
        firstDay={6}
        // hideDayNames={true}
        maxDate={moment().format('YYYY-MM-DD')}
        pastScrollRange={12}
        futureScrollRange={12}
        markedDates={markedDates}
        markingType="multi-period"
        onDayPress={(day) => onDayPress(day)}
        onDayLongPress={(dsy) => console.log('day long press', dsy)}
        dayComponent={
          editMode
            ? ({ date, state, marking, onPress, onLongPress }) => {
                return (
                  <TouchableOpacity
                    onPress={state === 'disabled' ? null : () => onPress(date)}
                    onLongPress={
                      state === 'disabled' ? null : () => onLongPress(date)
                    }>
                    <Ptxt
                      style={[
                        styles.editableDays,
                        {
                          color:
                            state === 'disabled'
                              ? COLOR.textColor
                              : COLOR.textColorDark,
                          backgroundColor:
                            state === 'today'
                              ? COLOR.currentPage
                              : marking.length !== 0
                              ? marking.periods[0].color
                              : 'white',
                        },
                      ]}>
                      {jalaali(date.dateString).format('jD')}
                    </Ptxt>
                  </TouchableOpacity>
                );
              }
            : null
        }
        theme={{
          textSectionTitleColor: '#35036B',
          todayTextColor: 'white',
          todayBackgroundColor: COLOR.currentPage,
          selectedDayTextColor: 'white',
          selectedDayBackgroundColor: COLOR.currentPage,
          textDisabledColor: COLOR.textColor,
          textDayFontFamily: FONT.regular,
          textMonthFontFamily: FONT.regular,
          textDayHeaderFontFamily: FONT.regular,
          textDayHeaderFontSize: SIZE[7],
          'stylesheet.calendar.main': {
            container: {
              borderBottomWidth: 2,
              borderColor: '#f6f6f6',
            },
          },
        }}
      />
      {/* <Button
        type="solid"
        title="ویرایش روزهای پریود"
        onPress={() => setEditMode(true)}
        containerStyle={{
          position: 'absolute',
          bottom: 25,
          alignSelf: 'center',
          borderRadius: 40,
          backgroundColor: COLOR.btn,
        }}
        buttonStyle={{ backgroundColor: COLOR.btn }}
        titleStyle={{ fontFamily: FONT.regular, fontSize: SIZE[14] }}
      /> */}
    </SafeAreaView>
  );
};
export default Calendar;
