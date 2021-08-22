import React, { useEffect, useState } from 'react';
import { ScrollView, ToastAndroid, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';

// components
import UserGoal from './UserGoal';
import UserProfile from './UserProfile';
import Card from '../../components/Card';
import DialogBox from '../../components/DialogBox';
import MenuSquareItem from '../../components/MenuSquareItem';
import UserWallet from '../../components/UserWallet';

// utils and store
import { resetDatabase, lockStatus, setLock } from '../../util/database/query';
import { removeData, shareContent } from '../../util/func';
import sync from '../../util/database/sync';
import useModal from '../../util/hooks/useModal';
import { CafeBazaarLink, PlayStoreLink, MyketLink } from '../../services/urls';
import { signOut, signUp } from '../../store/actions/auth';
import { fetchInitialCycleData } from '../../store/actions/cycle';

// styles
import { COLOR } from '../../styles/static';
import styles from './styles';
import globalStyles from '../../styles';

const Menu = ({ navigation }) => {
  const [isLock, setIsLock] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const isLoggedIn = useSelector((state) => state.auth.userToken);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();
  const { isVisible, toggle } = useModal();
  const { isVisible: signOutVisible, toggle: signOutToggle } = useModal();
  const {
    isVisible: registrationAlertVisible,
    toggle: toggleRegistrationAlert,
  } = useModal();

  useEffect(() => {
    determineLockStatus();
  }, []);

  const determineLockStatus = async () => {
    const status = await lockStatus();
    setIsLock(status ? true : false);
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const lock = () => {
    TouchID.isSupported()
      .then((biometryType) => {
        console.log('biometryType', biometryType);
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        }
        setLock(!isLock);
        setIsLock(!isLock);
      })
      .catch((error) => {
        ToastAndroid.show(
          'قفل دستگاه شما خاموش است و یا اثر انگشت را پشتیبانی نمیکند.',
          ToastAndroid.LONG,
        );
      });
  };
  const share = () => {
    DeviceInfo.getInstallerPackageName().then((installerPackageName) => {
      let link = '';
      console.log('installerPackageName', installerPackageName);
      switch (installerPackageName) {
        case 'com.android.vending':
          link = PlayStoreLink;
          break;
        case 'com.farsitel.bazaar':
          link = CafeBazaarLink;
          break;
        case 'ir.mservices.market':
          link = MyketLink;
          break;
        default:
          link = 'www.parto.app';
          break;
      }
      shareContent(
        `لینک دانلود اپلیکیشن پرتو (دستیار هوشمند سلامت بانوان):\n${link}`,
      );
    });
  };
  const exit = async () => {
    const res = await sync(true);
    if (res) dispatch(signOut());
  };
  return (
    <ScrollView style={styles.container}>
      <UserProfile onPress={() => navigateTo('Profile')} />
      {template !== 'Teenager' && (
        <Card>
          <UserGoal navigation={navigation} />
        </Card>
      )}
      <UserWallet navigation={navigation} />
      <View style={styles.squareItemsContainer}>
        {template === 'Main' && (
          <MenuSquareItem
            title="کد همسر"
            onPress={() => navigateTo('PartnerVerificationCode')}
            icon="man"
          />
        )}
        <MenuSquareItem
          title="احکام"
          onPress={() => navigateTo('Treatise')}
          icon="ahkam"
        />
        <MenuSquareItem
          title="تنظیمات دوره‌ها"
          onPress={() => navigateTo('CycleSettings')}
          icon="settings"
        />
        <MenuSquareItem
          title="یادآورها"
          onPress={() => navigateTo('Reminders')}
          icon="bell"
        />
        <MenuSquareItem
          title="مشاوره"
          onPress={() => {
            if (userId) navigateTo('Assistant');
            else toggleRegistrationAlert();
          }}
          icon="assistant"
        />
      </View>
      <Card>
        <ListItem
          title="قفل نرم افزار"
          leftIcon={{ type: 'parto', name: 'lock', color: COLOR.icon }}
          switch={{
            value: isLock,
            onValueChange: lock,
            trackColor: { true: COLOR.lightPink, false: '#aaa' },
            thumbColor: isLock ? COLOR.pink : '#f4f3f4',
          }}
          bottomDivider
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        />
        {/* <ListItem
          title="همگام‌سازی با سرور"
          leftIcon={{ name: 'sync', color: COLOR.tiffany }}
          chevron={{ type: 'parto', name: 'left', color: COLOR.icon ,size: 10,}}
          onPress={() => sync()}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        /> */}
        {/* <ListItem
          title="تنظیمات"
          leftIcon={{ name: 'settings' }}
          chevron={{ type: 'parto', name: 'left', color: COLOR.icon,size: 10, }}
          onPress={() => navigateTo('')}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        /> */}
        {/* <ListItem
          title="نظرسنجی"
          leftIcon={{ name: 'dashboard', color: COLOR.icon }}
          bottomDivider
          chevron={{ type: 'parto', name: 'left', color: COLOR.icon,size: 10, }}
          onPress={() => navigateTo('Rating')}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        /> */}
        <ListItem
          title="معرفی به دوستان"
          leftIcon={{
            type: 'parto',
            name: 'tell-a-friend',
            color: COLOR.icon,
          }}
          bottomDivider
          chevron={{
            type: 'parto',
            name: 'left',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={share}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        />
        <ListItem
          title="ارتباط با پرتو"
          leftIcon={{ type: 'parto', name: 'contact-us', color: COLOR.icon }}
          bottomDivider
          chevron={{
            type: 'parto',
            name: 'left',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={() => navigateTo('ContactUs')}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
        />
        <ListItem
          title="درباره‌ی پرتو"
          leftIcon={{ type: 'parto', name: 'info', color: COLOR.icon }}
          chevron={{
            type: 'parto',
            name: 'left',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={() => navigateTo('AboutUs')}
          titleStyle={globalStyles.listItemTitle}
          containerStyle={globalStyles.listItem}
          contentContainerStyle={globalStyles.listItemContentContainer}
          bottomDivider
        />
        {template !== 'Partner' && (
          <ListItem
            title="پاک کردن داده‌ها"
            leftIcon={{
              type: 'parto',
              name: 'trash',
              color: COLOR.icon,
            }}
            chevron={{
              type: 'parto',
              name: 'left',
              color: COLOR.icon,
              size: 10,
            }}
            onPress={toggle}
            titleStyle={globalStyles.listItemTitle}
            containerStyle={globalStyles.listItem}
            contentContainerStyle={globalStyles.listItemContentContainer}
            bottomDivider={!(isLoggedIn === 'dummyToken')}
          />
        )}
        {!(isLoggedIn === 'dummyToken') && (
          <ListItem
            title="خروج"
            leftIcon={{ type: 'parto', name: 'exit', color: COLOR.icon }}
            chevron={{
              type: 'parto',
              name: 'left',
              color: COLOR.icon,
              size: 10,
            }}
            onPress={signOutToggle}
            titleStyle={globalStyles.listItemTitle}
            containerStyle={globalStyles.listItem}
            contentContainerStyle={globalStyles.listItemContentContainer}
          />
        )}
      </Card>
      <DialogBox
        isVisible={isVisible}
        isLoading={isLoading}
        hide={toggle}
        icon={<Icon type="parto" name="trash" color="#aaa" size={50} />}
        text="با تایید این پیام تمام داده‌های شما حذف و به حالت پیش‌فرض بازخواهد گشت؛ از پاک کردن داده‌ها مطمئن هستی؟"
        twoButtons
        firstBtnPress={async () => {
          setIsLoading(true);
          await resetDatabase();
          dispatch(fetchInitialCycleData());
          toggle();
          setIsLoading(false);
        }}
        secondBtnPress={toggle}
      />
      <DialogBox
        isVisible={signOutVisible}
        isLoading={isLoading}
        hide={signOutToggle}
        icon={<Icon type="parto" name="exit" color="#aaa" size={50} />}
        text="آیا می‌خواهید از حساب کاربری خود خارج شوید؟"
        twoButtons
        firstBtnPress={async () => {
          setIsLoading(true);
          await exit();
          signOutToggle();
          setIsLoading(false);
        }}
        secondBtnPress={signOutToggle}
      />
      <DialogBox
        isVisible={registrationAlertVisible}
        hide={toggleRegistrationAlert}
        text="پرتویی عزیز برای کمک گرفتن از دستیارهای پرتو لازمه اول ثبت‌نام کنی."
        firstBtnTitle="ثبت‌نام"
        firstBtnPress={async () => {
          await removeData('@token');
          dispatch(signUp());
        }}
      />
    </ScrollView>
  );
};
export default Menu;
