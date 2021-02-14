import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Icon, Button, ListItem } from 'react-native-elements';
import jalaali from 'moment-jalaali';

//redux
import { useSelector, useDispatch } from 'react-redux';

//store
import { fetchInitialCycleData } from '../../store/actions/cycle';

//components
// import PregnancyPicker from '../../components/PregnancyPicker';
import Card from '../../components/Card';
import DialogBox from '../../components/DialogBox';
import PickerListItem from '../../components/PickerListItem';

//util
import pregnancyModule from '../../util/pregnancy';
import {
  deletePregnancyData,
  getActivePregnancyData,
  updatePregnancyData,
  updateUserStatus,
} from '../../util/database/query';
import useModal from '../../util/hooks/useModal';

//styles
import styles from './styles';
import { COLOR, FONT } from '../../styles/static';
import globalStyles from '../../styles';

const PregnancyProfile = ({ navigation, route }) => {
  const [dueDate, setDueDate] = useState();
  const [pregnancyWeek, setPregnancyWeek] = useState(0);
  const [pregnancyWeekDay, setPregnancyWeekDay] = useState(0);
  const template = useSelector((state) => state.user.template);
  const dispatch = useDispatch();
  const { isVisible, toggle } = useModal();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'پروفایل بارداری',
      headerLeft: null,
      // () => (
      //   <Button
      //     title="ثبت"
      //     type="outline"
      //     disabled={!dueDate}
      //     onPress={save}
      //     titleStyle={globalStyles.headerBtnTitle}
      //     containerStyle={globalStyles.smallHeaderBtn}
      //   />
      // ),
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
    });
    const save = () => {
      updatePregnancyData(dueDate);
      navigation.pop();
    };
  }, [dueDate, navigation]);

  useEffect(() => {
    getActivePregnancyData().then((dd) => {
      if (dd.due_date) setDueDate(dd.due_date);
    });
    setPregnancyAge();
  }, []);
  const setPregnancyAge = async () => {
    const p = await pregnancyModule();
    const pregnancyAge = p.determinePregnancyWeek(jalaali());
    if (pregnancyAge) {
      setPregnancyWeek(pregnancyAge.week);
      setPregnancyWeekDay(pregnancyAge.days);
    }
  };

  return (
    <ScrollView>
      <Card>
        <ListItem
          title="سن بارداری"
          rightTitle={
            pregnancyWeek
              ? `${pregnancyWeek} هفته ${
                  pregnancyWeekDay ? `و ${pregnancyWeekDay} روز` : ''
                }`
              : ''
          }
          // leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          // subtitle="سن بارداری شما بر اساس اولین روز از آخرین پریود شما محاسبه شده است."
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          subtitleStyle={styles.subTitle}
          rightTitleStyle={[
            styles.listItemText,
            {
              maxWidth: 90,
              textAlign: 'right',
            },
          ]}
          // customComponent={
          //   <PregnancyPicker
          //     selectedWeek={pregnancyWeek}
          //     onWeekSelected={setPregnancyWeek}
          //     selectedDay={pregnancyWeekDay}
          //     onWeekDaySelected={setPregnancyWeekDay}
          //   />
          // }
        />
        <ListItem
          title="تاریخ زایمان"
          rightTitle={dueDate && jalaali(dueDate).format('jYYYY / jM / jD')}
          // leftIcon={{ name: 'restore', color: COLOR.tiffany }}
          // subtitle="تاریخ زایمان شما بر اساس تاریخ آخرین پریود شما محاسبه شده است."
          titleStyle={styles.listItemText}
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          subtitleStyle={styles.subTitle}
          rightTitleStyle={[
            styles.listItemText,
            {
              maxWidth: 90,
              textAlign: 'right',
            },
          ]}
          // customComponent={
          //   <Calendar
          //     jalali
          //     firstDay={6}
          //     current={dueDate}
          //     minDate={new Date()}
          //     hideExtraDays
          //     enableSwipeMonths
          //     onDayPress={(day) => {
          //       setDueDate(day.dateString);
          //     }}
          //     markedDates={{
          //       [dueDate]: { selected: true },
          //     }}
          //     theme={{
          //       textSectionTitleColor: COLOR.black,
          //       calendarBackground: 'transparent',
          //       selectedDayTextColor: COLOR.white,
          //       textDisabledColor: COLOR.textColorDark,
          //       textDayFontFamily: FONT.regular,
          //       textMonthFontFamily: FONT.regular,
          //       textDayHeaderFontFamily: FONT.regular,
          //       selectedDayBackgroundColor: COLOR.tiffany,
          //       textDayHeaderFontSize: 8,
          //       arrowColor: COLOR.tiffany,
          //       todayTextColor: COLOR.tiffany,
          //     }}
          //   />
          //}
        />
        <ListItem
          subtitle="سن بارداری و تاریخ زایمان شما بر اساس اولین روز از آخرین پریود شما محاسبه شده است."
          containerStyle={styles.listItem}
          contentContainerStyle={styles.listItemContent}
          subtitleStyle={styles.subTitle}
        />
      </Card>
      {template === 'Main' && (
        <View style={styles.btnsWrapper}>
          <Button
            title="پایان بارداری"
            onPress={() =>
              navigation.navigate('PregnancyEnd', { ...route.params })
            }
            // buttonStyle={styles.saveContainer}
            // containerStyle={styles.saveButton}
            // titleStyle={styles.saveTitle}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.button}
            titleStyle={styles.btnTitle}
          />
          <Button
            title="حذف اطلاعات بارداری"
            //type="outline"
            onPress={
              toggle
              // Alert.alert(
              //   '',
              //   'آیا از حذف اطلاعات بارداری خود مطمئن هستید؟',
              //   [
              //     {
              //       text: 'بله',
              //       onPress: async () => {
              //         await deletePregnancyData();
              //         await updateUserStatus(0, 0);
              //         dispatch(fetchInitialCycleData());
              //         navigation.pop();
              //       },
              //     },
              //     {
              //       text: 'خیر',
              //       onPress: () => {
              //         return;
              //       },
              //       style: 'cancel',
              //     },
              //   ],
              //   { cancelable: true },
              // )
            }
            // buttonStyle={styles.deleteContainer}
            // containerStyle={styles.deleteButton}
            // titleStyle={styles.deleteTitle}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.deletebutton}
            titleStyle={styles.deleteBtnTitle}
          />
        </View>
      )}
      <DialogBox
        isVisible={isVisible}
        hide={toggle}
        icon={<Icon type="parto" name="trash" color="#aaa" size={50} />}
        text="آیا از حذف اطلاعات بارداری خود مطمئن هستید؟"
        twoButtons
        firstBtnPress={async () => {
          toggle();
          await deletePregnancyData();
          await updateUserStatus(0, 0);
          dispatch(fetchInitialCycleData());
          navigation.pop();
        }}
        secondBtnPress={toggle}
      />
    </ScrollView>
  );
};
export default PregnancyProfile;
