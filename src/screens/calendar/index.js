import moment from 'moment';
import jalaali from 'moment-jalaali';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { CalendarList } from 'react-native-jalali-calendars';
import { useDispatch, useSelector } from 'react-redux';
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
import testIDs from './testIDs';

const Calendar = ({ navigation }) => {
  const cycle = useSelector((state) => state.cycle);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [markedDatesBeforeEdit, setMarkedDatesBeforeEdit] = useState({});
  const [appTourTargets, setAppTourTargets] = useState([]);
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
      headerTransparent: true,
      headerLeft: () => (
        <Button
          title="امروز"
          type="outline"
          onPress={() => calendar.current.scrollToDay(new Date())}
          titleStyle={globalStyles.headerBtnTitle}
          containerStyle={globalStyles.smallHeaderBtn}
        />
        // <GoTodayButton
        //   addAppTourTarget={(appTourTarget) => {
        //     appTourTargets.push(appTourTarget);
        //   }}
        //   onPress={() => calendar.current.scrollToDay(new Date())}
        // />
      ),
    });
  }, [editMode, navigation, markedDates]);

  Tour(appTourTargets, 'redDaysSave', 'CalendarTour');

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
      markedDateObj([dateString], COLOR.bleeding);
    }
  };
  const onEditPress = () => {
    setMarkedDatesBeforeEdit(markedDates);
    setEditMode(true);
  };
  const onSubmitEditing = async () => {
    setMarkedDates({});

    const c = await CycleModule();
    // console.log('before', markedDates, markedDatesBeforeEdit);
    const added = Object.keys(markedDates).filter(
      (key) => markedDatesBeforeEdit[key] !== markedDates[key],
    );
    // console.log('added', added);

    const removed = Object.keys(markedDatesBeforeEdit).filter(
      (key) => markedDatesBeforeEdit[key] !== markedDates[key],
    );
    // console.log('removed', removed);

    await setBleedingDays(added, removed);
    await c.determineLastPeriodDate();
    setEditMode(false);
  };
  const onCancelEditing = () => {
    setMarkedDates(markedDatesBeforeEdit);
    setEditMode(false);
  };
  const markedDateObj = (dates, color, perdictions) => {
    // console.log('marked dates', dates, color, perdictions);
    dates.forEach((date) => {
      if (date in markedDates) return;
      markedDates[date] = {
        periods: [
          {
            startingDay: perdictions,
            color: color,
            endingDay: perdictions,
          },
        ],
      };
    });
    setMarkedDates({ ...markedDates });
  };
  const markBleedingDays = async () => {
    markedDateObj(cycle.periodDays, COLOR.bleeding, false);
  };
  const markPerdictions = async () => {
    if (cycle.isPregnant) return;
    markedDateObj(cycle.ovulationPerdictions, COLOR.tiffany, true);
    markedDateObj(cycle.periodPerdictions, COLOR.periodPerdiction, true);
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
        testID={testIDs.calendarList.CONTAINER}
        maxDate={moment().format(FORMAT)}
        pastScrollRange={12}
        futureScrollRange={12}
        markedDates={markedDates}
        markingType="multi-period"
        onDayPress={onDayPress}
        onDayLongPress={(day) => console.log('day long press', day)}
        calendarHeight={400}
        dayComponent={
          editMode
            ? ({ date, state, marking, onPress, onLongPress }) => {
                // console.log('marking', marking);
                return state === 'disabled' ? (
                  <Ptxt>{jalaali(date.dateString).format('jD')}</Ptxt>
                ) : (
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
                            (marking.length !== 0 &&
                              marking.periods[0].color === COLOR.bleeding) ||
                            state === 'today'
                              ? COLOR.white
                              : COLOR.black,
                          backgroundColor:
                            marking.length !== 0 &&
                            marking.periods[0].color === COLOR.bleeding
                              ? marking.periods[0].color
                              : state === 'today'
                              ? COLOR.today
                              : 'transparent',
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
          todayBackgroundColor: COLOR.tiffany,
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
              fontFamily: FONT.medium,
              fontSize: 12,
            },
            rtlHeader: {
              alignItems: 'center',
              borderBottomWidth: 0.2,
            },
          },
          'stylesheet.day.basic': {
            today: {
              borderColor: COLOR.today,
              borderWidth: 0.8,
              borderRadius: 50,
              backgroundColor: COLOR.today,
              // borderStyle: 'dashed',
            },
            todayText: {
              color: COLOR.white,
              fontWeight: '900',
            },
          },
        }}
      />
      {!editMode ? (
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
