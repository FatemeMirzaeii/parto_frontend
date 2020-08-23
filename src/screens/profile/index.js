import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import DataBase from '../../lib/database';
import styles from './styles';
import UserAvatar from './UserAvatar';
import UserGoal from './UserGoal';
import PickerListItem from '../../components/PickerListItem';
const db = new DataBase();

const Profile = ({ navigation }) => {
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

  const onBirthdateSelected = (date, persianDate) => {
    setBirthdate(date);
    setPersianDateString(persianDate);
  };
  const save = () => {
    setLoading(true);
    db.rawQuery(
      `UPDATE user_profile SET blood_type='${bloodType}',
                               weight=${weight},
                               height=${height},
                               birthdate='${birthdate}',
                               avg_sleeping_hour=${avgSleepingHours}`,
      'user_profile',
    ).then(() => setLoading(false));
  };
  return (
    <ScrollView>
      <UserAvatar navigation={navigation} />
      <UserGoal />
      <Card>
        <PickerListItem
          DatePicker
          title="تاریخ تولد"
          initialDate={birthdate}
          onDateSelected={onBirthdateSelected}
          leftIcon={{ name: 'dashboard' }}
          rightTitle={{ title: persianDateString }}
        />
        <PickerListItem
          title="گروه خونی"
          data={bloodTypes}
          selectedItem={bloodType}
          onItemSelected={setBloodType}
          leftIcon={{ name: 'dashboard' }}
          rightTitle={{ title: bloodType }}
        />
        <PickerListItem
          title="قد"
          selectedItem={height}
          onItemSelected={setHeight}
          range={{ min: 100, max: 250 }}
          leftIcon={{ name: 'dashboard' }}
          rightTitle={{ title: height, suffix: 'cm' }}
        />
        <PickerListItem
          title="وزن"
          selectedItem={weight}
          onItemSelected={setWeight}
          range={{ min: 30, max: 150 }}
          leftIcon={{ name: 'dashboard' }}
          rightTitle={{ title: weight, suffix: 'Kg' }}
        />
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
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
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
        // icon={{name: 'user'}}
      />
    </ScrollView>
  );
};
export default Profile;
