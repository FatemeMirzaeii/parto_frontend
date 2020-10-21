import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../../util/func';
import { CYCLE_LENGTH } from '../../constants/cycle';
import { FONT } from '../../styles/static';
import styles from './styles';

const Q4 = ({ route, navigation }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const onNextPress = (cycleLength) => {
    navigation.navigate('Q5', {
      ...route.params,
      cycleLength: isNaN(cycleLength) ? CYCLE_LENGTH : cycleLength,
    });
  };
  function onForgotPress() {
    navigation.navigate('Notice', {
      txt: `پرتو فعلا طول دوره ها رو در حالت معمول ${CYCLE_LENGTH} روزه در نظر میگیره.\nبعدا میتونی داخل نرم افزار این عدد رو تغییر بدی.`,
      nextPage: 'Q5',
      ...route.params,
      cycleLength: CYCLE_LENGTH,
    });
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        source={require('../../../assets/images/start/3.png')}
        style={styles.bg}>
        <Text style={styles.question}>
          طول یک دوره ماهانه‌ات تقریبا چند روزه است؟
          {'\n'}
          (فاصله بین اولین روز هر پریود تا اولین روز پریود بعدی)
          {/* {'\n'}
          معمولا بین 28 الی 30 روز */}
        </Text>
        <WheelPicker
          data={setPickerRange(10, 100)}
          selectedItem={selectedItem}
          onItemSelected={setSelectedItem}
          initPosition={18}
          isCyclic={true}
          itemTextSize={21}
          selectedItemTextSize={21}
          itemTextFontFamily={FONT.regular}
          selectedItemTextFontFamily={FONT.regular}
          style={styles.picker}
        />
        <View>
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
              onPress={() => onNextPress(selectedItem + 10)}
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

export default Q4;
