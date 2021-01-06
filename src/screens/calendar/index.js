import React, { useLayoutEffect, useRef, useState } from 'react';
import { ToastAndroid, ImageBackground, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { CalendarList } from 'react-native-jalali-calendars';
import jalaali from 'moment-jalaali';
import SaveBleendingButton from '../../components/BleendingdaysSave';
import CancelButton from '../../components/CancelButton';
import Ptxt from '../../components/Ptxt';
import SubmitButton from '../../components/SubmitButton';
import { FORMAT } from '../../constants/cycle';
import globalStyles from '../../styles';
import { COLOR, FONT } from '../../styles/static';
import CycleModule from '../../util/cycle';
import { setBleedingDays } from '../../util/database/query';
import Tour from '../../util/tourGuide/Tour';
import styles from './styles';
import { updatePerdictions, updatePeriodDays } from '../../store/actions/cycle';
import { calendarMarkedDatesObject } from '../../util/func';

const Calendar = ({ navigation }) => {
  const today = jalaali();
  const cycle = useSelector((state) => state.cycle);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [markedDatesBeforeEdit, setMarkedDatesBeforeEdit] = useState({});

  //to maryam: why should we use state if we don't need to setState?
  //can't we just use a variable?
  const [appTourTargets, setAppTourTargets] = useState([]);
  const calendar = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerLeft: () => (
        <Button
          title="امروز"
          type="outline"
          onPress={() => calendar.current.scrollToDay(new Date(), -200)}
          titleStyle={globalStyles.headerBtnTitle}
          containerStyle={globalStyles.smallHeaderBtn}
        />
      ),
    });
  }, [editMode, navigation]);

  Tour(appTourTargets, 'redDaysSave', 'CalendarTour');

  const onDayPress = (day) => {
    if (editMode) {
      edit(day.dateString);
    } else {
      navigation.navigate('TrackingOptions', { day: day.dateString });
    }
  };
  const edit = (dateString) => {
    if (dateString in cycle.periodDays) {
      const {
        [dateString]: {},
        ...periodDays
      } = cycle.periodDays;
      dispatch(updatePeriodDays(periodDays));
    } else {
      dispatch(
        updatePeriodDays({
          ...cycle.periodDays,
          [dateString]: calendarMarkedDatesObject(COLOR.bleeding, false),
        }),
      );
    }
  };
  const onEditPress = () => {
    setMarkedDatesBeforeEdit(cycle.periodDays);
    dispatch(updatePerdictions(true));
    setEditMode(true);
  };
  const onSubmitEditing = async () => {
    if (cycle.isPregnant && Object.keys(cycle.periodDays).length === 0) {
      ToastAndroid.show(
        'سن بارداری و تاریخ زایمان شما براساس تاریخ آخرین پریود شما محاسبه می‌شود. لطفا تاریخ آخرین پریود خود را وارد نموده و یا از حالت بارداری خارج شوید.',
        ToastAndroid.LONG,
      );
      return;
    }
    const c = await CycleModule();
    // console.log('before', markedDates, markedDatesBeforeEdit);
    const added = Object.keys(cycle.periodDays).filter(
      (key) => markedDatesBeforeEdit[key] !== cycle.periodDays[key],
    );
    console.log('added', added);

    const removed = Object.keys(markedDatesBeforeEdit).filter(
      (key) => markedDatesBeforeEdit[key] !== cycle.periodDays[key],
    );
    console.log('removed', removed);

    await setBleedingDays(added, removed);
    await c.determineLastPeriodDate();
    dispatch(updatePerdictions());
    setEditMode(false);
  };
  const onCancelEditing = () => {
    dispatch(updatePeriodDays(markedDatesBeforeEdit));
    dispatch(updatePerdictions());
    setEditMode(false);
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/bg.png')}
      style={{ height: '100%', width: '100%' }}
      blurRadius={50}>
      <CalendarList
        ref={calendar}
        jalali
        firstDay={6}
        showSixWeeks
        maxDate={editMode ? null : today.format(FORMAT)}
        pastScrollRange={12}
        futureScrollRange={12}
        markedDates={{
          ...cycle.periodDays,
          ...cycle.periodPerdictions,
          ...cycle.ovulationPerdictions,
        }}
        markingType="custom"
        onDayPress={onDayPress}
        onDayLongPress={(day) => console.log('day long press', day)}
        calendarHeight={400}
        dayComponent={
          editMode
            ? ({ date, state, marking, onPress, onLongPress }) => {
                // console.log('marking', marking.length, state);
                const dateString = date.dateString;
                return jalaali(dateString).isAfter(today) &&
                  !(dateString in markedDatesBeforeEdit) ? (
                  <Ptxt>{jalaali(dateString).format('jD')}</Ptxt>
                ) : (
                  <TouchableOpacity
                    onPress={() => onPress(date)}
                    onLongPress={() => onLongPress(date)}>
                    <Ptxt
                      style={[
                        styles.editableDays,
                        {
                          color:
                            dateString in cycle.periodDays || state === 'today'
                              ? COLOR.white
                              : COLOR.black,
                          backgroundColor:
                            dateString in cycle.periodDays
                              ? COLOR.bleeding
                              : state === 'today'
                              ? COLOR.today
                              : 'transparent',
                        },
                      ]}>
                      {jalaali(dateString).format('jD')}
                    </Ptxt>
                  </TouchableOpacity>
                );
              }
            : null
        }
        theme={{
          textSectionTitleColor: COLOR.black,
          todayTextColor: COLOR.white,
          todayBackgroundColor: COLOR.today,
          selectedDayTextColor: COLOR.white,
          textDisabledColor: COLOR.textColorDark,
          textDayFontFamily: FONT.medium,
          textMonthFontFamily: FONT.bold,
          'stylesheet.calendar-list.main': {
            container: {
              backgroundColor: 'transparent',
            },
          },
          'stylesheet.calendar.main': {
            container: {
              borderBottomWidth: 0.2,
              backgroundColor: 'transparent',
            },
            monthView: {
              backgroundColor: 'transparent',
            },
          },
          'stylesheet.calendar.header': {
            dayHeader: {
              width: 40,
              textAlign: 'center',
              fontFamily: FONT.medium,
              fontSize: 11,
            },
            rtlHeader: {
              alignItems: 'center',
              borderBottomWidth: 0.2,
            },
          },
          'stylesheet.day.single': {
            today: {
              borderRadius: 50,
              // backgroundColor: COLOR.today,
              elevation: 2,
            },
          },
        }}
      />
      {template === 'Partner' ? null : !editMode ? (
        <SaveBleendingButton
          addAppTourTarget={(appTourTarget) => {
            appTourTargets.push(appTourTarget);
          }}
          onPress={onEditPress}
        />
      ) : (
        <>
          {/* <Button
            title="ثبت"
            type="outline"
            onPress={onSubmitEditing}
            titleStyle={styles.buttonTitle}
            containerStyle={[
              styles.bottomButton,
              {
                alignSelf: 'flex-start',
                left: 10,
              },
            ]}
          /> */}
          <SubmitButton
            addAppTourTarget={(appTourTarget) => {
              appTourTargets.push(appTourTarget);
            }}
            onPress={() => onSubmitEditing()}
          />
          {/* <Button
            title="انصراف"
            type="outline"
            onPress={onCancelEditing}
            titleStyle={styles.buttonTitle}
            containerStyle={[
              styles.bottomButton,
              {
                alignSelf: 'flex-end',
                right: 10,
              },
            ]}
          /> */}
          <CancelButton
            addAppTourTarget={(appTourTarget) => {
              appTourTargets.push(appTourTarget);
            }}
            onPress={() => onCancelEditing()}
          />
        </>
      )}
    </ImageBackground>
  );
};
export default Calendar;
