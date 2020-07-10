import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import DataBase from '../../components/Database';
import styles from './Styles';
import { Theme } from '../../app/Theme';
import UserAvatar from './UserAvatar';
import UserGoal from './UserGoal';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../../app/Functions';
import PersianDatePicker from '../../components/PersianDatePicker';
const db = new DataBase();

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.rawQuery('SELECT * FROM user_profile;', 'user_profile').then((n) => {
      const row = n[0];
      if (row) {
        console.log('roooooooooooooow', typeof row.birthdate, row.birthdate);
        setBirthdate(row.birthdate);
        setBloodType(row.blood_type);
        setWeight(row.weight);
        setHeight(row.height);
        setAvgSleepingHours(row.avg_sleeping_hour);
      }
    });
  }, []);
  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  const weightRange = setPickerRange(30, 150);
  const heightRange = setPickerRange(100, 250);

  const chooseChevronByItemStatus = (itemDetailIsVisible) => {
    return {
      name: itemDetailIsVisible ? 'chevron-down' : 'chevron-left',
      type: 'font-awesome',
    };
  };
  const renderRightTitle = (title) => {
    return !title || title.includes('undefined') ? '' : title;
  };
  const onBirthdateSelected = (date, persianDate) => {
    setBirthdate(date);
    setPersianDateString(persianDate);
  };
  const save = () => {
    setLoading(true);
    db.rawQuery(
      `UPDATE user_profile SET blood_type=${bloodType},
                               weight=${weight},
                               height=${height},
                               birthdate='${birthdate}',
                               avg_sleeping_hour=${avgSleepingHours}`,
      'user_profile',
    ).then(() => setLoading(false));
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
          onPress={() => setBirthdatePickerVisible(!birthdatePickerVisible)}
          rightTitle={renderRightTitle(persianDateString)}
          titleStyle={styles.listItem}
          rightTitleStyle={[
            styles.listItem,
            { width: 105, alignSelf: 'flex-start' },
          ]}
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
          onPress={() => setBloodTypePickerVisible(!bloodTypePickerVisible)}
          rightTitle={renderRightTitle(bloodTypes[bloodType])}
          titleStyle={styles.listItem}
        />
        {bloodTypePickerVisible ? (
          <View style={styles.picker}>
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
          onPress={() => setHeightPickerVisible(!heightPickerVisible)}
          rightTitle={`${renderRightTitle(heightRange[height])} cm`}
          titleStyle={styles.listItem}
          rightTitleStyle={styles.listItem}
        />
        {heightPickerVisible ? (
          <View style={styles.picker}>
            <WheelPicker
              selectedItem={height}
              onItemSelected={setHeight}
              data={heightRange}
              initPosition={60}
              isCyclic={true}
              selectedItemTextSize={20}
              itemTextFontFamily={Theme.fonts.regular}
              selectedItemTextFontFamily={Theme.fonts.regular}
            />
          </View>
        ) : null}

        <ListItem
          title="وزن"
          leftIcon={{ name: 'dashboard' }}
          bottomDivider
          chevron={chooseChevronByItemStatus(weightPickerVisible)}
          onPress={() => setWeightPickerVisible(!weightPickerVisible)}
          rightTitle={`${renderRightTitle(weightRange[weight])} Kg`}
          titleStyle={styles.listItem}
          rightTitleStyle={styles.listItem}
        />
        {weightPickerVisible ? (
          <View style={styles.picker}>
            <WheelPicker
              selectedItem={weight}
              onItemSelected={setWeight}
              data={weightRange}
              initPosition={30}
              isCyclic={true}
              selectedItemTextSize={20}
              itemTextFontFamily={Theme.fonts.regular}
              selectedItemTextFontFamily={Theme.fonts.regular}
            />
          </View>
        ) : null}
        <ListItem
          title="میانگین ساعت خواب"
          input={{
            value: `${avgSleepingHours ? avgSleepingHours : ''}`,
            placeholder: '۸',
            onChangeText: (value) => setAvgSleepingHours(value),
            containerStyle: {
              maxWidth: 70,
            },
          }}
          leftIcon={{ name: 'dashboard' }}
          titleStyle={styles.listItem}
          //onPress={() => onItemPress()}
        />
      </Card>
      <Button
        raised
        loading={loading}
        title="ذخیره"
        onPress={() => save()}
        type="outline"
        buttonStyle={styles.saveButton}
        containerStyle={styles.saveContainer}
        titleStyle={styles.saveTitle}
        loadingStyle={{ color: 'tomato' }}
      />
    </ScrollView>
  );
};
export default Profile;
