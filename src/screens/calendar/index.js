import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ToastAndroid,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { CalendarList } from 'react-native-jalali-calendars';
import jalaali from 'moment-jalaali';

// components
import SaveBleendingButton from '../../components/BleendingdaysSave';
import CancelButton from '../../components/CancelButton';
import Ptxt from '../../components/Ptxt';
import SubmitButton from '../../components/SubmitButton';

// utils and constants and store
import { FORMAT } from '../../constants/cycle';
import CycleModule from '../../util/cycle';
import { setBleedingDays } from '../../util/database/query';
import Tour from '../../util/tourGuide/Tour';
import { updatePerdictions, updatePeriodDays } from '../../store/actions/cycle';
import { calendarMarkedDatesObject } from '../../util/func';

// styles and images
import globalStyles from '../../styles';
import { COLOR, FONT } from '../../styles/static';
import MainBg from '../../../assets/images/main/calendarScreen.png';
import TeenagerBg from '../../../assets/images/teenager/calendarScreen.png';
import PartnerBg from '../../../assets/images/partner/calendarScreen.png';
import styles from './styles';

const Calendar = ({ navigation }) => {
  const today = jalaali();
  const cycle = useSelector((state) => state.cycle);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [markedDatesBeforeEdit, setMarkedDatesBeforeEdit] = useState({});

  const [appTourTargets, setAppTourTargets] = useState([]);
  const calendar = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      //headerTransparent: true,
      headerLeft: () => (
        // <Button
        //   title="امروز"
        //   type="outline"
        //   onPress={() => calendar.current.scrollToDay(new Date(), -200)}
        //   titleStyle={globalStyles.headerBtnTitle}
        //   containerStyle={globalStyles.smallHeaderBtn}
        // />
        <Icon
          reverse
          //raised
          size={20}
          name="go-to-day"
          type="parto"
          color={COLOR.purple}
          onPress={() => calendar.current.scrollToDay(new Date(), -200)}
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          {template !== 'Teenager' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: 90,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: FONT.medium,
                  fontSize: 11,
                }}>
                تخمک‌گذاری
              </Text>
              <View
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: COLOR.ovulationPerdictions,
                }}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: 100,
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: FONT.medium,
                fontSize: 11,
              }}>
              پیش‌بینی پریود
            </Text>
            <View
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: COLOR.periodPerdiction,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: 60,
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: FONT.medium,
                fontSize: 11,
              }}>
              پریود
            </Text>
            <View
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: COLOR.bleeding,
              }}
            />
          </View>
        </View>
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
      source={
        template === 'Teenager'
          ? TeenagerBg
          : template === 'Partner'
          ? PartnerBg
          : MainBg
      }
      style={{ height: '100%', width: '100%' }}>
      {/* <View style={{backgroundColor:'red',height:80}}>

        </View> */}
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
        calendarHeight={430}
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
          monthTextColor: template === 'Partner' ? COLOR.white : COLOR.black,
          // dayTextColor: COLOR.white,
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
              // borderBottomWidth: 0.2,
              backgroundColor: 'transparent',
            },
            monthView: {
              backgroundColor: 'rgba(255,255,255, 0.9)',
              borderRadius: 15,
              elevation: 2,
              padding: 10,
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
              //borderBottomWidth: 0.2,
              backgroundColor: 'rgba(255,255,255, 0.1)',
              justifyContent: 'center',
              alignSelf: 'center',
              //padding: 5,
              // paddingHorizontal: 20,
              margin: 10,
              borderRadius: 30,
              elevation: 1,
              width: 170,
            },
          },
          'stylesheet.day.single': {
            today: {
              borderRadius: 50,
              // backgroundColor: COLOR.today,
              backgroundColor: COLOR.purple,
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
