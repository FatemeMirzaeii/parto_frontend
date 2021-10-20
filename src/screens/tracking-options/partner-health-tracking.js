import React, { useState, useContext, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Image,
  ToastAndroid,
} from 'react-native';
import { SvgCss } from 'react-native-svg';

import moment from 'moment';
import { Icon, Overlay } from 'react-native-elements';

//styles
import { COLOR } from '../../styles/static';
import styles from './partnerStyles';

//components
import WeekCalendar from '../../components/WeekCalendar';
import CalendarPointer from '../../components/CalendarPointer';
import HTMLRender from '../../components/HTMLRender';
import Loader from '../../components/Loader';
//assets
import MainBg from '../../../assets/images/main/home.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';
import PartnerBg from '../../../assets/images/partner/home.png';

//redux
import { useSelector } from 'react-redux';

//util
import { getTrackingOptionData } from '../../util/database/query';
import { FORMAT } from '../../constants/cycle';
import Tour from '../../util/tourGuide/Tour';

//constants
import { DateContext } from '../../contexts';
import {
  BLEEDING,
  EXCERSICE,
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

const PartnerTrackingOptions = ({ route }) => {
  const [categories, setCategories] = useState([]);
  const [sele, setSele] = useState([]);
  const template = useSelector((state) => state.user.template);
  const [appTourTargets, setAppTourTargets] = useState([]);
  const { today } = useContext(DateContext);
  const [date, setDate] = useState(route.params ? route.params.day : today);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [overlayText, setOverlayText] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    if (categories.length > 0) {
      const selectedItems = [];
      categories.forEach((item, color) => {
        const selected = item.options.filter((i) => i.selected.length > 0);

        if (selected.length > 0)
          selectedItems.push({
            id: item.id,
            categoryTitle: item.title,
            color: item.color,
            selected: selected,
          });
      });
      setSele(selectedItems);
      //console.log('selected', selected);
      //console.log('selectedItems', selectedItems);
    }
  }, [categories]);

  const _renderItem = ({ item }) => {
    console.log('iiiii', item);
    return (
      <View
        style={
          item.selected.length == 4
            ? styles.parterOptionsMultipleChoice4
            : item.selected.length == 3
            ? styles.parterOptionsMultipleChoice3
            : item.selected.length == 2
            ? styles.parterOptionsMultipleChoice2
            : item.selected.length == 1
            ? styles.parterOptions
            : null
        }>
        <Icon
          raised
          name="info"
          type="parto"
          size={15}
          containerStyle={
            item.selected.length == 4
              ? styles.icon4
              : item.selected.length == 3
              ? styles.icon3
              : item.selected.length == 2
              ? styles.icon2
              : item.selected.length == 1
              ? styles.icon
              : null
          }
          onPress={() => {
            toggleOverlay(item.id);
          }}
        />
        <Text
          style={
            item.selected.length == 1
              ? styles.title
              : item.selected.length == 2
              ? styles.titleMultipleChoice2
              : item.selected.length == 3
              ? styles.titleMultipleChoice3
              : item.selected.length == 4
              ? styles.titleMultipleChoice4
              : null
          }>
          {item.categoryTitle}
        </Text>

        {item.selected.map((Item) => {
          return (
            <View>
              <Text
                style={
                  item.selected.length == 1
                    ? styles.txt
                    : item.selected.length == 2
                    ? styles.txtMultipleChoice2
                    : item.selected.length == 3
                    ? styles.txtMultipleChoice3
                    : item.selected.length == 4
                    ? styles.txtMultipleChoice4
                    : null
                }>
                {Item.title}
              </Text>
            </View>
          );
        })}

        {item.selected.map((Item, color) => {
          return (
            <SvgCss
              style={
                item.selected.length == 1
                  ? styles.svg
                  : item.selected.length == 2
                  ? styles.svg2
                  : item.selected.length == 3
                  ? styles.svg3
                  : item.selected.length == 4
                  ? styles.svg4
                  : null
              }
              xml={Item.icon}
              fill={
                Item.id == 1
                  ? (color = '#E23344')
                  : Item.id == 2
                  ? (color = '#E23344')
                  : Item.id == 3
                  ? (color = '#E23344')
                  : Item.id == 4
                  ? (color = '#E23344')
                  : Item.id == 5
                  ? (color = '#17a5a2')
                  : Item.id == 6
                  ? (color = '#17a5a2')
                  : Item.id == 7
                  ? (color = '#17a5a2')
                  : Item.id == 8
                  ? (color = '#17a5a2')
                  : Item.id == 9
                  ? (color = '#d3de32')
                  : Item.id == 10
                  ? (color = '#d3de32')
                  : Item.id == 11
                  ? (color = '#d3de32')
                  : Item.id == 12
                  ? (color = '#d3de32')
                  : Item.id == 13
                  ? (color = '#ec5f91')
                  : Item.id == 14
                  ? (color = '#ec5f91')
                  : Item.id == 15
                  ? (color = '#ec5f91')
                  : Item.id == 16
                  ? (color = '#ec5f91')
                  : Item.id == 17
                  ? (color = '#64d7d6')
                  : Item.id == 18
                  ? (color = '#64d7d6')
                  : Item.id == 19
                  ? (color = '#64d7d6')
                  : Item.id == 20
                  ? (color = '#64d7d6')
                  : Item.id == 21
                  ? (color = '#00AEEF')
                  : Item.id == 22
                  ? (color = '#00AEEF')
                  : Item.id == 23
                  ? (color = '#00AEEF')
                  : Item.id == 24
                  ? (color = '#00AEEF')
                  : Item.id == 25
                  ? (color = '#ec5f91')
                  : Item.id == 26
                  ? (color = '#ec5f91')
                  : Item.id == 27
                  ? (color = '#ec5f91')
                  : Item.id == 28
                  ? (color = '#ec5f91')
                  : COLOR.white
              }></SvgCss>
          );
        })}
      </View>
    );
  };

  const onDayPress = (d) => {
    console.log('dayyyyyyyyy', d);
    setActiveIndex(0);
    if (moment(d).isSameOrBefore(today)) {
      setDate(d);
    } else {
      ToastAndroid.show(
        'امکان ثبت شرح‌حال برای روزهای آتی وجود ندارد.',
        ToastAndroid.LONG,
      );
    }
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
            headerColor: template === 'Partner' ? COLOR.white : COLOR.black,
            dayHeaderColor: template === 'Partner' ? COLOR.white : COLOR.black,
            dayTextColor: template === 'Partner' ? COLOR.white : COLOR.black,
          }}
          current={date}
          maxDate={moment().format(FORMAT)}
          onDateChanged={onDayPress}
          onDayPress={(d) => onDayPress(d.dateString)}
        />
        <View style={styles.partnerFlatList}>
          {isLoading ? (
            <Loader />
          ) : sele.length > 0 ? (
            <FlatList
              data={sele}
              numColumns={1}
              showsVerticalScrollIndicator={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={_renderItem}
            />
          ) : (
            <Image
              style={styles.img}
              source={require('../../../assets/images/partner/partnerTrackingOption.jpg')}
            />
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
              containerStyle={styles.redIcon}
            />
            <ScrollView style={styles.htmlWrapper}>
              <HTMLRender html={overlayText} />
            </ScrollView>
          </>
        </Overlay>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PartnerTrackingOptions;
