import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';
import UserAvatar from './UserAvatar';
import UserGoal from './UserGoal';
import PickerListItem from '../../components/PickerListItem';
import Card from '../../components/Card';
import {
  getProfileData,
  saveProfileHealthData,
} from '../../util/database/query';
import { COLOR } from '../../styles/static';

const Profile = ({ navigation }) => {
  const [birthdate, setBirthdate] = useState();
  const [persianDateString, setPersianDateString] = useState();
  const [bloodType, setBloodType] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [avgSleepingHours, setAvgSleepingHours] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfileData().then((res) => {
      if (res) {
        setBirthdate(res.birthdate);
        setPersianDateString(res.birthdate);
        setBloodType(res.blood_type);
        setWeight(res.weight);
        setHeight(res.height);
        setAvgSleepingHours(res.avg_sleeping_hour);
      }
    });
  }, []);
  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  const onBirthdateSelected = (date, persianDate) => {
    setBirthdate(date);
    setPersianDateString(persianDate);
  };
  const save = async () => {
    setLoading(true);
    await saveProfileHealthData(
      bloodType,
      weight,
      height,
      birthdate,
      avgSleepingHours,
    );
    setLoading(false);
    navigation.pop();
  };
  return (
    <SafeAreaView
      style={styles.safeAreaView}
      contentContainerStyle={styles.container}>
      <ScrollView>
        {/* <UserAvatar navigation={navigation} /> */}
        <UserGoal />
        <Card>
          <PickerListItem
            DatePicker
            title="تاریخ تولد"
            initialDate={birthdate}
            onDateSelected={onBirthdateSelected}
            leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
            rightTitle={{ title: birthdate }}
          />
          <PickerListItem
            title="گروه خونی"
            data={bloodTypes}
            selectedItem={bloodType}
            onItemSelected={setBloodType}
            leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
            rightTitle={{ title: bloodType }}
          />
          <PickerListItem
            title="قد"
            selectedItem={height}
            onItemSelected={setHeight}
            range={{ min: 100, max: 250 }}
            leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
            rightTitle={{ title: height, suffix: 'cm' }}
          />
          <PickerListItem
            title="وزن"
            selectedItem={weight}
            onItemSelected={setWeight}
            range={{ min: 30, max: 150 }}
            leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
            rightTitle={{ title: weight, suffix: 'Kg' }}
          />
          <PickerListItem
            title="میانگین ساعت خواب"
            selectedItem={avgSleepingHours}
            onItemSelected={setAvgSleepingHours}
            range={{ min: 2, max: 15 }}
            initPosition={7}
            leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
            rightTitle={{ title: avgSleepingHours, suffix: 'ساعت' }}
          />
        </Card>
        <Button
          loading={loading}
          title="ذخیره"
          onPress={() => save()}
          containerStyle={styles.btnContainer}
          buttonStyle={styles.nextButton}
          titleStyle={styles.listItemText}
          loadingStyle={{ color: COLOR.btn }}
          // icon={{name: 'user'}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
