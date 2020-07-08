import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, ListItem, Input, Icon, Button } from 'react-native-elements';
import styles from './Styles';
import UserAvatar from './UserAvatar';
import UserGoal from './UserGoal';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../../app/Functions';
import PersianDatePicker from '../../components/PersianDatePicker';

const Profile = ({ navigation }) => {
  const [birthdatePickerVisible, setBirthdatePickerVisible] = useState(false);
  const [bloodTypePickerVisible, setBloodTypePickerVisible] = useState(false);
  const [heightPickerVisible, setHeightPickerVisible] = useState(false);
  const [weightPickerVisible, setWeightPickerVisible] = useState(false);
  const [birthdate, setBirthdate] = useState();
  const [persianDateString, setPersianDateString] = useState();
  const [bloodType, setBloodType] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [avgSleepingHours, setAvgSleepingHours] = useState();

  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  const weightRange = setPickerRange(30, 150);
  const heightRange = setPickerRange(100, 250);

  const chooseChevronByItemStatus = (itemDetailIsVisible) => {
    return itemDetailIsVisible
      ? { name: 'chevron-down', type: 'font-awesome' }
      : { name: 'chevron-left', type: 'font-awesome' };
  };

  const toggleVisibility = (item, setItemDetailVisible) => {
    return item ? setItemDetailVisible(false) : setItemDetailVisible(true);
  };
  const onBirthdateSelected = (date, persianDate) => {
    setBirthdate(date);
    setPersianDateString(persianDate);
  };
  return (
    <ScrollView>
      <UserAvatar />
      <UserGoal />
      <Card>
        <ListItem
          title="تاریخ تولد"
          leftIcon={{ name: 'dashboard' }}
          bottomDivider
          chevron={chooseChevronByItemStatus(birthdatePickerVisible)}
          onPress={() =>
            toggleVisibility(birthdatePickerVisible, setBirthdatePickerVisible)
          }
          rightTitle={
            !persianDateString || persianDateString.includes('undefined')
              ? ''
              : persianDateString
          }
          titleStyle={styles.listItem}
          rightTitleStyle={[styles.listItem, { width: 105 }]}
        />
        {birthdatePickerVisible ? (
          <View style={styles.picker}>
            <PersianDatePicker
              initialDate={birthdate}
              onDateSelected={onBirthdateSelected}
            />
          </View>
        ) : null}
        <ListItem
          title="گروه خونی"
          leftIcon={{ name: 'dashboard' }}
          bottomDivider
          chevron={chooseChevronByItemStatus(bloodTypePickerVisible)}
          onPress={() =>
            toggleVisibility(bloodTypePickerVisible, setBloodTypePickerVisible)
          }
          rightTitle={!bloodTypes[bloodType] ? '' : bloodTypes[bloodType]}
          titleStyle={styles.listItem}
        />
        {bloodTypePickerVisible ? (
          <View style={styles.picker}>
            <WheelPicker
              selectedItem={bloodType}
              onItemSelected={setBloodType}
              data={bloodTypes}
              isCyclic={true}
              //itemTextFontFamily={Theme.fonts.regular}
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
          rightTitle={!heightRange[height] ? '' : `${heightRange[height]} cm`}
          titleStyle={styles.listItem}
        />
        {heightPickerVisible ? (
          <View style={styles.picker}>
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
          rightTitle={!weightRange[weight] ? '' : `${weightRange[weight]} Kg`}
          titleStyle={styles.listItem}
        />
        {weightPickerVisible ? (
          <View style={styles.picker}>
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
            value: avgSleepingHours,
            placeholder: '8',
            onChangeText: (value) => setAvgSleepingHours(value),
            containerStyle: {
              maxWidth: 60,
            },
          }}
          leftIcon={{ name: 'dashboard' }}
          titleStyle={styles.listItem}
          //onPress={() => onItemPress()}
        />
      </Card>
    </ScrollView>
  );
};
export default Profile;
