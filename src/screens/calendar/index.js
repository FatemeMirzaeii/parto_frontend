import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
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
import RtlSnackBar from '../../components/RtlSnackBar';
import { updatePerdictions, updatePeriodDays } from '../../store/actions/cycle';
import CalendarGuide from './CalendarGuide';
import CalendarBottomSheet from './CalendarBottomSheet';

//util
import CycleModule from '../../util/cycle';
import { setBleedingDays } from '../../util/database/query';
import { calendarMarkedDatesObject } from '../../util/func';
import useModal from '../../util/hooks/useModal';
import Tour from '../../util/tourGuide/Tour';

//styles
import { COLOR, FONT } from '../../styles/static';

//assets
import MainBg from '../../../assets/images/main/calendarScreen.png';
import PartnerBg from '../../../assets/images/partner/calendarScreen.png';
import TeenagerBg from '../../../assets/images/teenager/calendarScreen.png';
import styles from './styles';
import { FORMAT } from '../../constants/cycle';

const Calendar = ({ navigation }) => {
  const today = jalaali();
  const cycle = useSelector((state) => state.cycle);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today.format('YYYY-MM-DD'));
  const [markedDatesBeforeEdit, setMarkedDatesBeforeEdit] = useState({});
  const [editableDays, setEditableDays] = useState([]);

  const [appTourTargets, setAppTourTargets] = useState([]);

  const [snackVisible, setSnackVisible] = useState(false);

  const calendar = useRef();

  const bottomSheetRef = useRef(null);
  const { isVisible: guideIsVisible, toggle: toggleGuide } = useModal();

  Tour(appTourTargets, 'redDaysSave', 'CalendarTour');

  const onDayPress = (day) => {
    if (editMode) {
      edit(day.dateString);
    } else {
      setSelectedDate(day.dateString);
      bottomSheetRef.current.snapTo(1);
    }
  };
  const edit = async (dateString) => {
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
    if (dateString === today.format(FORMAT)) {
      const c = await CycleModule();
      const days = c.determineFutureEditableDays();
      setEditableDays(days);
    }
  };
  const onEditPress = () => {
    setMarkedDatesBeforeEdit(cycle.periodDays);
    dispatch(updatePerdictions(true));
    setEditMode(true);
  };
  const onSubmitEditing = async () => {
    if (cycle.isPregnant && Object.keys(cycle.periodDays).length === 0) {
      setSnackVisible(true);
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
    setEditableDays([]);
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
            [selectedDate]: { selected: true, selectedColor: 'red' },
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
                    !(dateString in markedDatesBeforeEdit) &&
                    editableDays.indexOf(dateString) === -1 ? (
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
              selected: {
                backgroundColor: COLOR.pink,
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
      <RtlSnackBar
        visible={snackVisible}
        message="سن بارداری و تاریخ زایمان شما براساس تاریخ آخرین پریود شما محاسبه می‌شود. لطفا تاریخ آخرین پریود خود را وارد نموده و یا از حالت بارداری خارج شوید."
        // todo: long message
        onDismiss={() => setSnackVisible(false)}
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[510, 300, 55]}
        borderRadius={50}
        renderContent={_renderContent}
        initialSnap={2}
        enabledBottomInitialAnimation
      />
      <CalendarGuide isVisible={guideIsVisible} toggle={toggleGuide} />
    </ImageBackground>
  );
};
export default Calendar;
