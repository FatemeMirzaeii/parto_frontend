import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { CalendarList } from 'react-native-jalali-calendars';
import moment from 'moment';
import jalaali from 'moment-jalaali';
import { setBleedingDays } from '../../util/database/query';
import CycleModule from '../../util/cycle';
import { FONT, COLOR } from '../../styles/static';
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
    'سه شنبه',
    'چهارشنبه',
    'پنجشنبه',
    'جمعه',
  ];
  const calendar = useRef();
  useEffect(() => {
    navigation.addListener('focus', () => {
      markBleedingDays();
      markPerdictions();
    });
  }, [navigation, editMode]);

  useEffect(() => {
    markBleedingDays();
    markPerdictions();
  }, [editMode]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <>
          {editMode ? (
            <Button
              title="ثبت"
              type="clear"
              onPress={() => onSubmitEditing()}
              titleStyle={{ color: COLOR.btn, fontFamily: FONT.regular }}
            />
          ) : null}
        </>
      ),
      headerRight: () => (
        <>
          {editMode ? (
            <Button
              title="بیخیال"
              type="clear"
              onPress={() => onCancelEditing()}
              titleStyle={{ color: COLOR.btn, fontFamily: FONT.regular }}
            />
          ) : null}
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

    await setBleedingDays(added, removed);
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
      if (date in markedDates) return;
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
      const formatted = past.map((day) => day.date.format('YYYY-MM-DD'));
      markedDateObj(formatted, COLOR.btn);
    }
  };
  const markPerdictions = async () => {
    //todo: should disable in pregnant mode.
    const c = await CycleModule();
    const bleeding = c.perdictedPeriodDaysInCurrentYear();
    markedDateObj(bleeding, COLOR.periodPerdiction);

    const ovulation = c.perdictedOvulationDaysInCurrentYear();
    markedDateObj(ovulation, COLOR.tiffany);
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
        jalali
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
                console.log('marking', marking);
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
                            marking.length !== 0 &&
                            marking.periods[0].color === COLOR.btn
                              ? COLOR.white
                              : state === 'disabled'
                              ? COLOR.textColor
                              : COLOR.textColorDark,
                          backgroundColor:
                            marking.length !== 0 &&
                            marking.periods[0].color === COLOR.btn
                              ? marking.periods[0].color
                              : state === 'today'
                              ? COLOR.currentPage
                              : COLOR.white,
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
          textSectionTitleColor: COLOR.black,
          todayTextColor: COLOR.white,
          todayBackgroundColor: COLOR.currentPage,
          selectedDayTextColor: COLOR.white,
          // selectedDayBackgroundColor: COLOR.currentPage,
          textDisabledColor: COLOR.textColor,
          textDayFontFamily: FONT.regular,
          textMonthFontFamily: FONT.regular,
          textDayHeaderFontFamily: FONT.regular,
          textDayHeaderFontSize: 8.7,
          // 'stylesheet.calendar.main': {
          //   container: {
          //     borderBottomWidth: 0.5,
          //     borderColor: 'gray',
          //   },
          // },
        }}
      />
      {!editMode ? (
        <Button
          title="ویرایش"
          type="outline"
          onPress={() => onEditPress()}
          titleStyle={{
            color: COLOR.white,
            fontFamily: FONT.regular,
          }}
          containerStyle={[
            styles.bottomButton,
            {
              alignSelf: 'flex-end',
              right: 10,
            },
          ]}
        />
      ) : null}
      <Button
        title="امروز"
        type="outline"
        onPress={() => calendar.current.scrollToDay(new Date())}
        titleStyle={{
          color: COLOR.white,
          fontFamily: FONT.regular,
        }}
        containerStyle={[
          styles.bottomButton,
          {
            alignSelf: 'flex-start',
            left: 10,
          },
        ]}
      />
    </SafeAreaView>
  );
};
export default Calendar;
