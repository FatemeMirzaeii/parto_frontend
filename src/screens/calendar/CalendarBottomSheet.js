import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Divider } from 'react-native-elements';
import jalaali from 'moment-jalaali';
import { SvgCss } from 'react-native-svg';
import Carousel from 'react-native-snap-carousel';
import { getTrackingOptionData } from '../../util/database/query';
import { COLOR, WIDTH } from '../../styles/static';
import styles from './styles';

const CalendarBottomSheet = ({ navigation, selectedDate }) => {
  const today = jalaali();
  const isFocused = useIsFocused();
  const noteslistRef = useRef(null);
  const trackedlistRef = useRef(null);
  const [trackedOptions, setTrackedOptions] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const noteStore = useSelector((state) => state.user.note);

  const getInitialData = useCallback(async () => {
    //todo: should review function
    let y = [];
    const td = await getTrackingOptionData(selectedDate);
    for (let i = 0; i < td.length; i++) {
      const opt = td[i].options;
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
    if (noteStore) {
      setNotes(
        Object.values(noteStore).filter(
          (item) => item.date === selectedDate && item.state === 1,
        ),
      );
    }
  }, [selectedDate, noteStore]);

  const _handleOnNext = (ref) => {
    ref.current.snapToNext();
  };

  const _handleOnPrevious = (ref) => {
    ref.current.snapToPrev();
  };

  const _notesRenderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback
        style={styles.noteListWrapper}
        onPress={() =>
          navigation.navigate('NoteEdit', { date: selectedDate, note: item })
        }>
        <View style={styles.noteTitleBox}>
          <View style={styles.row}>
            <Text style={styles.dialogBoxTxt}>{item.title}</Text>
            <Icon
              containerStyle={styles.icon}
              type="entypo"
              name="new-message"
              color={COLOR.icon}
            />
          </View>
        </View>
        <Text style={styles.noteBox}>{item.content}</Text>
      </TouchableWithoutFeedback>
    );
  };
  const onHealthTrackingPress = () => {
    jalaali(selectedDate).isBefore(today)
      ? navigation.navigate('TrackingOptions', {
          day: selectedDate,
        })
      : ToastAndroid.show(
          'امکان ثبت شرح حال برای روزهای آتی وجود ندارد.',
          ToastAndroid.LONG,
        );
  };
  const onNotePress = () =>
    navigation.navigate('Note', {
      date: selectedDate,
    });
  return (
    <View style={styles.btnSheetContainer}>
      <View style={styles.btnSheetHeader} />
      <Text style={styles.btnSheetTitle}>
        {jalaali(selectedDate).format('jYYYY/jM/jD')}
      </Text>
      <View style={styles.btnSheetbuttonsBox}>
        <Icon
          raised
          size={20}
          name="lady"
          type="parto"
          color={COLOR.pink}
          onPress={onHealthTrackingPress}
        />
        <Icon
          raised
          size={20}
          name="new-message"
          type="entypo"
          color={COLOR.pink}
          onPress={onNotePress}
        />
      </View>
      <Text style={styles.btnSheetCategory}>شرح‌حال</Text>
      <Divider />
      {trackedOptions.length > 0 ? (
        <>
          <View style={styles.trackedlist}>
            <Carousel
              ref={trackedlistRef}
              inverted
              autoplay
              // loop
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              data={trackedOptions}
              setCurrentIndex
              onSnapToItem={(index) => setCurrentIndex(index)}
              renderItem={({ item, index }) => (
                <View style={styles.SvgContainer}>
                  <SvgCss
                    key={`icon${index.toString()}`}
                    width="100%"
                    height="100%"
                    fill={item.color}
                    xml={item.icon}
                  />
                </View>
              )}
              sliderWidth={WIDTH}
              itemWidth={70}
            />
            <View style={styles.indexBox}>
              <Icon
                raised
                size={10}
                name="left"
                type="parto"
                color={COLOR.icon}
                onPress={() => _handleOnPrevious(trackedlistRef)}
              />
              <Text style={styles.indexTitle}>
                {trackedOptions[currentIndex].catName}:{' '}
                {trackedOptions[currentIndex].title}
              </Text>
              <Icon
                raised
                size={10}
                name="right"
                type="parto"
                color={COLOR.icon}
                onPress={() => _handleOnNext(trackedlistRef)}
              />
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.emptyTxt}>هنوز شرح‌حالی ثبت نشده است.</Text>
      )}

      <Text style={styles.btnSheetCategory}>یادداشت</Text>
      <Divider />
      {Object.keys(notes).length > 0 ? (
        <>
          <View style={styles.noteslist}>
            <Carousel
              ref={noteslistRef}
              inverted
              data={notes}
              renderItem={_notesRenderItem}
              sliderWidth={WIDTH}
              itemWidth={WIDTH}
              onSnapToItem={(index) => setActiveIndex(index)}
            />
          </View>
          <View style={styles.index}>
            <Icon
              raised
              size={10}
              name="left"
              type="parto"
              color={COLOR.icon}
              onPress={() => _handleOnPrevious(noteslistRef)}
            />
            <Text style={styles.indexTitle}>{`${activeIndex + 1}/${
              Object.keys(notes).length
            }`}</Text>
            <Icon
              raised
              size={10}
              name="right"
              type="parto"
              color={COLOR.icon}
              onPress={() => _handleOnNext(noteslistRef)}
            />
          </View>
        </>
      ) : (
        <Text style={styles.emptyTxt}>هنوز یادداشتی ثبت نشده است.</Text>
      )}
    </View>
  );
};
export default CalendarBottomSheet;
