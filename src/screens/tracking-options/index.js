import React, {
  useEffect,
  useState,
  useCallback,
  createRef,
  useContext,
  useRef,
} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  FlatList,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';
import { Icon, Overlay, ButtonGroup, Input } from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import { SvgCss } from 'react-native-svg';

//redux
import { useDispatch, useSelector } from 'react-redux';

//store
import { updatePerdictions, updatePeriodDays } from '../../store/actions/cycle';

//components
import WeekCalendar from '../../components/WeekCalendar';
import CalendarPointer from '../../components/CalendarPointer';
import Loader from '../../components/Loader';
import HTMLRender from '../../components/HTMLRender';

//constants
import {
  BLEEDING,
  EXCERSICE,
  SPOTTING,
  VAGINAL,
  PAIN,
  MOOD,
  SLEEP,
  SEX,
  MORE_ABOUT_VAGINAL,
  MORE_ABOUT_BLEEDING,
  MORE_ABOUT_PAIN,
  MORE_ABOUT_MOOD,
  MORE_ABOUT_SLEEP,
  MORE_ABOUT_EXCERSICE,
  MORE_ABOUT_SEX,
} from '../../constants/health-tracking-info';
import { DateContext } from '../../contexts';

//util
import {
  addTrackingOption,
  deselectTrackingOption,
  getTrackingOptionData,
  replaceTrackingOption,
} from '../../util/database/query';
import CycleModule from '../../util/cycle';
import { FORMAT } from '../../constants/cycle';
import Tour from '../../util/tourGuide/Tour';
import { calendarMarkedDatesObject } from '../../util/func';

//assets
import MainBg from '../../../assets/images/main/home.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';
import PartnerBg from '../../../assets/images/partner/home.png';

//styles
import styles from './styles';
import { COLOR, WIDTH } from '../../styles/static';

const detailPageRef = createRef();

const TrackingOptions = ({ route }) => {
  const { today } = useContext(DateContext);
  const [date, setDate] = useState(route.params ? route.params.day : today);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailPageId, setDetailPageId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [overlayText, setOverlayText] = useState('');
  const [categories, setCategories] = useState([]);
  const [appTourTargets, setAppTourTargets] = useState([]);
  const cycle = useSelector((state) => state.cycle);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();
  const categoryCarousel = useRef(null);
  const optionsCarousel = useRef(null);

  const getInitialData = useCallback(async () => {
    const td = await getTrackingOptionData(date);
    if (td && template === 'Teenager') {
      setCategories(td.filter((item) => item.id !== SEX));
    } else {
      setCategories(td);
    }
    setIsLoading(false);
  }, [date, template]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  Tour(appTourTargets, 'calendarPointer', 'TrackingOptionTour');

  const _categoryCarouselRenderItem = ({ item }) => {
    return (
      <View style={styles.sliderItem}>
        <View style={styles.category}>
          <SvgCss width="100%" height="100%" xml={item.icon} />
        </View>
      </View>
    );
  };

  const _optionsCarouseRenderItem = ({ item }) => {
    return (
      <View style={styles.sliderItem}>
        <View style={styles.options}>{renderOptions(item, item.color)}</View>
      </View>
    );
  };

  const renderOptions = (category, color) => {
    return (
      <FlatList
        data={category.options}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onOptionPress(category, item)}
            style={[
              styles.option,
              {
                backgroundColor: item.selected.length > 0 ? color : COLOR.white,
              },
            ]}>
            <SvgCss
              width="75%"
              height="75%"
              xml={item.icon}
              fill={item.selected.length > 0 ? COLOR.white : color}
            />
            <Text style={styles.txt}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderDetailPage = () => {
    switch (detailPageId) {
      case BLEEDING:
        return (
          <View style={{ flexDirection: 'row' }}>
            <Input
              placeholder="ساعت شروع پریود"
              containerStyle={styles.input}
              leftIcon={
                <Icon name="ios-alarm" size={24} color="gray" type="ionicon" />
              }
            />
            <ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={['روز', 'َشب']}
              vertical
              containerStyle={styles.buttonGroup}
              selectedButtonStyle={{ backgroundColor: '#F1719D' }}
            />
          </View>
        );
      case EXCERSICE:
        return (
          <View>
            <Input
              placeholder="مدت زمان ورزش"
              containerStyle={styles.input}
              leftIcon={
                <Icon name="ios-alarm" size={24} color="gray" type="ionicon" />
              }
            />
          </View>
        );
      default:
    }
  };

  const _categoryCarouselSnap = (index) => {
    optionsCarousel.current.snapToItem(index);
    setActiveIndex(index);
  };

  const _optionsCarouselSnap = (index) => {
    categoryCarousel.current.snapToItem(index);
    setActiveIndex(index);
  };

  const onOptionPress = async (category, option) => {
    if (template === 'Partner') return;
    const c = await CycleModule();
    if (option.selected.length > 0) {
      await deselectTrackingOption(option.id, date);
      getInitialData();
      if (category.id === BLEEDING) {
        const {
          [date]: {},
          ...periodDays
        } = cycle.periodDays;
        dispatch(updatePeriodDays(periodDays));
      }
    } else {
      if (category.hasMultipleChoice) {
        //this will add new option to others
        await addTrackingOption(option.id, date);
        getInitialData();
      } else {
        //this will remove other selected options and add new option
        const sameCategoryOptions = category.options.map((o) => {
          return o.id;
        });
        await replaceTrackingOption(option.id, date, sameCategoryOptions);
        getInitialData();
      }
      // setDetailPageId(category.id);
      // if (
      //   (category.id === BLEEDING && option.id !== SPOTTING) ||
      //   category.id === EXCERSICE
      // ) {
      //   detailPageRef.current?.setModalVisible();
      // }
    }
    if (category.id === BLEEDING) {
      await c.determineLastPeriodDate();
      if (!(date in cycle.periodDays)) {
        dispatch(
          updatePeriodDays({
            ...cycle.periodDays,
            [date]: calendarMarkedDatesObject(COLOR.bleeding, false),
          }),
        );
      }
      dispatch(updatePerdictions());
    }
  };
  const onDayPress = (d) => {
    console.log('dayyyyyyyyy', d);
    if (moment(d).isSameOrBefore(today)) {
      setDate(d);
    } else {
      ToastAndroid.show(
        'امکان ثبت شرح‌حال برای روزهای آتی وجود ندارد.',
        ToastAndroid.LONG,
      );
    }
  };

  const updateIndex = (i) => {
    setSelectedIndex(i);
  };

  const toggleOverlay = (itemId) => {
    setVisible(!visible);
    if (!itemId) return;
    switch (itemId) {
      case BLEEDING:
        setOverlayText(MORE_ABOUT_BLEEDING);
        break;
      case VAGINAL:
        setOverlayText(MORE_ABOUT_VAGINAL);
        break;
      case PAIN:
        setOverlayText(MORE_ABOUT_PAIN);
        break;
      case MOOD:
        setOverlayText(MORE_ABOUT_MOOD);
        break;
      case SLEEP:
        setOverlayText(MORE_ABOUT_SLEEP);
        break;
      case EXCERSICE:
        setOverlayText(MORE_ABOUT_EXCERSICE);
        break;
      case SEX:
        setOverlayText(MORE_ABOUT_SEX);
        break;

      default:
        break;
    }
  };

  const _handleOnNext = () => {
    categoryCarousel.current.snapToNext();
  };
  const _handleOnPrevious = () => {
    categoryCarousel.current.snapToPrev();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={
          template === 'Teenager'
            ? TeenagerBg
            : template === 'Partner'
            ? PartnerBg
            : MainBg
        }
        style={styles.sky}>
        <CalendarPointer
          addAppTourTarget={(appTourTarget) => {
            appTourTargets.push(appTourTarget);
          }}
        />
        <WeekCalendar
          theme={{
            calendarBackground: 'transparent',
            headerColor: template === 'Partner' ? COLOR.white : COLOR.black,
            dayHeaderColor: template === 'Partner' ? COLOR.white : COLOR.black,
            dayTextColor: template === 'Partner' ? COLOR.white : COLOR.black,
          }}
          current={date}
          maxDate={moment().format(FORMAT)}
          onDateChanged={onDayPress}
          onDayPress={(d) => onDayPress(d.dateString)}
        />

        <View style={styles.sliderWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            <View style={styles.carousel}>
              <Icon
                raised
                name="chevron-circle-left"
                type="font-awesome"
                color="#aaa"
                size={15}
                onPress={_handleOnNext}
              />
              <Carousel
                inverted
                //loop
                ref={categoryCarousel}
                data={categories}
                renderItem={_categoryCarouselRenderItem}
                sliderWidth={WIDTH / 1.4}
                itemWidth={WIDTH / 4}
                inactiveSlideScale={0.7}
                inactiveSlideOpacity={0.5}
                onSnapToItem={(index) => _categoryCarouselSnap(index)}
              />
              <Icon
                raised
                name="chevron-circle-right"
                type="font-awesome"
                color="#aaa"
                size={15}
                onPress={_handleOnPrevious}
              />
            </View>
          )}
          {categories.length !== 0 && (
            <View style={styles.titleBox}>
              <Text style={styles.title}>{categories[activeIndex].title}</Text>
              <Icon
                raised
                name="info"
                type="parto"
                size={15}
                onPress={() => {
                  toggleOverlay(categories[activeIndex].id);
                }}
              />
            </View>
          )}
          <Carousel
            inverted
            //loop
            ref={optionsCarousel}
            data={categories}
            renderItem={_optionsCarouseRenderItem}
            sliderWidth={WIDTH}
            itemWidth={WIDTH}
            onSnapToItem={(index) => _optionsCarouselSnap(index)}
          />
        </View>
        <Overlay isVisible={visible}>
          <>
            <Icon
              type="antdesign"
              name="close"
              color="red"
              size={20}
              onPress={toggleOverlay}
              containerStyle={styles.icon}
            />
            <ScrollView style={styles.htmlWrapper}>
              <HTMLRender html={overlayText} />
            </ScrollView>
          </>
        </Overlay>
        <ActionSheet
          ref={detailPageRef}
          gestureEnabled={true}
          bounceOnOpen={true}>
          <View style={styles.detailPage}>{renderDetailPage()}</View>
        </ActionSheet>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TrackingOptions;
