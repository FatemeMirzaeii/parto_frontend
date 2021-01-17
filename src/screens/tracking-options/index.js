import React, {
  useEffect,
  useState,
  useCallback,
  createRef,
  useContext,
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
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';
import { Icon, Overlay, ButtonGroup, Input } from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import { SvgCss } from 'react-native-svg';

// components
import WeekCalendar from '../../components/WeekCalendar';
import CalendarPointer from '../../components/CalendarPointer';
import Loader from '../../components/Loader';

//utils
import {
  addTrackingOption,
  deselectTrackingOption,
  getTrackingOptionData,
  replaceTrackingOption,
} from '../../util/database/query';
import { calendarMarkedDatesObject } from '../../util/func';
import CycleModule from '../../util/cycle';
import Tour from '../../util/tourGuide/Tour';

// constants, store and contexts
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
import { FORMAT } from '../../constants/cycle';
import { updatePerdictions, updatePeriodDays } from '../../store/actions/cycle';
import { DateContext } from '../../contexts';

// styles and images
import styles from './styles';
import commonStyles from '../../styles/commonStyles';
import { COLOR, WIDTH } from '../../styles/static';
import MainBg from '../../../assets/images/main/home.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';
import PartnerBg from '../../../assets/images/partner/home.png';

const detailPageRef = createRef();

const TrackingOptions = ({ route, navigation }) => {
  const cycle = useSelector((state) => state.cycle);
  const dispatch = useDispatch();
  const { today } = useContext(DateContext);
  const [date, setDate] = useState(route.params ? route.params.day : today);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [detailPageId, setDetailPageId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [overlayText, setOverlayText] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [appTourTargets, setAppTourTargets] = useState([]);
  const template = useSelector((state) => state.user.template);

  const getInitialData = useCallback(
    async (currentCategoryId) => {
      const td = await getTrackingOptionData(date);
      if (td && template === 'Teenager') {
        setCategories(td.filter((item) => item.id !== SEX));
      } else {
        setCategories(td);
      }
      if (currentCategoryId)
        setCurrentCategory(td.find((cat) => cat.id === currentCategoryId));
      else setCurrentCategory(td[0]);
    },
    [date, template],
  );

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  Tour(appTourTargets, 'calendarPointer', 'TrackingOptionTour');

  const renderItem = ({ item }) => {
    return (
      <View style={styles.sliderItem}>
        <View
          style={[
            styles.category,
            {
              // borderColor: item.color,
            },
          ]}>
          <SvgCss width="100%" height="100%" xml={item.icon} />
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{item.title}</Text>
          <Icon
            // raised
            name="info"
            type="parto"
            size={25}
            //color={COLOR.black}
            onPress={() => {
              toggleOverlay(item.id);
            }}
          />
        </View>
        {/* <View style={styles.options}>{renderOptions(item, item.color)}</View> */}
        {/* {item.id === detailPageId ? renderDetailPage() : null} */}
      </View>
    );
  };

  const _carouselSnap = (index) => {
    setIsLoading(true);
    console.log('index', index);
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === index + 1) {
        setCurrentCategory(categories[i]);
        setIsLoading(false);
      }
    }
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
            style={styles.option}>
            <View
              style={[
                styles.icon,
                {
                  // borderColor: color,
                  backgroundColor:
                    item.selected.length > 0 ? color : COLOR.white,
                },
              ]}>
              <SvgCss
                width="100%"
                height="100%"
                xml={item.icon}
                fill={item.selected.length > 0 ? COLOR.white : color}
              />
            </View>
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

  const onOptionPress = async (category, option) => {
    if (template === 'Partner') return;
    const c = await CycleModule();
    if (option.selected.length > 0) {
      await deselectTrackingOption(option.id, date);
      getInitialData(category.id);
    } else {
      if (category.hasMultipleChoice) {
        //this will add new option to others
        await addTrackingOption(option.id, date);
        getInitialData(category.id);
      } else {
        //this will remove other selected options and add new option
        const sameCategoryOptions = category.options.map((o) => {
          return o.id;
        });
        await replaceTrackingOption(option.id, date, sameCategoryOptions);
        getInitialData(category.id);
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
      if (date in cycle.periodDays) {
        const {
          [date]: {},
          ...periodDays
        } = cycle.periodDays;
        dispatch(updatePeriodDays(periodDays));
      } else {
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
          }}
          current={date}
          maxDate={moment().format(FORMAT)}
          onDateChanged={onDayPress}
          onDayPress={(d) => onDayPress(d.dateString)}
        />
        <View style={styles.sliderWrapper}>
          <View style={styles.carousel}>
            <Icon
              raised
              name="chevron-circle-left"
              type="font-awesome"
              color="#aaa"
              size={15}
            />
            <Carousel
              layout={'default'}
              data={categories}
              renderItem={renderItem}
              sliderWidth={WIDTH / 2.6}
              itemWidth={WIDTH / 2.6}
              inverted={true}
              onSnapToItem={(index) => _carouselSnap(index)}
            />
            <Icon
              raised
              name="chevron-circle-right"
              type="font-awesome"
              color="#aaa"
              size={15}
            />
          </View>

          {isLoading ? (
            <Loader />
          ) : (
            <View style={styles.options}>
              {currentCategory && (
                <FlatList
                  data={currentCategory.options}
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => onOptionPress(currentCategory, item)}
                      style={[
                        styles.option,
                        {
                          // borderColor: color,
                          backgroundColor:
                            item.selected.length > 0
                              ? currentCategory.color
                              : COLOR.white,
                        },
                      ]}>
                      <SvgCss
                        width="75%"
                        height="75%"
                        xml={item.icon}
                        fill={
                          item.selected.length > 0
                            ? COLOR.white
                            : currentCategory.color
                        }
                      />
                      <Text style={styles.txt} numberOfLines={1}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )}
        </View>
        <Overlay isVisible={visible}>
          <>
            <Icon
              type="antdesign"
              name="close"
              color="red"
              size={20}
              onPress={toggleOverlay}
              containerStyle={{ alignItems: 'flex-start' }}
            />
            <ScrollView style={{ margin: 5 }}>
              <Text style={commonStyles.helpTxt}>{overlayText}</Text>
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
