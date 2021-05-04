import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';

// components
import UserGoal from './UserGoal';
import UserProfile from './UserProfile';
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
      shareContent(
        `لینک دانلود اپلیکیشن پرتو (دستیار هوشمند سلامت بانوان):\n${link}`,
      );
    });
  };
  const exit = async () => {
    await sync(true);
    dispatch(signOut());
  };
  return (
    <ScrollView style={styles.container}>
      <UserProfile onPress={() => navigateTo('Profile')} />
      {template !== 'Teenager' && (
        <Card>
          <UserGoal navigation={navigation} />
        </Card>
      )}
      {template !== 'Partner' && (
        <View style={styles.containerBtnItems}>
          {template === 'Main' && (
            <Card>
              <TouchableOpacity
                onPress={() => navigateTo('PartnerVerificationCode')}>
                <View style={styles.BtnItem}>
                  <Icon type="parto" name="man" color={COLOR.icon} />
                  <Text style={styles.listItemText}>کد همسر</Text>
                </View>
              </TouchableOpacity>
            </Card>
          )}
          <Card>
            <TouchableOpacity onPress={() => navigateTo('Treatise')}>
              <View style={styles.BtnItem}>
                <Icon type="parto" name="ahkam" color={COLOR.icon} />
                <Text style={styles.listItemText}>احکام</Text>
              </View>
            </TouchableOpacity>
          </Card>
          <Card>
            <TouchableOpacity onPress={() => navigateTo('CycleSettings')}>
              <View style={styles.BtnItem}>
                <Icon type="parto" name="settings" color={COLOR.icon} />
                <Text style={styles.listItemText}>تنظیمات دوره‌ها</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      )}
      {template === 'Partner' && (
        <Card>
          <ListItem
            title="احکام"
            leftIcon={{ type: 'parto', name: 'ahkam', color: COLOR.icon }}
            chevron={{ type: 'parto', name: 'back-arrow', color: COLOR.icon }}
            onPress={() => navigateTo('Treatise')}
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
          />
        </Card>
      )}
      <Card>
        <ListItem
          title="یادآوری‌ها"
          leftIcon={{ type: 'parto', name: 'bell', color: COLOR.icon }}
          bottomDivider
          chevron={{
            type: 'parto',
            name: 'back-arrow',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={() => navigateTo('Reminders')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="دستیار"
          leftIcon={{ type: 'parto', name: 'bell', color: COLOR.icon }}
          bottomDivider
          chevron={{
            type: 'parto',
            name: 'back-arrow',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={() => navigateTo('Assistant')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="قفل نرم افزار"
          leftIcon={{ type: 'parto', name: 'lock', color: COLOR.icon }}
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
          chevron={{ type: 'parto', name: 'back-arrow', color: COLOR.icon ,size: 10,}}
          onPress={() => sync()}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        /> */}
        {/* <ListItem
          title="تنظیمات"
          leftIcon={{ name: 'settings' }}
          chevron={{ type: 'parto', name: 'back-arrow', color: COLOR.icon,size: 10, }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        /> */}
      </Card>
      <Card>
        {/* <ListItem
          title="نظرسنجی"
          leftIcon={{ name: 'dashboard', color: COLOR.icon }}
          bottomDivider
          chevron={{ type: 'parto', name: 'back-arrow', color: COLOR.icon,size: 10, }}
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
            color: COLOR.icon,
          }}
          bottomDivider
          chevron={{
            type: 'parto',
            name: 'back-arrow',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={share}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="ارتباط با پرتو"
          leftIcon={{ type: 'parto', name: 'contact-us', color: COLOR.icon }}
          bottomDivider
          chevron={{
            type: 'parto',
            name: 'back-arrow',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={() => navigateTo('ContactUs')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="درباره‌ی پرتو"
          leftIcon={{ type: 'parto', name: 'info', color: COLOR.icon }}
          chevron={{
            type: 'parto',
            name: 'back-arrow',
            color: COLOR.icon,
            size: 10,
          }}
          onPress={() => navigateTo('AboutUs')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
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
              name: 'back-arrow',
              color: COLOR.icon,
              size: 10,
            }}
            onPress={toggle}
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
            bottomDivider={!(isLoggedIn === 'dummyToken')}
          />
        )}
        {!(isLoggedIn === 'dummyToken') && (
          <ListItem
            title="خروج"
            leftIcon={{ type: 'parto', name: 'exit', color: COLOR.icon }}
            chevron={{
              type: 'parto',
              name: 'back-arrow',
              color: COLOR.icon,
              size: 10,
            }}
            onPress={exit}
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
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
    </ScrollView>
  );
};
export default Menu;
