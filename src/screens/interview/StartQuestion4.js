import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../../lib/func';
import { FONT } from '../../styles/static';
import styles from './styles';

const StartQuestion4 = ({ route, navigation }) => {
  const { mode, lastPeriodDate, periodLength } = route.params;
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const onNextPress = (cycleLength) => {
    navigation.navigate('StartQuestion5', {
      mode,
      lastPeriodDate,
      periodLength,
      cycleLength,
    });
  };
  function onForgotPress() {
    navigation.navigate('Notice', {
      txt:
        'پرتو فاصله میان دوره های شما را 28 روزه قرار می دهد تا در دوره های بعدی خودتان آن را ثبت کنید تا بتوانیم به پیش بینی دقیق تری از دوره های شما برسیم.',
      nextPage: 'StartQuestion5',
      mode,
      lastPeriodDate,
      periodLength,
      cycleLength: 28,
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/start/3.png')}
        style={styles.bg}>
        <Text style={styles.question}>
          میانگین فاصله دوره های تان چند روز است؟{'\n'}( معمولا 26 الی 30 روز)
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
        <View style={{ top: 250 }}>
          <Button
            title="فراموش کردم"
            titleStyle={styles.darkBtnTitle}
            type="clear"
            onPress={() => onForgotPress()}
          />
          <View style={styles.buttons}>
            <Button
              title="قبلی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.prevButton}
              titleStyle={styles.darkBtnTitle}
              type="solid"
              onPress={() => navigation.goBack()}
            />
            <Button
              title="بعدی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={() => onNextPress(selectedItem + 10)}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default StartQuestion4;
