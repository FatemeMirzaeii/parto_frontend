import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  ToastAndroid,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import { CalendarList } from 'react-native-jalali-calendars';
import jalaali from 'moment-jalaali';
import BottomSheet from 'reanimated-bottom-sheet';

// components
import SaveBleendingButton from '../../components/BleendingdaysSave';
import CancelButton from '../../components/CancelButton';
import Ptxt from '../../components/Ptxt';
import SubmitButton from '../../components/SubmitButton';
import { updatePerdictions, updatePeriodDays } from '../../store/actions/cycle';
import CalendarGuide from './CalendarGuide';
import CalendarBottomSheet from './CalendarBottomSheet';

//util
import CycleModule from '../../util/cycle';
import { setBleedingDays } from '../../util/database/query';
import { calendarMarkedDatesObject } from '../../util/func';
import useModal from '../../util/hooks/useModal';
import Tour from '../../util/tourGuide/Tour';
import { getTrackingOptionData } from '../../util/database/query';

//styles
import { COLOR, FONT } from '../../styles/static';

//assets
import MainBg from '../../../assets/images/main/calendarScreen.png';
import PartnerBg from '../../../assets/images/partner/calendarScreen.png';
import TeenagerBg from '../../../assets/images/teenager/calendarScreen.png';
import styles from './styles';

const Calendar = ({ navigation }) => {
  const today = jalaali();
  const cycle = useSelector((state) => state.cycle);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today.format('YYYY-MM-DD'));
  const [markedDatesBeforeEdit, setMarkedDatesBeforeEdit] = useState({});

  const [appTourTargets, setAppTourTargets] = useState([]);
  const [trackedOptions, setTrackedOptions] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const calendar = useRef();

  const bottomSheetRef = useRef(null);
  const isFocused = useIsFocused();
  const { isVisible: guideIsVisible, toggle: toggleGuide } = useModal();
  const noteState = useSelector((state) => state.user.note);

  Tour(appTourTargets, 'redDaysSave', 'CalendarTour');

  const getInitialData = useCallback(async () => {
    let y = [];
    const td = await getTrackingOptionData(selectedDate);
    // console.log('td*********', td);
    for (let i = 0; i < td.length; i++) {
      const opt = td[i].options;
      // console.log('opt*********', opt);
      for (let j = 0; j < td.length; j++) {
        if (opt[j] && opt[j].selected.length > 0)
          y.push({
            catName: td[i].title,
            catIcon: td[i].icon,
            color: td[i].color,
            id: opt[j].id,
            title: opt[j].title,
            icon: opt[j].icon,
          });
      }
    }
    setTrackedOptions(y);
  }, [selectedDate]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData, isFocused]);

  useEffect(() => {
    const temp = [];
    if (noteState) {
      const noteOfDay = Object.keys(noteState).filter(
        (key) => noteState[key].day === selectedDate,
      );
      noteOfDay.map((item) => {
        temp.push(noteState[item]);
      });
      setNotes(temp);
    }
  }, [selectedDate, noteState]);

  const _getNotes = () => {
    const temp = [];
    const noteOfDay = Object.keys(noteState).filter(
      (key) => noteState[key].day === selectedDate,
      console.log('day'),
    );
    noteOfDay.map((item) => {
      temp.push(noteState[item]);
    });
    setNotes(temp);
    return notes;
  };

  const onDayPress = (day) => {
    if (editMode) {
      edit(day.dateString);
    } else {
      setSelectedDate(day.dateString);
      console.log('day.dateString*********', day.dateString);
      _getNotes;
    }
    setCurrentIndex(0);
    setActiveIndex(0);
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

  const _renderContent = () => (
    <CalendarBottomSheet navigation={navigation} selectedDate={selectedDate} />
  );

  return (
    <ImageBackground
      source={
        template === 'Teenager'
          ? TeenagerBg
          : template === 'Partner'
          ? PartnerBg
          : MainBg
      }
      style={{ height: '100%', width: '100%' }}>
      <View
        style={{
          backgroundColor:
            template === 'Partner'
              ? 'transparent'
              : 'rgba( 254, 254, 254, 0.4 )',
        }}>
        <View
          style={{
            marginTop: 30,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          {/* <Icon
            raised
            size={20}
            name="go-to-day"
            type="parto"
            color={COLOR.purple}
            onPress={() => calendar.current.scrollToDay(new Date())}
            containerStyle={{ right: 0 }}
          /> */}
          <Icon
            size={25}
            name="info"
            type="parto"
            color="white"
            onPress={() => toggleGuide()}
            containerStyle={{ right: 20 }}
          />
        </View>
        <CalendarList
          ref={calendar}
          jalali
          firstDay={6}
          showSixWeeks
          pastScrollRange={12}
          futureScrollRange={12}
          markedDates={{
            ...cycle.periodPerdictions,
            ...cycle.ovulationPerdictions,
            ...cycle.periodDays,
          }}
          markingType="custom"
          onDayPress={onDayPress}
          onDayLongPress={(day) => {
            console.log('day long press', day);
            bottomSheetRef.current.snapTo(0);
          }}
          calendarHeight={430}
          dayComponent={
            editMode
              ? ({ date, state, marking, onPress, onLongPress }) => {
                  const dateString = date.dateString;
                  return jalaali(dateString).isAfter(today) &&
                    !(dateString in markedDatesBeforeEdit) ? (
                    <Ptxt>
                      {dateString === '2021-03-22'
                        ? '2'
                        : jalaali(dateString).format('jD')}
                    </Ptxt>
                  ) : (
                    <TouchableOpacity
                      onPress={() => onPress(date)}
                      onLongPress={() => onLongPress(date)}>
                      <Ptxt
                        style={[
                          styles.editableDays,
                          {
                            color:
                              dateString in cycle.periodDays
                                ? COLOR.white
                                : COLOR.black,
                            backgroundColor:
                              dateString in cycle.periodDays
                                ? COLOR.bleeding
                                : 'transparent',
                          },
                        ]}>
                        {dateString === '2021-03-22'
                          ? '2'
                          : jalaali(dateString).format('jD')}
                      </Ptxt>
                    </TouchableOpacity>
                  );
                }
              : null
          }
          theme={{
            monthTextColor: template === 'Partner' ? COLOR.white : COLOR.black,
            dayTextColor: template === 'Partner' ? COLOR.white : COLOR.black,
            textSectionTitleColor: COLOR.black,
            todayTextColor: COLOR.black,
            todayBackgroundColor: COLOR.today,
            selectedDayTextColor: COLOR.white,
            textDisabledColor:
              template === 'Partner' ? COLOR.white : COLOR.textColorDark,
            textDayFontFamily: FONT.medium,
            textMonthFontFamily: FONT.bold,
            'stylesheet.calendar-list.main': {
              container: {
                backgroundColor: 'transparent',
              },
            },
            'stylesheet.calendar.main': {
              container: {
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
                marginBottom: 10,
                color: template === 'Partner' ? COLOR.white : COLOR.black,
              },
              rtlHeader: {
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255, 0.1)',
                justifyContent: 'center',
                alignSelf: 'center',
                margin: 10,
                borderRadius: 30,
                elevation: 1,
                width: 170,
              },
            },
            'stylesheet.day.single': {
              today: {
                borderRadius: 50,
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
            <SubmitButton
              addAppTourTarget={(appTourTarget) => {
                appTourTargets.push(appTourTarget);
              }}
              onPress={() => onSubmitEditing()}
            />
            <CancelButton
              addAppTourTarget={(appTourTarget) => {
                appTourTargets.push(appTourTarget);
              }}
              onPress={() => onCancelEditing()}
            />
          </>
        )}
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[510, 280, 55]}
        borderRadius={50}
        renderContent={_renderContent}
        initialSnap={2}
      />
      <CalendarGuide isVisible={guideIsVisible} toggle={toggleGuide} />
    </ImageBackground>
  );
};
export default Calendar;
