import React, { useEffect, useState } from 'react';
import { ScrollView, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from 'react-native-elements';
import TouchID from 'react-native-touch-id';
import DeviceInfo from 'react-native-device-info';
import UserGoal from './UserGoal';
import Card from '../../components/Card';
import { lockStatus, setLock } from '../../util/database/query';
import { shareContent } from '../../util/func';
import sync from '../../util/database/sync';
import { COLOR } from '../../styles/static';
import styles from './styles';
import { CafeBazaarLink, PlayStoreLink, MyketLink } from '../../services/urls';
import { signOut } from '../../store/actions/auth';

const Menu = ({ navigation }) => {
  const [isLock, setIsLock] = useState();
  const dispatch = useDispatch();
  const modeState = useSelector((state) => state.user.template);

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
          link = CafeBazaarLink;
          break;
      }
      shareContent(`لینک دانلود اپلیکیشن پرتو (سلامت بانوان):{'\n'}${link}`);
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* <UserProfile onPress={() => navigation.push('Profile')} /> */}
      {modeState === 'main' ? <UserGoal navigation={navigation} /> : null}
      <Card>
        <ListItem
          title="اطلاعات سلامت"
          leftIcon={{ name: 'local-pharmacy', color: COLOR.tiffany }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Profile')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          bottomDivider
        />
        <ListItem
          title="تنظیمات دوره‌ها"
          leftIcon={{ name: 'settings', color: COLOR.tiffany }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('CycleSettings')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
      </Card>
      <Card>
        <ListItem
          title="احکام"
          leftIcon={{ name: 'list', color: COLOR.tiffany }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Treatise')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          bottomDivider={modeState === 'main' ? true : false}
        />
        {modeState === 'main' ? (
          <ListItem
            title="کد همسر"
            leftIcon={{
              name: 'barcode',
              color: COLOR.tiffany,
              type: 'font-awesome',
            }}
            chevron={{ name: 'chevron-left', type: 'font-awesome' }}
            onPress={() => navigateTo('PartnerVerificationCode')}
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
          />
        ) : null}
      </Card>
      <Card>
        {/* <ListItem
          title="یادآوری‌ها"
          leftIcon={{ name: 'alarm-on', color: COLOR.tiffany }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Reminders')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        /> */}
        <ListItem
          title="قفل نرم افزار"
          leftIcon={{ name: 'lock', color: COLOR.tiffany }}
          switch={{
            value: isLock,
            onValueChange: lock,
            trackColor: { true: COLOR.lightPink, false: '#aaa' },
            thumbColor: isLock ? COLOR.btn : '#f4f3f4',
          }}
          bottomDivider
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="همگام‌سازی با سرور"
          leftIcon={{ name: 'sync', color: COLOR.tiffany }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => sync()}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
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
          leftIcon={{ name: 'loyalty', color: COLOR.tiffany }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={share}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="ارتباط با پرتو"
          leftIcon={{ name: 'touch-app', color: COLOR.tiffany }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('ContactUs')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="درباره‌ی پرتو"
          leftIcon={{ name: 'info', color: COLOR.tiffany }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('AboutUs')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          bottomDivider
        />
        <ListItem
          title="خروج"
          leftIcon={{ name: 'exit-to-app', color: COLOR.tiffany }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => dispatch(signOut())}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
      </Card>
    </ScrollView>
  );
};
export default Menu;
