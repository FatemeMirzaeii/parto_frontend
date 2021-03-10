import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';

//store
import { handleTemplate } from '../../store/actions/user';
import { signOut } from '../../store/actions/auth';

//components
import DialogBox from '../../components/DialogBox';

//util
import useModal from '../../util/hooks/useModal';

//styles and images
import styles from './styles';
import { COLOR, WIDTH } from '../../styles/static';
import Background from '../../../assets/images/00.png';
import Main from '../../../assets/images/main/avatar.png';
import Teenager from '../../../assets/images/teenager/avatar.png';
import Partner from '../../../assets/images/partner/avatar.png';

const Template = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(1);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isVisible, toggle } = useModal();
  const carousel = [
    {
      title: 'نوجوان',
      desc: 'ثبت و تحلیل دوره‌های قاعدگی',
      icon: Teenager,
    },
    { title: 'پرتو', desc: 'ثبت و تحلیل دوره‌ها و باروری', icon: Main },
    {
      title: 'هم‌پر',
      desc: 'مشاهده اطلاعات همسر',
      icon: Partner,
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
    !user.id ? toggle() : navigation.navigate('PartnerCode');
  }, [dispatch, navigation, user.id, toggle]);

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(index)}>
        <Image source={item.icon} style={styles.image} />
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground source={Background} style={styles.bg}>
      <Button
        title="خروج"
        type="clear"
        onPress={() => dispatch(signOut())}
        icon={{ type: 'parto', name: 'exit', color: COLOR.textColor }}
        buttonStyle={styles.button}
        titleStyle={styles.title}
      />
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>به پرتو خوش‌آمدی</Text>
          <Text style={styles.header}>نسخه اختصاصیت رو انتخاب کن</Text>
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
        <DialogBox
          isVisible={isVisible}
          hide={toggle}
          text="برای استفاده از این نسخه نرم‌افزار باید ثبت نام کنید."
          twoButtons
          firstBtnTitle="باشه"
          firstBtnPress={() => {
            toggle;
            dispatch(signOut());
          }}
          secondBtnPress={toggle}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Template;
