import React, { useEffect, useState } from 'react';
import { SafeAreaView, ImageBackground, View } from 'react-native';
import { Button } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';

//components and utils
import Stepper from '../../components/Stepper';
import Ptxt from '../../components/Ptxt';
import { setPickerRange } from '../../util/func';
import PregnancyModule from '../../util/pregnancy';

//styles and images
import { FONT } from '../../styles/static';
import styles from './styles';
import Main from '../../../assets/images/main/interview.png';

const Pregnancy_Q2 = ({ route, navigation }) => {
  const [selectedWeek, setSelectedWeek] = useState();
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);

  const onNextPress = async () => {
    const p = await PregnancyModule();
    const lastPeriodDate = p.determineLastPeriodDateBasedOnPregnancyWeek(
      isNaN(selectedWeek) ? 1 : selectedWeek + 1,
      isNaN(selectedDay) ? 0 : selectedDay,
    );
    const dueDate = p.determineDueDate(lastPeriodDate);
    navigation.navigate('Q5', {
      ...route.params,
      lastPeriodDate,
      dueDate,
    });
  };

  function onForgotPress() {
    navigation.navigate('Notice', {
      ...route.params,
      txt: `نگران نباشید!${'\n'}پرتو به شما کمک خواهد کرد که از راه دیگری هفته‌های بارداری‌تان را مشخص کنید.`,
      nextPage: 'Pregnancy_Q3',
    });
  }
  return (
    <ImageBackground source={Main} style={styles.bg}>
      <SafeAreaView style={styles.safeAreaView}>
        <Ptxt style={styles.question}>چند هفته است که باردار هستید؟</Ptxt>
        <View style={styles.pickerGroup}>
          <WheelPicker
            data={setPickerRange(0, 7)}
            selectedItem={selectedDay}
            onItemSelected={setSelectedDay}
            isCyclic={true}
            itemTextSize={21}
            selectedItemTextSize={21}
            itemTextFontFamily={FONT.regular}
            selectedItemTextFontFamily={FONT.regular}
            style={styles.pregnancy_picker}
          />
          <WheelPicker
            data={['روز']}
            itemTextSize={21}
            selectedItemTextSize={21}
            itemTextFontFamily={FONT.regular}
            selectedItemTextFontFamily={FONT.regular}
            style={styles.pregnancy_picker}
          />
          <WheelPicker
            data={setPickerRange(1, 43)}
            selectedItem={selectedWeek}
            onItemSelected={setSelectedWeek}
            isCyclic={true}
            itemTextSize={21}
            selectedItemTextSize={21}
            itemTextFontFamily={FONT.regular}
            selectedItemTextFontFamily={FONT.regular}
            style={styles.pregnancy_picker}
          />
          <WheelPicker
            data={['هفته']}
            itemTextSize={21}
            selectedItemTextSize={21}
            itemTextFontFamily={FONT.regular}
            selectedItemTextFontFamily={FONT.regular}
            style={styles.pregnancy_picker}
          />
        </View>
        <View>
          <Button
            title="فراموش کردم"
            titleStyle={styles.darkBtnTitle}
            type="clear"
            onPress={() => onForgotPress()}
          />
          <Stepper index={1} />
          <View style={styles.buttons}>
            <Button
              title="بعدی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={() => onNextPress()}
            />
            <Button
              title="قبلی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.prevButton}
              titleStyle={styles.darkBtnTitle}
              type="solid"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Pregnancy_Q2;
