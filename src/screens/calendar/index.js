import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import jalaali from 'moment-jalaali';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ImageBackground,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { CalendarList } from 'react-native-jalali-calendars';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import { SvgCss } from 'react-native-svg';
import Carousel from 'react-native-snap-carousel';

// components
import SaveBleendingButton from '../../components/BleendingdaysSave';
import CancelButton from '../../components/CancelButton';
import DialogBox from '../../components/DialogBox';
import Ptxt from '../../components/Ptxt';
import SubmitButton from '../../components/SubmitButton';
import { updatePerdictions, updatePeriodDays } from '../../store/actions/cycle';

//assets
import MainBg from '../../../assets/images/main/calendarScreen.png';
import PartnerBg from '../../../assets/images/partner/calendarScreen.png';
import TeenagerBg from '../../../assets/images/teenager/calendarScreen.png';

//util
import CycleModule from '../../util/cycle';
import { setBleedingDays } from '../../util/database/query';
import { calendarMarkedDatesObject } from '../../util/func';
import useModal from '../../util/hooks/useModal';
import Tour from '../../util/tourGuide/Tour';
import { getTrackingOptionData } from '../../util/database/query';

//styles
import { COLOR, FONT, WIDTH } from '../../styles/static';
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
  const notesFlatlist = useRef(null);
  const trackedFlatlist = useRef(null);
  const bottomSheetRef = useRef(null);
  const isFocused = useIsFocused();
  const { isVisible, toggle } = useModal();
  const noteState = useSelector((state) => state.user.note);
  const infoArray =
    template !== 'Teenager'
      ? [
          { txt: 'پریود', color: COLOR.bleeding },
          { txt: 'پیش‌بینی پریود', color: COLOR.periodPerdiction },
          { txt: 'تخمک‌گذاری', color: COLOR.ovulationPerdictions },
        ]
      : [
          { txt: 'پریود', color: COLOR.bleeding },
          { txt: 'پیش‌بینی پریود', color: COLOR.periodPerdiction },
        ];

  Tour(appTourTargets, 'redDaysSave', 'CalendarTour');

  const getInitialData = useCallback(async () => {
    let y = [];
    const td = await getTrackingOptionData(selectedDate);
    console.log('td*********', td);
    for (let i = 0; i < td.length; i++) {
      const opt = td[i].options;
      console.log('opt*********', opt);
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
        console.log('day'),
      );
      // setArrofNotes(noteOfDay);
      noteOfDay.map((item) => {
        temp.push(noteState[item]);
      });
      setNotes(temp);
      console.log('day.noteOfDay*********', noteOfDay);
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
    console.log('day.noteOfDay*********', noteOfDay);
    return notes;
  };

  const onDayPress = (day) => {
    console.log('day*', day);
    if (editMode) {
      edit(day.dateString);
    } else {
      setSelectedDate(day.dateString);
      console.log('day.dateString*********', day.dateString);
      _getNotes;
    }
    console.log('today', day.dateString);
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

  const _handleOnNext = (ref) => {
    ref.current.snapToNext();
  };

  const _handleOnPrevious = (ref) => {
    ref.current.snapToPrev();
  };

  const notesRenderItem = ({ item }) => {
    return (
      <View
        style={{
          width: WIDTH - 30,
          backgroundColor: '#F3F4F9',
          marginTop: 10,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Icon
              containerStyle={{ marginLeft: 10 }}
              type="entypo"
              name="new-message"
              color={COLOR.icon}
            />
          </View>
        </View>
        <Text
          style={{
            // backgroundColor: 'red',
            height: 100,
            fontFamily: FONT.regular,
            fontSize: 12,
            width: WIDTH * 0.82,
          }}>
          {item.note}
        </Text>
      </View>
    );
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 510,
      }}>
      <View
        style={{
          backgroundColor: '#d1d1d1',
          width: 35,
          height: 3,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: 5,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: FONT.medium,
          fontSize: 16,
        }}>
        {jalaali(selectedDate).format('jYYYY/jM/jD')}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <Icon
          raised
          size={20}
          name="lady"
          type="parto"
          color={COLOR.pink}
          onPress={() => {
            jalaali(selectedDate).isBefore(today)
              ? navigation.navigate('TrackingOptions', {
                  day: selectedDate,
                })
              : ToastAndroid.show(
                  'امکان ثبت شرح حال برای روزهای آتی وجود ندارد.',
                  ToastAndroid.LONG,
                );
          }}
        />
        <Icon
          raised
          size={20}
          name="new-message"
          type="entypo"
          color={COLOR.pink}
          onPress={() =>
            navigation.navigate('Note', {
              day: selectedDate,
            })
          }
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: FONT.medium,
          fontSize: 14,
          marginTop: 10,
          marginBottom: 5,
          color: COLOR.listItemTxt,
          // backgroundColor: 'lightblue',
        }}>
        شرح‌حال
      </Text>
      <Divider />
      {trackedOptions.length > 0 ? (
        <>
          <View style={{ marginTop: 5, height: 110 }}>
            <Carousel
              ref={trackedFlatlist}
              inverted
              autoplay
              // loop
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              data={trackedOptions}
              setCurrentIndex
              onSnapToItem={(index) => setCurrentIndex(index)}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 80,
                    borderRadius: 50,
                  }}>
                  <SvgCss
                    key={`icon${index.toString()}`}
                    width="100%"
                    height="100%"
                    fill={item.color}
                    // fill={COLOR.icon}
                    xml={item.icon}
                  />
                </View>
              )}
              sliderWidth={WIDTH}
              //sliderHeight={100}
              itemWidth={70}
            />
            <View
              style={{
                // backgroundColor:'red',
                flexDirection: 'row',
                //alignItems: 'center',
                // justifyContent:'center',
                alignSelf: 'center',
                // bottom: 30,
              }}>
              <Icon
                raised
                size={10}
                name="back-arrow"
                type="parto"
                color={COLOR.icon}
                onPress={() => _handleOnNext(trackedFlatlist)}
              />
              <Text
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontFamily: FONT.medium,
                  color: COLOR.listItemTxt,
                  fontSize: 12,
                  marginHorizontal: 5,
                  //backgroundColor: 'lightgreen',
                }}>
                {trackedOptions[currentIndex].catName}:{' '}
                {trackedOptions[currentIndex].title}
              </Text>
              <Icon
                raised
                size={10}
                name="right"
                type="parto"
                color={COLOR.icon}
                onPress={() => _handleOnPrevious(trackedFlatlist)}
                // containerStyle={{ right: 0 }}
              />
            </View>
          </View>
        </>
      ) : (
        <Text
          style={{
            //textAlign: 'center',
            fontFamily: FONT.medium,
            color: COLOR.listItemTxt,
            fontSize: 12,
            padding: 20,
            // backgroundColor: 'lightgreen',
          }}>
          هنوز شرح‌حالی ثبت نشده است.
        </Text>
      )}

      <Text
        style={{
          textAlign: 'center',
          fontFamily: FONT.medium,
          fontSize: 14,
          marginTop: 20,
          color: COLOR.listItemTxt,
          //backgroundColor: 'pink',
        }}>
        یادداشت
      </Text>
      <Divider />
      {notes.length > 0 ? (
        <>
          <View style={{ marginTop: 5, height: 180 }}>
            <Carousel
              ref={notesFlatlist}
              inverted
              data={notes}
              renderItem={notesRenderItem}
              sliderWidth={WIDTH}
              itemWidth={WIDTH}
              onSnapToItem={(index) => setActiveIndex(index)}
            />
          </View>
          <View
            style={{
              // backgroundColor:'red',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              bottom: 30,
            }}>
            <Icon
              raised
              size={10}
              name="back-arrow"
              type="parto"
              color={COLOR.icon}
              onPress={() => _handleOnNext(notesFlatlist)}
            />
            <Text
              style={{
                textAlign: 'center',
                fontFamily: FONT.medium,
                fontSize: 12,
              }}>{`${activeIndex + 1}/${notes.length}`}</Text>
            <Icon
              raised
              size={10}
              name="right"
              type="parto"
              color={COLOR.icon}
              onPress={() => _handleOnPrevious(notesFlatlist)}
              // containerStyle={{ right: 0 }}
            />
          </View>
        </>
      ) : (
        <Text
          style={{
            //textAlign: 'center',
            fontFamily: FONT.medium,
            color: COLOR.listItemTxt,
            fontSize: 12,
            padding: 20,
            // backgroundColor: 'lightgreen',
          }}>
          هنوز یادداشتی ثبت نشده است.
        </Text>
      )}
    </View>
  );
  console.log('noteState,  ', noteState);

  console.log('tracked', trackedOptions);
  // console.log('arrofNotes', arrofNotes);
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
            onPress={() => toggle()}
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
        renderContent={renderContent}
        initialSnap={2}
      />
      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        onRequestClose={() => {
          return;
        }}
        text="راهنمای تقویم"
        icon={<Icon type="parto" name="info" color="#aaa" size={50} />}
        firstBtnTitle="بستن"
        firstBtnPress={toggle}>
        <View style={{ padding: 40 }}>
          {infoArray &&
            infoArray.map((item, index) => {
              return (
                <View
                  key={index.toString()}
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: FONT.medium,
                      fontSize: 12,
                    }}>
                    {item.txt}
                  </Text>
                  <View
                    style={{
                      width: 30,
                      height: 14,
                      borderRadius: 7,
                      backgroundColor: item.color,
                    }}
                  />
                </View>
              );
            })}
        </View>
      </DialogBox>
    </ImageBackground>
  );
};
export default Calendar;
