import { Button, Title, Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { toPersianNum } from '../../lib/func';
import { Theme } from '../../styles/Theme';

let questionArray = [];
const toastText =
  'نگران نباشید. پرتو به شما کمک خواهد کرد که از راه دیگری هفته های بارداری تان را مشخص کنید.';

const { colors, size, fonts } = Theme;
let weeks = [];
const dataSet = () => {
  for (let i = 1; i <= 43; i++) weeks.push(toPersianNum(i));
};
dataSet();

const Startpragnent = ({ route, navigation }) => {
  const [state, setState] = useState({
    selectedItem: 0,
  });
  useEffect(() => {
    questionArray = route.params.questionArray;
    console.log('day: ', questionArray);
  }, [route.params.questionArray]);

  const onItemSelected = (selectedItem) => {
    setState({ selectedItem });
  };
  const nextPress = (item) => {
    questionArray.splice(1, 4);
    questionArray.push(
      { periodDate: '0' },
      { periodDays: 0 },
      { periodlength: 0 },
      { pregnancyWeek: item },
    );
    navigation.navigate('StartQuestion5', { questionArray });
  };

  function forgetPress() {
    ToastAndroid.show(toastText, ToastAndroid.LONG);
    setTimeout(async () => {
      navigation.navigate('StartQuestionPregnancyForget', {
        questionArray,
      });
    }, 1500);
  }
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#D164A6', '#C2428F', '#780048']}
      style={styles.gradiant}>
      <View style={styles.view}>
        <Text style={styles.txt}>چند هفته است که باردار هستید ؟</Text>
        <View style={styles.wrapperVertical}>
          <WheelPicker
            style={{ width: 200, height: 200 }}
            isCyclic={true}
            selectedItemTextFontFamily={fonts.regular}
            selectedItemTextSize={20}
            itemTextFontFamily={fonts.regular}
            selectedItem={state.selectedItem}
            data={weeks}
            onItemSelected={onItemSelected}
          />
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.6} onPress={() => forgetPress()}>
        <Text
          style={{
            marginTop: 5,
            alignSelf: 'center',
            fontFamily: fonts.regular,
            fontSize: size[15],
            color: colors.text1,
            borderBottomWidth: 0.2,
            paddingHorizontal: 10,
            borderBottomColor: 'white',
          }}>
          فراموش کردم
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Button rounded style={styles.btn} onPress={() => navigation.goBack()}>
          <Icon name="arrowright" type="AntDesign" />
          <Title style={[styles.txtbtn, { marginRight: 20 }]}>قبلی</Title>
        </Button>
        <Button
          rounded
          style={styles.btn}
          onPress={() => nextPress(state.selectedItem + 1)}>
          <Title style={[styles.txtbtn, { marginLeft: 20 }]}>بعدی</Title>
          <Icon name="arrowleft" type="AntDesign" />
        </Button>
      </View>
    </LinearGradient>
  );
};

export default Startpragnent;

const styles = StyleSheet.create({
  gradiant: {
    flex: 1,
    justifyContent: 'center',
  },
  view: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    height: '60%',
    paddingTop: 20,
    borderRadius: 5,
    paddingHorizontal: 20,
  },

  wrapperVertical: {
    marginTop: 60,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    color: 'black',
  },
  OptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontFamily: fonts.regular,
    fontSize: size[15],
  },
  txt2: {
    marginTop: -10,
    color: 'gray',
    marginLeft: 30,
    marginVertical: 5,
    fontFamily: fonts.regular,
    fontSize: size[14],
  },
  btn: {
    marginHorizontal: 20,
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#C2428F',
  },
  txtbtn: {
    alignSelf: 'center',
    fontFamily: fonts.regular,
  },
});
