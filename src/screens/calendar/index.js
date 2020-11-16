import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { CalendarList } from 'react-native-jalali-calendars';
import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour';
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
import { FORMAT } from '../../constants/cycle';
import { storeData, getData } from '../../util/func';
import { updatePeriodDays } from '../../store/actions/cycle';

const Calendar = ({ navigation }) => {
  const cycle = useSelector((state) => state.cycle);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [markedDatesBeforeEdit, setMarkedDatesBeforeEdit] = useState({});
  const [appTourTargets, setAppTourTargets] = useState([]);
  const [appTour, setAppTour] = useState(true);
  const calendar = useRef();

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
      ),
    });
  }, [editMode, navigation]);

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
          [dateString]: markedDateObj(COLOR.bleeding, false),
        }),
      );
    }
  };
  const onEditPress = () => {
    setMarkedDatesBeforeEdit(cycle.periodDays);
    setEditMode(true);
  };
  const onSubmitEditing = async () => {
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
    setEditMode(false);
  };
  const onCancelEditing = () => {
    dispatch(updatePeriodDays(markedDatesBeforeEdit));
    setEditMode(false);
  };
  const markedDateObj = (color, dashed) => {
    return {
      periods: [
        {
          startingDay: dashed,
          color: color,
          endingDay: dashed,
        },
      ],
    };
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
        maxDate={jalaali().format(FORMAT)}
        pastScrollRange={12}
        futureScrollRange={12}
        markedDates={{
          ...cycle.periodDays,
          ...cycle.periodPerdictions,
          ...cycle.ovulationPerdictions,
        }}
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
