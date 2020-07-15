import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import Database from '../../components/Database';
import styles from './Styles';
import Divider from './Divider';
import UserProfile from './UserProfile';
const db = new Database();

const Menu = ({ navigation }) => {
  const [pregnancyMode, setPregnancyMode] = useState(false);
  const [isLock, setIsLock] = useState(false);
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  const changePregnancyMode = () => {
    setPregnancyMode(!pregnancyMode);
    db.rawQuery(
      `UPDATE user_profile SET pregnant=${pregnancyMode}`,
      'user_profile',
    );
  };
  const setLock = () => {
    setIsLock(!isLock);
    db.rawQuery(`UPDATE user_profile SET use_lock=${isLock}`, 'user_profile');
  };
  return (
    <ScrollView>
      <UserProfile onPress={() => navigation.navigate('Profile')} />
      <Card>
        <ListItem
          title="اطلاعات دوره ها"
          leftIcon={{ name: 'local-pharmacy' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('CycleSettings')}
          titleStyle={styles.listItem}
        />
        <ListItem
          title="تحلیل اطلاعات"
          leftIcon={{ name: 'timeline' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItem}
        />
        <ListItem
          title="بارداری"
          switch={{
            value: pregnancyMode,
            onValueChange: changePregnancyMode,
          }}
          leftIcon={{ name: 'pregnant-woman' }}
          titleStyle={styles.listItem}
        />
      </Card>
      <Divider />
      <Card>
        <ListItem
          title="پایگاه دانش"
          leftIcon={{ name: 'art-track' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItem}
        />
        <ListItem
          title="ارتباط با کارشناسان"
          leftIcon={{ name: 'call' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItem}
        />
      </Card>
      <Divider />
      <Card>
        <ListItem
          title="یادآوری ها"
          leftIcon={{ name: 'alarm-on' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItem}
        />
        <ListItem
          title="قفل نرم افزار"
          leftIcon={{ name: 'lock' }}
          switch={{
            value: isLock,
            onValueChange: setLock,
          }}
          bottomDivider
          titleStyle={styles.listItem}
        />
        <ListItem
          title="تنظیمات"
          leftIcon={{ name: 'settings' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItem}
        />
      </Card>
      <Divider />
      <Card>
        <ListItem
          title="پشتیبانی"
          leftIcon={{ name: 'dashboard' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItem}
        />
        <ListItem
          title="معرفی به دوستان"
          leftIcon={{ name: 'loyalty' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItem}
        />
        <ListItem
          title="درباره پرتو"
          leftIcon={{ name: 'touch-app' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItem}
        />
        <ListItem
          title="خروج"
          leftIcon={{ name: 'exit-to-app' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => navigateTo('')}
          titleStyle={styles.listItem}
        />
      </Card>
    </ScrollView>
  );
};
export default Menu;
