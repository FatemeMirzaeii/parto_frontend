import React, { createRef, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, ListItem, Input, Icon, Button } from 'react-native-elements';
import styles from './Styles';
import UserAvatar from './UserAvatar';
import UserGoal from './UserGoal';
import { WheelPicker } from 'react-native-wheel-picker-android';
const Profile = ({ navigation }) => {
  const [bloodTypePickervisible, setBloodTypePickerVisible] = useState(false);
  const [heightPickervisible, setHeightPickerVisible] = useState(false);
  const [weightPickervisible, setWeightPickerVisible] = useState(false);
  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  const weight = ['45', '46', '47', '48', '49', '50', '51', '52'];
  const height = [
    '130',
    '131',
    '132',
    '133',
    '134',
    '135',
    '136',
    '137',
    '138',
    '139',
    '140',
  ];
  return (
    <View>
      <UserAvatar />
      <UserGoal />
      <Card>
        <ListItem
          title="گروه خونی"
          leftIcon={{ name: 'dashboard' }}
          bottomDivider
          chevron={
            bloodTypePickervisible
              ? { name: 'chevron-down', type: 'font-awesome' }
              : { name: 'chevron-left', type: 'font-awesome' }
          }
          onPress={() =>
            bloodTypePickervisible
              ? setBloodTypePickerVisible(false)
              : setBloodTypePickerVisible(true)
          }
        />
        {bloodTypePickervisible ? <WheelPicker data={bloodTypes} /> : null}
        <ListItem
          title="قد"
          leftIcon={{ name: 'dashboard' }}
          bottomDivider
          chevron={
            heightPickervisible
              ? { name: 'chevron-down', type: 'font-awesome' }
              : { name: 'chevron-left', type: 'font-awesome' }
          }
          onPress={() =>
            heightPickervisible
              ? setHeightPickerVisible(false)
              : setHeightPickerVisible(true)
          }
        />
        {heightPickervisible ? <WheelPicker data={height} /> : null}
        <ListItem
          title="وزن"
          leftIcon={{ name: 'dashboard' }}
          bottomDivider
          chevron={
            weightPickervisible
              ? { name: 'chevron-down', type: 'font-awesome' }
              : { name: 'chevron-left', type: 'font-awesome' }
          }
          onPress={() =>
            weightPickervisible
              ? setWeightPickerVisible(false)
              : setWeightPickerVisible(true)
          }
        />
        {weightPickervisible ? <WheelPicker data={weight} /> : null}
        <ListItem
          title="میانگین ساعت خواب"
          leftIcon={{ name: 'dashboard' }}
          bottomDivider
          chevron={{ name: 'chevron-left', type: 'font-awesome' }}
          //onPress={() => onItemPress()}
        />
      </Card>
    </View>
  );
};
export default Profile;
