import React, { createRef } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements';
import styles from './Styles';
import Divider from './Divider';
import UserProfile from './UserProfile';
const Menu = ({ navigation }) => {
  const onItemPress = (item) => {
    switch (item) {
      case 'پروفایل سلامت':
        healthProfileRef.current?.setModalVisible();
        break;
      case '':
        break;
      case 'یادآورها':
        break;
      case 'تنظیمات':
        break;
      case 'خروج':
    }
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
          onPress={() => onItemPress()}
        />
        <ListItem
          title="تحلیل اطلاعات"
          leftIcon={{ name: 'timeline' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
        <ListItem
          title="بارداری"
          leftIcon={{ name: 'pregnant-woman' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
      </Card>
      <Divider />
      <Card>
        <ListItem
          title="پایگاه دانش"
          leftIcon={{ name: 'art-track' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
        <ListItem
          title="ارتباط با کارشناسان"
          leftIcon={{ name: 'call' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
      </Card>
      <Divider />
      <Card>
        <ListItem
          title="یادآوری ها"
          leftIcon={{ name: 'alarm-on' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
        <ListItem
          title="قفل نرم افزار"
          leftIcon={{ name: 'lock' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
        <ListItem
          title="تنظیمات"
          leftIcon={{ name: 'settings' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
      </Card>
      <Divider />
      <Card>
        <ListItem
          title="پشتیبانی"
          leftIcon={{ name: 'dashboard' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
        <ListItem
          title="معرفی به دوستان"
          leftIcon={{ name: 'loyalty' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
        <ListItem
          title="درباره پرتو"
          leftIcon={{ name: 'touch-app' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
        <ListItem
          title="خروج"
          leftIcon={{ name: 'exit-to-app' }}
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          onPress={() => onItemPress()}
        />
      </Card>
    </ScrollView>
  );
};
export default Menu;
