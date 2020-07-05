import React, { createRef, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, ListItem, Input, Icon, Button } from 'react-native-elements';
import styles from './Styles';
import UserAvatar from './UserAvatar';
import UserGoal from './UserGoal';
import { WheelPicker } from 'react-native-wheel-picker-android';
const Profile = ({ navigation }) => {
  const [bloodTypePickerVisible, setBloodTypePickerVisible] = useState(false);
  const [heightPickerVisible, setHeightPickerVisible] = useState(false);
  const [weightPickerVisible, setWeightPickerVisible] = useState(false);
  const [bloodType, setBloodType] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  const weightRange = ['45', '46', '47', '48', '49', '50', '51', '52'];
  const heightRange = [
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
  const chooseChevronByItemStatus = (itemDetailIsVisible) => {
    return itemDetailIsVisible
      ? { name: 'chevron-down', type: 'font-awesome' }
      : { name: 'chevron-left', type: 'font-awesome' };
  };
  const toggleVisibility = (item, setItemDetailVisible) => {
    return item ? setItemDetailVisible(false) : setItemDetailVisible(true);
  };
  return (
    <ScrollView>
      <UserAvatar />
      <UserGoal />
      <Card>
        <ScrollView>
          <ListItem
            title="گروه خونی"
            leftIcon={{ name: 'dashboard' }}
            bottomDivider
            chevron={chooseChevronByItemStatus(bloodTypePickerVisible)}
            onPress={() =>
              toggleVisibility(
                bloodTypePickerVisible,
                setBloodTypePickerVisible,
              )
            }
            rightTitle={bloodTypes[bloodType]}
          />
          {bloodTypePickerVisible ? (
            <View style={{ alignItems: 'center' }}>
              <WheelPicker
                selectedItem={bloodType}
                onItemSelected={setBloodType}
                data={bloodTypes}
                isCyclic={true}
              />
            </View>
          ) : null}
          <ListItem
            title="قد"
            leftIcon={{ name: 'dashboard' }}
            bottomDivider
            chevron={chooseChevronByItemStatus(heightPickerVisible)}
            onPress={() =>
              toggleVisibility(heightPickerVisible, setHeightPickerVisible)
            }
            rightTitle={heightRange[height]}
          />
          {heightPickerVisible ? (
            <View style={{ alignItems: 'center' }}>
              <WheelPicker
                selectedItem={height}
                onItemSelected={setHeight}
                data={heightRange}
                isCyclic={true}
              />
            </View>
          ) : null}

          <ListItem
            title="وزن"
            leftIcon={{ name: 'dashboard' }}
            bottomDivider
            chevron={chooseChevronByItemStatus(weightPickerVisible)}
            onPress={() =>
              toggleVisibility(weightPickerVisible, setWeightPickerVisible)
            }
            rightTitle={weightRange[weight]}
          />
          {weightPickerVisible ? (
            <View style={{ alignItems: 'center' }}>
              <WheelPicker
                selectedItem={weight}
                onItemSelected={setWeight}
                data={weightRange}
                isCyclic={true}
              />
            </View>
          ) : null}
          <ListItem
            title="میانگین ساعت خواب"
            input={{
              containerStyle: {
                maxWidth: 60,
              },
            }}
            leftIcon={{ name: 'dashboard' }}
            //chevron={{ name: 'chevron-left', type: 'font-awesome' }}
            //onPress={() => onItemPress()}
          />
        </ScrollView>
      </Card>
    </ScrollView>
  );
};
export default Profile;
