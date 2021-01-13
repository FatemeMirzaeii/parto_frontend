import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { WheelPicker } from 'react-native-wheel-picker-android';

//components and utils
import Stepper from '../../components/Stepper';
import { setPickerRange } from '../../util/func';
import { PERIOD_LENGTH } from '../../constants/cycle';

//styles and images
import Main from '../../../assets/images/main/interview.png';
import Teenager from '../../../assets/images/teenager/interview.png';
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
      txt: `پرتو فعلا طول پریودت رو در حالت معمول ${PERIOD_LENGTH} روزه در نظر میگیره.\nبعدا میتونی داخل نرم افزار این عدد رو تغییر بدی.`,
      nextPage: 'Q4',
      periodLength: PERIOD_LENGTH,
    });
  };
  return (
    <ImageBackground
      source={route.params.template === 'Main' ? Main : Teenager}
      style={styles.bg}>
      <SafeAreaView style={styles.safeAreaView}>
        <View>
          <Text style={styles.question}>پریودت تقریبا چند روز طول می‌کشه؟</Text>
          <Text style={styles.subtext}>معمولا 3 الی 10 روز</Text>
        </View>
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
        <View>
          <Button
            title="فراموش کردم"
            titleStyle={styles.darkBtnTitle}
            type="clear"
            onPress={() => onForgotPress()}
          />
          <Stepper index={2} />
          <View style={styles.buttons}>
            <Button
              title="بعدی"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={() => onNextPress(selectedItem + 2)}
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

export default Q3;
