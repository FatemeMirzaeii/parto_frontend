import React, { useEffect, useState } from 'react';
import { SafeAreaView, ImageBackground, View } from 'react-native';
import { Button } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../../util/func';
import PregnancyModule from '../../util/pregnancy';
import { FONT } from '../../styles/static';
import Ptxt from '../../components/Ptxt';
import styles from './styles';

const Pregnancy_Q2 = ({ route, navigation }) => {
  const [selectedWeek, setSelectedWeek] = useState();
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);

  const onNextPress = async () => {
    const p = await PregnancyModule();
    const lastPeriodDate = p.determenineLastPeriodDateBasedOnPregnancyWeek(
      isNaN(selectedWeek) ? 1 : selectedWeek + 1,
      isNaN(selectedDay) ? 0 : selectedDay,
    );
    navigation.navigate('Q5', {
      ...route.params,
      lastPeriodDate,
    });
  };

  function onForgotPress() {
    navigation.navigate('Notice', {
      ...route.params,
      txt:
        'نگران نباشید. پرتو به شما کمک خواهد کرد که از راه دیگری هفته های بارداری تان را مشخص کنید.',
      nextPage: 'Pregnancy_Q3',
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/start/1.png')}
        style={styles.bg}>
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
        <View style={{ top: 250 }}>
          <Button
            title="فراموش کردم"
            titleStyle={styles.darkBtnTitle}
            type="clear"
            onPress={() => onForgotPress()}
          />
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
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Pregnancy_Q2;
