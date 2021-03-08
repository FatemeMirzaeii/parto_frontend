import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';

//components and utils
import Stepper from '../../components/Stepper';
import { setPickerRange } from '../../util/func';
import { CYCLE_LENGTH } from '../../constants/cycle';

//styles and images
import Main from '../../../assets/images/main/interview.png';
import Teenager from '../../../assets/images/teenager/interview.png';
import { COLOR, FONT } from '../../styles/static';
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
    <ImageBackground
      source={route.params.template === 'Main' ? Main : Teenager}
      style={styles.bg}>
      <SafeAreaView
        style={{ ...styles.safeAreaView, justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.question}>
            طول یک دوره ماهانه‌ات تقریبا چند روزه است؟
          </Text>
          <Text style={styles.subtext}>
            فاصله بین اولین روز هر پریود تا اولین روز پریود بعدی
            {'\n'}
            معمولا بین 28 الی 30 روز
          </Text>
        </View>
        <WheelPicker
          data={setPickerRange(15, 100)}
          selectedItem={selectedItem}
          onItemSelected={setSelectedItem}
          initPosition={13}
          isCyclic={true}
          itemTextSize={21}
          selectedItemTextSize={21}
          itemTextFontFamily={FONT.regular}
          selectedItemTextFontFamily={FONT.regular}
          style={styles.picker}
          indicatorColor={COLOR.pink}
        />
        <View>
          <Button
            title="فراموش کردم"
            titleStyle={styles.darkBtnTitle}
            type="clear"
            onPress={() => onForgotPress()}
          />
          <Stepper foursome index={3} />
          <View style={styles.buttons}>
            <Button
              title="بعدی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={() => {
                onNextPress(selectedItem + 15);
              }}
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

export default Q4;
