import React, { useEffect, useState, useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Button, Icon } from 'react-native-elements';

// components
import PickerListItem from '../../components/PickerListItem';
import Card from '../../components/Card';
import BackButton from '../../components/BackButton';
import UserAvatar from './UserAvatar';
import DialogBox from '../../components/DialogBox';

// utils
import {
  getProfileData,
  saveProfileHealthData,
  resetDatabase,
} from '../../util/database/query';
import useModal from '../../util/hooks/useModal';
import api from '../../services/api';
import { signOut } from '../../store/actions/auth';
import { fetchInitialCycleData } from '../../store/actions/cycle';
import sync from '../../util/database/sync';

// styles
import styles from './styles';
import globalStyles from '../../styles';
import { COLOR } from '../../styles/static';

const Profile = ({ navigation }) => {
  const [birthdate, setBirthdate] = useState();
  const [persianDateString, setPersianDateString] = useState();
  const [bloodType, setBloodType] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [avgSleepingHours, setAvgSleepingHours] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  const { isVisible, toggle } = useModal();
  const { isVisible: clearDataVisible, toggle: toggleClearData } = useModal();
  const { isVisible: signOutVisible, toggle: signOutToggle } = useModal();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'حساب کاربری',
      headerRight: () => <BackButton navigation={navigation} />,
      headerLeft: () => {
        return (
          user.template !== 'Partner' && (
            <Button
              loading={loading}
              title="ذخیره"
              onPress={save}
              containerStyle={[styles.btnContainer, { width: 50, height: 30 }]}
              buttonStyle={styles.button}
              titleStyle={styles.btnTitle}
              loadingStyle={{ color: COLOR.pink }}
            />
          )
        );
      },
    });
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
  }, [
    avgSleepingHours,
    birthdate,
    bloodType,
    height,
    loading,
    navigation,
    user.template,
    weight,
  ]);
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
  const exit = async () => {
    const res = await sync(true);
    if (res) dispatch(signOut());
  };

  const deleteAccount = async () => {
    const res = await api({
      method: 'DELETE',
      url: `/user/v1/user/${user.id}/fa`,
      // dev: true,
    });
    if (res) dispatch(signOut());
  };
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
            titleStyle={globalStyles.listItemTitle}
            containerStyle={globalStyles.listItem}
            contentContainerStyle={globalStyles.listItemContentContainer}
            rightTitle={user.phone ? `0${user.phone}` : '09XXXXXXXXX'}
            rightTitleStyle={globalStyles.listItemTitle}
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
        <Card>
          {user.template !== 'Partner' && (
            <ListItem
              title="پاک کردن داده‌ها"
              leftIcon={{
                type: 'parto',
                name: 'trash',
                color: COLOR.icon,
              }}
              chevron={{
                type: 'parto',
                name: 'left',
                color: COLOR.icon,
                size: 10,
              }}
              onPress={toggleClearData}
              titleStyle={globalStyles.listItemTitle}
              containerStyle={globalStyles.listItem}
              contentContainerStyle={globalStyles.listItemContentContainer}
              bottomDivider={!(isLoggedIn === 'dummyToken')}
            />
          )}
          {!(isLoggedIn === 'dummyToken') && (
            <ListItem
              title="خروج"
              leftIcon={{ type: 'parto', name: 'exit', color: COLOR.icon }}
              chevron={{
                type: 'parto',
                name: 'left',
                color: COLOR.icon,
                size: 10,
              }}
              onPress={signOutToggle}
              titleStyle={globalStyles.listItemTitle}
              containerStyle={globalStyles.listItem}
              contentContainerStyle={globalStyles.listItemContentContainer}
            />
          )}
        </Card>
        {!(isLoggedIn === 'dummyToken') && (
          <Card>
            <ListItem
              title="َحذف حساب کاربری"
              titleStyle={[globalStyles.listItemTitle, { color: 'red' }]}
              containerStyle={globalStyles.listItem}
              contentContainerStyle={globalStyles.listItemContentContainer}
              onPress={toggle}
              chevron={{
                type: 'parto',
                name: 'left',
                color: 'red',
                size: 10,
              }}
            />
          </Card>
        )}
      </ScrollView>
      <DialogBox
        isVisible={clearDataVisible}
        isLoading={isLoading}
        hide={toggleClearData}
        icon={<Icon type="parto" name="trash" color="#aaa" size={50} />}
        text="با تایید این پیام تمام داده‌های شما حذف و به حالت پیش‌فرض بازخواهد گشت؛ از پاک کردن داده‌ها مطمئن هستی؟"
        twoButtons
        firstBtnPress={async () => {
          setIsLoading(true);
          await resetDatabase();
          dispatch(fetchInitialCycleData());
          toggleClearData();
          setIsLoading(false);
        }}
        secondBtnPress={toggleClearData}
      />
      <DialogBox
        isVisible={signOutVisible}
        isLoading={isLoading}
        hide={signOutToggle}
        icon={<Icon type="parto" name="exit" color="#aaa" size={50} />}
        text="آیا می‌خواهید از حساب کاربری خود خارج شوید؟"
        twoButtons
        firstBtnPress={async () => {
          setIsLoading(true);
          await exit();
          signOutToggle();
          setIsLoading(false);
        }}
        secondBtnPress={signOutToggle}
      />

      <DialogBox
        isVisible={isVisible}
        isLoading={isLoading}
        hide={toggle}
        icon={<Icon type="parto" name="trash" color="#aaa" size={50} />}
        text="با تایید این پیام حساب کاربری و تمام اطلاعات شما حذف خواهد شد؛ آیا مطمئن هستی؟"
        twoButtons
        firstBtnPress={async () => {
          setIsLoading(true);
          await deleteAccount();
          toggle();
          setIsLoading(false);
        }}
        secondBtnPress={toggle}
      />
    </SafeAreaView>
  );
};
export default Profile;
