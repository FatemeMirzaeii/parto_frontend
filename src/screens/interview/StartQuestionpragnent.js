import React, { useEffect, useState } from 'react';
import { SafeAreaView, ImageBackground, View } from 'react-native';
import { Button } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { setPickerRange } from '../../lib/func';
import { FONT } from '../../styles/static';
import Ptxt from '../../components/Ptxt';
import styles from './styles';

const Startpragnent = ({ route, navigation }) => {
  const [selectedItem, setSelectedItem] = useState();
  useEffect(() => {
    console.log('params', route.params);
  }, [route.params]);
  const onNextPress = (item) => {
    navigation.navigate('StartQuestion5', {
      ...route.params,
      periodDays: 0,
      pregnancyWeek: item,
    });
  };

  function onForgotPress() {
    navigation.navigate('Notice', {
      ...route.params,
      txt:
        'نگران نباشید. پرتو به شما کمک خواهد کرد که از راه دیگری هفته های بارداری تان را مشخص کنید.',
      nextPage: 'StartQuestionPregnancyForget',
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/start/1.png')}
        style={styles.bg}>
        <Ptxt style={styles.question}>چند هفته است که باردار هستید ؟</Ptxt>
        <WheelPicker
          data={setPickerRange(1, 43)}
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
              onPress={() => onNextPress(selectedItem + 1)}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Startpragnent;
