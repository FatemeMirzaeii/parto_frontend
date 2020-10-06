import React, { useEffect, useState } from 'react';
import { ScrollView, ToastAndroid } from 'react-native';
import { ListItem } from 'react-native-elements';
// import { AuthContext } from '../../contexts/AuthContext';
import TouchID from 'react-native-touch-id';
import Card from '../../components/Card';
import { lockStatus, setLock } from '../../util/database/query';
import { shareContent } from '../../util/func';
import { COLOR } from '../../styles/static';
import styles from './styles';

const Menu = ({ navigation }) => {
  const [isLock, setIsLock] = useState();
  // const { signOut } = useContext(AuthContext);
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

  return (
    <ScrollView style={styles.container}>
      {/* <UserProfile onPress={() => navigation.push('Profile')} /> */}
      <Card>
        <ListItem
          title="اطلاعات سلامت"
          leftIcon={{ name: 'local-pharmacy', color: COLOR.tiffany }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Profile')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
      </Card>
      <Card>
        <ListItem
          title="تنظیمات دوره‌ها"
          leftIcon={{ name: 'settings', color: COLOR.tiffany }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('CycleSettings')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="پروفایل بارداری"
          leftIcon={{ name: 'pregnant-woman', color: COLOR.tiffany }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('PregnancyProfile')}
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
        />
      </Card>
      <Card>
        <ListItem
          title="یادآوری‌ها"
          leftIcon={{ name: 'alarm-on', color: COLOR.tiffany }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Reminders')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="قفل نرم افزار"
          leftIcon={{ name: 'lock', color: COLOR.tiffany }}
          switch={{
            value: isLock,
            onValueChange: lock,
            trackColor: { true: COLOR.lightPink, false: '#aaa' },
            thumbColor: isLock ? COLOR.btn : '#f4f3f4',
          }}
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
        <ListItem
          title="نظرسنجی"
          leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Rating')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="معرفی به دوستان"
          leftIcon={{ name: 'loyalty', color: COLOR.tiffany }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() =>
            shareContent(
              'https://play.google.com/store/apps/details?id=ir.parto.parto',
            )
          }
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
        />
        {/* <ListItem
          title="خروج"
          leftIcon={{ name: 'exit-to-app' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => signOut()}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        /> */}
      </Card>
    </ScrollView>
  );
};
export default Menu;
