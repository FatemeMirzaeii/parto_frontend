import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  View,
  Text,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

//store
import {
  handleMainSelected,
  handleTeenagerSelected,
  handlePartnerSelected,
} from '../../store/actions/user';
import { signOut } from '../../store/actions/auth';

//util
import { storeData } from '../../util/func';

//styles and images
import styles from './styles';
import { WIDTH } from '../../styles/static';
import Background from '../../../assets/images/start/00.png';
import Parto from '../../../assets/images/start/parto.png';
import Nopar from '../../../assets/images/start/nopar.png';
import Hampar from '../../../assets/images/start/hampar.png';

const Template = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(1);
  const userMode = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const carousel = [
    {
      title: 'نوجوان',
      desc: 'ثبت و تحلیل دوره‌ها برای نوجوانان 11 - 18 سال',
      icon: Nopar,
    },
    { title: 'پرتو', desc: 'ثبت و تحلیل دوره‌ها و باروری', icon: Parto },
    {
      title: 'همپر',
      desc: 'اطلاع از دوره‌ها و باروری همسر',
      icon: Hampar,
    },
  ];
  const onItemPress = (index) => {
    switch (index) {
      case 0:
        _handleTeenagerSelected();
        break;
      case 1:
        _handleMainSelected();
        break;
      case 2:
        _handlePartnerSelected();
        break;
      default:
        break;
    }
  };
  const _handleMainSelected = useCallback(async () => {
    dispatch(handleMainSelected());
    await storeData('@appMode', 'main');
    navigation.navigate('Interview');
  }, [dispatch, navigation]);

  const _handleTeenagerSelected = useCallback(async () => {
    dispatch(handleTeenagerSelected());
    await storeData('@appMode', 'teenager');
    navigation.navigate('Q2', {
      mode: { pregnant: 0, pregnancy_try: 0, period: 1 },
    });
  }, [dispatch, navigation]);

  const _handlePartnerSelected = useCallback(async () => {
    dispatch(handlePartnerSelected());
    await storeData('@appMode', 'partner');
    if (!userMode.id) {
      return Alert.alert(
        '',
        'برای استفاده از این نسخه نرم‌افزار باید ثبت نام کنید.',
        [
          {
            text: 'باشه',
            onPress: () => {
              dispatch(signOut());
            },
          },
        ],
      );
    }
    navigation.navigate('PartnerCode');
  }, [dispatch, navigation, userMode.id]);

  console.log('mod of app$$$$$$$$$$$$', userMode);
  const _renderItem = ({ item, index }) => {
    // console.log('activvvvvvvvvvvvvvvvvvv', activeSlide);
    return (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(index)}>
        <Image source={item.icon} style={styles.image} />
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground source={Background} style={styles.bg}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>به پرتو خوش‌اومدی</Text>
          <Text style={styles.header}>نسخه اختصاصیت رو انتخاب کن:</Text>
        </View>
        <View style={styles.carousel}>
          <Carousel
            data={carousel}
            inactiveSlideScale={0.7}
            inactiveSlideOpacity={1}
            renderItem={_renderItem}
            sliderWidth={WIDTH - 40}
            itemWidth={120}
            firstItem={1}
            onSnapToItem={setActiveSlide}
            useScrollView
            slideStyle={styles.carousel}
          />
          <View style={styles.textContainer}>
            <Icon
              name="chevron-circle-right"
              type="font-awesome"
              color="#FB77A4"
              size={20}
            />
            <View style={styles.textbox}>
              <Text style={styles.title}>
                {carousel.map((c) => c.title)[activeSlide]}
              </Text>
            </View>
            <Icon
              name="chevron-circle-left"
              type="font-awesome"
              color="#FB77A4"
              size={20}
            />
          </View>
          <Text style={styles.desc}>
            {carousel.map((c) => c.desc)[activeSlide]}
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Template;
