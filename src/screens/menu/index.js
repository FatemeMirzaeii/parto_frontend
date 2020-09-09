import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, ToastAndroid } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import Database from '../../util/database';
import styles from './styles';
import Divider from './Divider';
import UserProfile from './UserProfile';
import { pregnancyMode, setLock, lockStatus } from '../../util/database/query';
import { AuthContext } from '../../contexts/AuthContext';
import { PROFILE } from '../../constants/database-tables';
import TouchID from 'react-native-touch-id';

const db = new Database();
const Menu = ({ navigation }) => {
  const [isLock, setIsLock] = useState();
  const { signOut } = useContext(AuthContext);
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
  // const changePregnancyMode = async () => {
  //   setPregnant(!pregnant);
  //   await db.rawQuery(
  //     `UPDATE ${PROFILE} SET pregnant=${pregnant}`,
  //     [],
  //     PROFILE,
  //   );
  //   if (pregnant) {
  //     navigation.navigate('Pregnancy_Q2', {
  //       mode: { pregnant: 1, pregnancy_try: 0, period: 0 },
  //     });
  //   }
  // };

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
    <ScrollView>
      <UserProfile onPress={() => navigation.push('Profile')} />
      <Card>
        <ListItem
          title="اطلاعات دوره‌ها"
          leftIcon={{ name: 'local-pharmacy' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('CycleSettings')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="تحلیل اطلاعات"
          leftIcon={{ name: 'timeline' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="پروفایل بارداری"
          leftIcon={{ name: 'pregnant-woman' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('PregnancyProfile')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
      </Card>
      <Divider />
      <Card>
        <ListItem
          title="پایگاه دانش"
          leftIcon={{ name: 'art-track' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Articles')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="ارتباط با کارشناسان"
          leftIcon={{ name: 'call' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
      </Card>
      <Divider />
      <Card>
        <ListItem
          title="یادآوری‌ها"
          leftIcon={{ name: 'alarm-on' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Reminders')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="قفل نرم افزار"
          leftIcon={{ name: 'lock' }}
          switch={{
            value: isLock,
            onValueChange: lock,
          }}
          bottomDivider
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="تنظیمات"
          leftIcon={{ name: 'settings' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
      </Card>
      <Divider />
      <Card>
        <ListItem
          title="نظرسنجی"
          leftIcon={{ name: 'dashboard' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('Rating')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="معرفی به دوستان"
          leftIcon={{ name: 'loyalty' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="ارتباط با پرتو"
          leftIcon={{ name: 'touch-app' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('ContactUs')}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
        <ListItem
          title="خروج"
          leftIcon={{ name: 'exit-to-app' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => signOut()}
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
        />
      </Card>
    </ScrollView>
  );
};
export default Menu;
