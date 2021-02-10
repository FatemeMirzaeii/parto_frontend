import React, { useEffect, useState } from 'react';
import { ScrollView, ToastAndroid, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';

// components
import UserGoal from './UserGoal';
import UserProfile from './UserProfile';
import Loader from '../../components/Loader';
import Card from '../../components/Card';
import DialogBox from '../../components/DialogBox';

// utils and store
import { resetDatabase, lockStatus, setLock } from '../../util/database/query';
import { shareContent } from '../../util/func';
import sync from '../../util/database/sync';
import useModal from '../../util/hooks/useModal';
import { CafeBazaarLink, PlayStoreLink, MyketLink } from '../../services/urls';
import { signOut } from '../../store/actions/auth';
import { fetchInitialCycleData } from '../../store/actions/cycle';

// styles
import { COLOR } from '../../styles/static';
import styles from './styles';

const Menu = ({ navigation }) => {
  const [isLock, setIsLock] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const isLoggedIn = useSelector((state) => state.user.id);
  const isLoggedIn = useSelector((state) => state.auth.userToken);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();
  const { isVisible, toggle } = useModal();

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
      shareContent(`لینک دانلود اپلیکیشن پرتو (سلامت بانوان):\n${link}`);
    });
  };
  const clearData = async () => {
    Alert.alert(
      '',
      'با تایید این پیام تمام داده‌های شما حذف و به حالت پیش‌فرض بازخواهد گشت؛ از پاک کردن داده‌ها مطمئن هستی؟',
      [
        {
          text: 'بله',
          onPress: async () => {
            setIsLoading(true);
            await resetDatabase();
            dispatch(fetchInitialCycleData());
            setIsLoading(false);
          },
        },
        {
          text: 'خیر',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };
  return (
    <ScrollView style={styles.container}>
      <UserProfile onPress={() => navigateTo('Profile')} />
      {template !== 'Teenager' ? <UserGoal navigation={navigation} /> : null}
      <Card>
        <ListItem
          title="تنظیمات دوره‌ها"
          leftIcon={{ type: 'parto', name: 'settings', color: COLOR.purple }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('CycleSettings')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          bottomDivider={template === 'Main' ? true : false}
        />
        {template === 'Main' && (
          <ListItem
            title="کد همسر"
            leftIcon={{
              name: 'barcode',
              color: COLOR.purple,
              type: 'font-awesome',
            }}
            chevron={{ name: 'chevron-left', type: 'font-awesome' }}
            onPress={() => navigateTo('PartnerVerificationCode')}
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
          />
        )}
      </Card>
      <Card>
        <ListItem
          title="احکام"
          leftIcon={{ type: 'parto', name: 'ahkam', color: COLOR.purple }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Treatise')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
      </Card>
      <Card>
        {/* <ListItem
          title="یادآوری‌ها"
          leftIcon={{type: 'parto', name: 'bell', color: COLOR.tiffany }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Reminders')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        /> */}
        <ListItem
          title="قفل نرم افزار"
          leftIcon={{ type: 'parto', name: 'lock', color: COLOR.purple }}
          switch={{
            value: isLock,
            onValueChange: lock,
            trackColor: { true: COLOR.lightPink, false: '#aaa' },
            thumbColor: isLock ? COLOR.pink : '#f4f3f4',
          }}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        {/* <ListItem
          title="همگام‌سازی با سرور"
          leftIcon={{ name: 'sync', color: COLOR.tiffany }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => sync()}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        /> */}
        {/* <ListItem
          title="تنظیمات"
          leftIcon={{ name: 'settings' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        /> */}
      </Card>
      <Card>
        {/* <ListItem
          title="نظرسنجی"
          leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Rating')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        /> */}
        <ListItem
          title="معرفی به دوستان"
          leftIcon={{
            type: 'parto',
            name: 'tell-a-friend',
            color: COLOR.purple,
          }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={share}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="ارتباط با پرتو"
          leftIcon={{ type: 'parto', name: 'contact-us', color: COLOR.purple }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('ContactUs')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="درباره‌ی پرتو"
          leftIcon={{ type: 'parto', name: 'info', color: COLOR.purple }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('AboutUs')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          bottomDivider
        />
        {isLoading ? (
          <Loader />
        ) : (
          template !== 'Partner' && (
            <ListItem
              title="پاک کردن داده‌ها"
              leftIcon={{
                type: 'parto',
                name: 'trash',
                color: COLOR.purple,
              }}
              chevron={{ name: 'chevron-left', type: 'font-awesome' }}
              // onPress={clearData}
              onPress={toggle}
              titleStyle={styles.listItemText}
              containerStyle={styles.listItem}
              contentContainerStyle={styles.listItemContent}
              bottomDivider={!(isLoggedIn === 'dummyToken')}
            />
          )
        )}
        {!(isLoggedIn === 'dummyToken') && (
          <ListItem
            title="خروج"
            leftIcon={{ type: 'parto', name: 'exit', color: COLOR.purple }}
            chevron={{ name: 'chevron-left', type: 'font-awesome' }}
            onPress={() => dispatch(signOut())}
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
          />
        )}
      </Card>
      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        icon={<Icon type="parto" name="trash" color="#aaa" size={50} />}
        text="با تایید این پیام تمام داده‌های شما حذف و به حالت پیش‌فرض بازخواهد گشت؛ از پاک کردن داده‌ها مطمئن هستی؟"
        twoButtons
        firstBtnPress={async () => {
          setIsLoading(true);
          await resetDatabase();
          dispatch(fetchInitialCycleData());
          setIsLoading(false);
        }}
        secondBtnPress={toggle}
      />
    </ScrollView>
  );
};
export default Menu;
