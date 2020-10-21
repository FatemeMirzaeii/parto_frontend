import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import { Button } from 'react-native-elements';
import { CalendarList } from 'react-native-jalali-calendars';
import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour';
import moment from 'moment';
import jalaali from 'moment-jalaali';
import { setBleedingDays } from '../../util/database/query';
import CycleModule from '../../util/cycle';
import { FONT, COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';
import Ptxt from '../../components/Ptxt';
import CancelButton from '../../components/CancelButton';
import SubmitButton from '../../components/SubmitButton';
import SaveBleendingButton from '../../components/BleendingdaysSave';
import testIDs from './testIDs';
import { FORMAT } from '../../constants/cycle';
import { storeData, getData } from '../../util/func';

const Calendar = ({ navigation, route }) => {
  const { isPregnant } = route.params;
  const [editMode, setEditMode] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [markedDatesBeforeEdit, setMarkedDatesBeforeEdit] = useState({});
  const [appTourTargets, setAppTourTargets] = useState([]);
  const [appTour, setAppTour] = useState(true);
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

  useEffect(() => {
    registerSequenceStepEvent();
    registerFinishSequenceEvent();
  }, []);

  useEffect(() => {
    if (!appTour) {
      let appTourSequence = new AppTourSequence();
      setTimeout(() => {
        appTourTargets.forEach((appTourTarget) => {
          appTourSequence.add(appTourTarget);
        });
        AppTour.ShowSequence(appTourSequence);
      }, 100);
      return () => clearTimeout(appTourSequence);
    }
  }, [editMode, appTour]);

  const registerSequenceStepEvent = () => {
    if (sequenceStepListener) {
      sequenceStepListener.remove();
    }
    const sequenceStepListener = DeviceEventEmitter.addListener(
      'onShowSequenceStepEvent',
      (e) => {
        console.log(e);
      },
    );
  };
  useEffect(() => {
    checkIfAppTourIsNeeded();
  }, []);
  const registerFinishSequenceEvent = () => {
    if (finishSequenceListener) {
      finishSequenceListener.remove();
    }
    const finishSequenceListener = DeviceEventEmitter.addListener(
      'onFinishSequenceEvent',
      async (e) => {
        console.log(e);
        console.log('appTourTargets.key', appTourTargets);
        const t = appTourTargets.filter((i) => {
          i.key === 'redDaysSave';
        });
        console.log('t', t);
        //  if (appTourTargets.filter((i)=>{i.key.includes('goCall')}))
        await storeData('CalendarTour', 'true');
      },
    );
  };
  const checkIfAppTourIsNeeded = async () => {
    const a = await getData('CalendarTour');
    console.log('aaaa', a);
    setAppTour(a);
  };
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
    const c = await CycleModule();
    const past = await c.pastBleedingDays();
    if (past) {
      const formatted = past.map((day) => day.date.format(FORMAT));
      markedDateObj(formatted, COLOR.bleeding, false);
    }
  };
  const markPerdictions = async () => {
    if (isPregnant) return;
    const c = await CycleModule();
    const ovulation = c.perdictedOvulationDaysInCurrentYear();
    markedDateObj(ovulation, COLOR.tiffany, true);

    const bleeding = c.perdictedPeriodDaysInCurrentYear();
    markedDateObj(bleeding, COLOR.periodPerdiction, true);
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
        // <Button
        //   title="ویرایش روزهای خونریزی"
        //   type="outline"
        //   onPress={onEditPress}
        //   titleStyle={styles.buttonTitle}
        //   containerStyle={[
        //     styles.bottomButton,
        //     {
        //       alignSelf: 'center',
        //     },
        //   ]}
        // />
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
