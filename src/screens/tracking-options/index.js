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
} from 'react-native';
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';
import { Icon, Overlay, ButtonGroup, Input } from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import { SvgCss } from 'react-native-svg';
import Database from '../../util/database';
import WeekCalendar from '../../components/WeekCalendar';
import Ptext from '../../components/Ptxt';
import styles from './styles';
import { COLOR, WIDTH } from '../../styles/static';
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
import { getTrackingOptionData } from '../../util/database/query';
import CycleModule from '../../util/cycle';

const db = new Database();
const detailPageRef = createRef();

const TrackingOptions = ({ route, navigation }) => {
  const { today } = useContext(DateContext);
  const [date, setDate] = useState(route.params ? route.params.day : today);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [detailPageId, setDetailPageId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [overlayText, setOverlayText] = useState('');
  const [categories, setCategories] = useState([]);
  const getData = useCallback(async () => {
    const td = await getTrackingOptionData(date);
    setCategories(td);
  }, [date]);
  useEffect(() => {
    getData();
  }, [getData]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.sliderItem}>
        <View
          style={[
            styles.category,
            {
              borderColor: item.color,
            },
          ]}>
          <SvgCss width="100%" height="100%" xml={item.icon} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            toggleOverlay(item.id);
          }}
          style={[styles.more, { backgroundColor: item.color }]}>
          <Text style={styles.moreText}>
            {'   '}
            در مورد {item.title} بیشتر بدانید.
          </Text>
          <Icon name="info" type="MaterialIcons" size={17} color="white" />
        </TouchableOpacity>
        <View style={styles.options}>{renderOptions(item, item.color)}</View>
        {/* {item.id === detailPageId ? renderDetailPage() : null} */}
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
            style={styles.option}>
            <View
              style={[
                styles.icon,
                {
                  borderColor: color,
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
    const c = await CycleModule();

    if (option.selected.length > 0) {
      //this will deselect the option
      db.exec(
        `DELETE FROM user_tracking_option WHERE tracking_option_id=${option.id} AND date='${date}'`,
        'user_tracking_option',
      ).then((res) => {
        getData();
      });
    } else {
      if (category.hasMultipleChoice) {
        //this will add new option to others
        db.exec(
          `INSERT INTO user_tracking_option (tracking_option_id, date) VALUES (${option.id}, '${date}')`,
          'user_tracking_option',
        ).then((res) => {
          getData();
        });
      } else {
        //this will remove other selected options and add new option
        db.exec(
          `DELETE FROM user_tracking_option WHERE date='${date}' AND tracking_option_id IN (${category.options.map(
            (o) => {
              return o.id;
            },
          )});`,
          'user_tracking_option',
        ).then(() => {
          db.exec(
            `INSERT INTO user_tracking_option (tracking_option_id, date) VALUES (${option.id}, '${date}')`,
            'user_tracking_option',
          ).then((res) => {
            getData();
          });
        });
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
      c.determineLastPeriodDate();
    }
  };
  const onDayPress = (d, propUpdate) => {
    console.log('dayyyyyyyyy', d, propUpdate);
    if (moment(d).isBefore(moment())) {
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
      <ScrollView>
        <WeekCalendar
          dividerColor="#fff"
          theme={{
            calendarBackground: COLOR.lightPink,
          }}
          current={today}
          maxDate={moment().format('YYYY-MM-DD')}
          navigation={navigation}
          onDateChanged={(d, propUpdate) => onDayPress(d, propUpdate)}
        />

        <Text style={styles.descriptionTxt}>
          لطفا ورق بزن و نشانه‌هایی که داری رو انتخاب کن.
        </Text>
        <Carousel
          layout={'default'}
          data={categories}
          renderItem={renderItem}
          sliderWidth={WIDTH}
          itemWidth={WIDTH - 130}
          inverted={true}
        />
      </ScrollView>
      <Overlay isVisible={visible}>
        <Icon
          type="antdesign"
          name="close"
          color="red"
          size={20}
          onPress={toggleOverlay}
          containerStyle={{ alignItems: 'flex-start' }}
        />
        <ScrollView style={{ margin: 5 }}>
          <Ptext style={{ fontSize: 14 }}>{overlayText}</Ptext>
        </ScrollView>
      </Overlay>
      <ActionSheet
        ref={detailPageRef}
        gestureEnabled={true}
        bounceOnOpen={true}>
        <View style={styles.detailPage}>{renderDetailPage()}</View>
      </ActionSheet>
    </SafeAreaView>
  );
};

export default TrackingOptions;
