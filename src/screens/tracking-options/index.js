import React, { useState, useContext, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { SvgCss } from 'react-native-svg';
import moment from 'moment';
import { Icon } from 'react-native-elements';

//styles
import { COLOR, WIDTH } from '../../styles/static';
import styles from './styles';

//database
import { USER_TRACKING_OPTION } from '../../constants/database-tables';

//components
import WeekCalendar from '../../components/WeekCalendar';
import CalendarPointer from '../../components/CalendarPointer';

//assets
import MainBg from '../../../assets/images/main/home.png';
import TeenagerBg from '../../../assets/images/teenager/home.png';
import PartnerBg from '../../../assets/images/partner/home.png';

//redux
import { useSelector } from 'react-redux';

//util
import { getTrackingOptionData } from '../../util/database/query';
import { FORMAT } from '../../constants/cycle';

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

const PartenerTrackingOptions = ({ route }) => {
  const [categories, setCategories] = useState([]);
  const [sele, setSele] = useState([]);
  const template = useSelector((state) => state.user.template);
  const [appTourTargets, setAppTourTargets] = useState([]);
  const { today } = useContext(DateContext);
  const [date, setDate] = useState(route.params ? route.params.day : today);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [overlayText, setOverlayText] = useState('');

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

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
    if (categories.length > 0) {
      console.log('categories', categories);
      const selectedItems = [];
      categories.forEach((item) => {
        const selected = item.options.filter((i) => i.selected.length > 0);
        if (selected.length > 0)
          selectedItems.push({
            id: item.id,
            categoryTitle: item.title,
            color: item.color,
            selected: selected[0],
          });
      });
      setSele(selectedItems);
      console.log('selectedItems', selectedItems);
    }
  }, [categories]);

  const _renderItem = ({ item, color }) => {
    console.log('iiiii', item);
    return (
      <View style={styles.option1}>
        <Text style={styles.title}>{item.categoryTitle}</Text>
        <Icon
          raised
          name="info"
          type="parto"
          size={15}
          onPress={() => {
            toggleOverlay(item.id);
          }}
        />
        <Text style={styles.txt}>{item.selected.title}</Text>
        <SvgCss
          width="75%"
          height="75%"
          xml={item.selected.icon}
          fill={item.color}
        />
      </View>
    );
  };

  const toggleOverlay = (itemId) => {
    console.log('id', itemId);
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
          //onDateChanged={onDayPress}
          //onDayPress={(d) => onDayPress(d.dateString)}
        />

        <View style={styles.partnerFlatList}>
          <FlatList
            data={sele}
            numColumns={1}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderItem}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PartenerTrackingOptions;
