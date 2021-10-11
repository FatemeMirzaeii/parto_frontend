import React, { useCallback } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  View,
  Text,
  FlatList,
} from 'react-native';
// import { Button } from 'react-native-elements';

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
// import { COLOR } from '../../styles/static';
import Background from '../../../assets/images/00.png';
import Main from '../../../assets/images/main/avatar2.png';
import Teenager from '../../../assets/images/teenager/avatar2.png';
import Partner from '../../../assets/images/partner/avatar2.png';

const Template = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isVisible, toggle } = useModal();

  const listdata = [
    {
      title: 'پرتو',
      desc: 'ثبت و تحلیل پریود و تخمک گذاری برای دختران\nو بانوان + پروفایل بارداری',
      icon: Main,
    },
    {
      title: 'پرنو',
      desc: 'ثبت و پیگیری پریود \nمحتوای مخصوص نوجوانان',
      icon: Teenager,
    },
    {
      title: 'هم‌پر',
      desc: ' مشاهده اطلاعات ثبت شده در پرتوبانو \n محتوای مناسب برای همسر و تنظیم یادآور',
      icon: Partner,
    },
  ];
  const onItemPress = (index) => {
    switch (index) {
      case 0:
        _handleMainSelected();
        break;
      case 1:
        _handleTeenagerSelected();
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
      <TouchableOpacity onPress={() => onItemPress(index)}>
        <View style={styles.whiteBox}>
          <Image source={item.icon} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.templatetTitle}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={Background} style={styles.bg}>
      {/* <Button
        title="خروج"
        type="clear"
        onPress={() => dispatch(signOut())}
        icon={{ type: 'parto', name: 'exit', color: COLOR.textColor }}
        buttonStyle={styles.button}
        titleStyle={styles.title}
      /> */}
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>به پرتو خوش‌آمدی</Text>
          <Text style={styles.header}>نسخه اختصاصیت رو انتخاب کن</Text>
        </View>

        <FlatList
          data={listdata}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={_renderItem}
        />

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
