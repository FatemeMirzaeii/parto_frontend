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
import Carousel from 'react-native-snap-carousel';

//redux
import { useDispatch, useSelector } from 'react-redux';

//store
import { handleTemplate } from '../../store/actions/user';
import { signOut } from '../../store/actions/auth';

//assets
import Background from '../../../assets/images/00.png';
import Parto from '../../../assets/images/main/avatar.png';
import Nopar from '../../../assets/images/teenager/avatar.png';
import Hampar from '../../../assets/images/partner/avatar.png';

//styles
import styles from './styles';
import { COLOR, WIDTH } from '../../styles/static';

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
    dispatch(handleTemplate('Main'));
    navigation.navigate('Interview', { template: 'Main' });
  }, [dispatch, navigation]);

  const _handleTeenagerSelected = useCallback(async () => {
    dispatch(handleTemplate('Teenager'));
    navigation.navigate('Q2', {
      mode: { pregnant: 0, pregnancy_try: 0, period: 1 },
      template: 'Teenager',
    });
  }, [dispatch, navigation]);

  const _handlePartnerSelected = useCallback(async () => {
    dispatch(handleTemplate('Partner'));
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

  const _renderItem = ({ item, index }) => {
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
              color={COLOR.pink}
              size={20}
            />
            <TouchableOpacity
              style={styles.textbox}
              onPress={() => onItemPress(activeSlide)}>
              <Text style={styles.title}>
                {carousel.map((c) => c.title)[activeSlide]}
              </Text>
            </TouchableOpacity>
            <Icon
              name="chevron-circle-left"
              type="font-awesome"
              color={COLOR.pink}
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
