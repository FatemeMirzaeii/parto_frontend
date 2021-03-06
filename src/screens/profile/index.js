import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { ListItem, Button, Icon } from 'react-native-elements';

// components and utils
import PickerListItem from '../../components/PickerListItem';
import Card from '../../components/Card';
import UserAvatar from './UserAvatar';
import {
  getProfileData,
  saveProfileHealthData,
} from '../../util/database/query';

// styles
import styles from './styles';
import { COLOR } from '../../styles/static';

const Profile = ({ navigation }) => {
  const [birthdate, setBirthdate] = useState();
  const [persianDateString, setPersianDateString] = useState();
  const [bloodType, setBloodType] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [avgSleepingHours, setAvgSleepingHours] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'حساب کاربری',
      headerRight: () => (
        <Icon
          reverse
          size={16}
          name="right-arrow"
          type="parto"
          color={COLOR.purple}
          onPress={() => navigation.pop()}
        />
      ),
      headerLeft: () =>
        // <Button
        //   title="ذخیره"
        //   type="outline"
        //   onPress={() => save()}
        //   containerStyle={styles.btnContainer}
        //   buttonStyle={styles.button}
        //   titleStyle={styles.btnTitle}
        //   loadingStyle={{ color: COLOR.pink }}
        // />
        null,
    });
  }, [navigation]);
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
  const save = useCallback(async () => {
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
  }, [bloodType, weight, height, birthdate, avgSleepingHours, navigation]);
  return (
    <SafeAreaView
      style={styles.safeAreaView}
      contentContainerStyle={styles.container}>
      <ScrollView>
        <UserAvatar navigation={navigation} />
        <Card hasHeader headerTitle="اطلاعات کاربری">
          <ListItem
            title="َشماره تلفن"
            // leftIcon={{ type: 'parto', name: 'health', color: COLOR.tiffany }}
            titleStyle={styles.listItemText}
            containerStyle={styles.listItem}
            contentContainerStyle={styles.listItemContent}
            rightTitle={user.phone ? `0${user.phone}` : '09XXXXXXXXX'}
            rightTitleStyle={styles.listItemText}
            bottomDivider
          />
          <PickerListItem
            DatePicker
            title="تاریخ تولد"
            initialDate={birthdate}
            onDateSelected={onBirthdateSelected}
            startOfRange={user.template === 'Teenager' ? 1381 : 1340}
            endOfRange={1390}
            // leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
            rightTitle={{ title: birthdate }}
          />
        </Card>
        <Card hasHeader headerTitle="اطلاعات سلامت">
          <PickerListItem
            title="گروه خونی"
            data={bloodTypes}
            selectedItem={bloodType}
            onItemSelected={setBloodType}
            // leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
            rightTitle={{ title: bloodType }}
            bottomDivider
          />
          <PickerListItem
            title="قد"
            selectedItem={height ?? '160'}
            onItemSelected={setHeight}
            range={{ min: 130, max: 210 }}
            // leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
            rightTitle={{ title: height, suffix: 'cm' }}
            bottomDivider
          />
          <PickerListItem
            title="وزن"
            selectedItem={weight ?? '60'}
            onItemSelected={setWeight}
            range={{ min: 30, max: 150 }}
            // leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
            rightTitle={{ title: weight, suffix: 'Kg' }}
            bottomDivider
          />
          <PickerListItem
            title="میانگین ساعت خواب"
            selectedItem={avgSleepingHours ?? '9'}
            onItemSelected={setAvgSleepingHours}
            range={{ min: 2, max: 15 }}
            // leftIcon={{ name: 'dashboard', color: COLOR.tiffany }}
            rightTitle={{ title: avgSleepingHours, suffix: 'ساعت' }}
          />
        </Card>
        {user.template !== 'Partner' && (
          <Button
            loading={loading}
            title="ذخیره"
            onPress={() => save()}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.button}
            titleStyle={styles.btnTitle}
            loadingStyle={{ color: COLOR.pink }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
