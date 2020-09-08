import React, { useState, useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import Database from '../../lib/database';
import styles from './styles';
import Divider from './Divider';
import UserProfile from './UserProfile';
import { AuthContext } from '../../contexts/AuthContext';

const db = new Database();
let questionArray = [];
const Menu = ({ navigation }) => {
  const [pregnancyMode, setPregnancyMode] = useState(false);
  const [isLock, setIsLock] = useState(false);
  const { signOut } = useContext(AuthContext);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  const changePregnancyMode = async () => {
    setPregnancyMode(!pregnancyMode);
    await db.rawQuery(
      `UPDATE user_profile SET pregnant=${pregnancyMode}`,
      'user_profile',
    );
    if (pregnancyMode) {
      questionArray.push({ pregnant: 1, pregnancy_try: 0, period: 0 });
    } else {
      questionArray.push({ pregnant: 0, pregnancy_try: 0, period: 1 });
    }
    navigation.navigate('Q2', { questionArray });
  };

  const setLock = () => {
    setIsLock(!isLock);
    db.rawQuery(`UPDATE user_profile SET use_lock=${isLock}`, 'user_profile');
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
          title="بارداری"
          switch={{
            value: pregnancyMode,
            onValueChange: changePregnancyMode,
          }}
          leftIcon={{ name: 'pregnant-woman' }}
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
            onValueChange: setLock,
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
