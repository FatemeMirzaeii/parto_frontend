import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../../util/func';
import { PERIOD_LENGTH } from '../../constants/cycle';
import { FONT } from '../../styles/static';
import styles from './styles';

const Q3 = ({ route, navigation }) => {
  const [selectedItem, setSelectedItem] = useState();
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const onNextPress = (periodLength) => {
    navigation.navigate('Q4', {
      ...route.params,
      periodLength: isNaN(periodLength) ? PERIOD_LENGTH : periodLength,
    });
  };
  const onForgotPress = () => {
    navigation.navigate('Notice', {
      ...route.params,
      txt: `پرتو طول دوره شما را ${PERIOD_LENGTH} روزه قرار می دهد تا در دوره های بعدی خودتان آن را ثبت کنید تا بتوانیم به پیش بینی دقیق تری از دوره های شما برسیم.`,
      nextPage: 'Q4',
      periodLength: PERIOD_LENGTH,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/start/2.png')}
        style={styles.bg}>
        <Text style={styles.question}>
          میانگین روزهای پریود شما چند روز است؟
          {'\n'}( معمولا 4 الی 7 روز)
        </Text>
        <WheelPicker
          data={setPickerRange(2, 15)}
          selectedItem={selectedItem}
          onItemSelected={setSelectedItem}
          initPosition={5}
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
              onPress={() => onNextPress(selectedItem + 2)}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Q3;
