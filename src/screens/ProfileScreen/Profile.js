import React, { createRef } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import UserInfo from './UserInfo';
import styles from './Styles';
import HealthProfile from './HealthProfile';
const list = [
  {
    title: 'پروفایل سلامت',
    icon: 'local-pharmacy',
  },
  {
    title: 'یادآورها',
    icon: 'alarm-on',
  },
  {
    title: 'تنظیمات',
    icon: 'settings',
  },
  {
    title: 'خروج',
    icon: 'exit-to-app',
  },
];
const Profile = ({ navigation }) => {
  const healthProfileRef = createRef();
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
      <UserInfo />
      <Card title="هدف من" wrapperStyle={{ flexDirection: 'row' }}>
        <Icon
          raised
          //onPress={handleSubmit}
          name="ios-checkmark"
          type="ionicon"
          color="#f50"
          size={35}
          //containerStyle={styles.button}
        />
        <Icon
          raised
          //onPress={handleSubmit}
          name="ios-checkmark"
          type="ionicon"
          color="#f50"
          size={35}
          //containerStyle={styles.button}
        />
        <Icon
          raised
          //onPress={handleSubmit}
          name="ios-checkmark"
          type="ionicon"
          color="#f50"
          size={35}
          //containerStyle={styles.button}
        />
      </Card>
      <Card>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{ name: item.icon }}
            bottomDivider
            chevron={{ name: 'chevron-left', type: 'font-awesome' }}
            onPress={() => onItemPress(item.title)}
          />
        ))}
      </Card>
      <ActionSheet
        ref={healthProfileRef}
        gestureEnabled={true}
        bounceOnOpen={true}>
        <HealthProfile />
      </ActionSheet>
    </ScrollView>
  );
};
export default Profile;
