import { Button, Title, Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WheelPicker } from "react-native-wheel-picker-android";
import { Theme } from '../../app/Theme';
import { toPersianNum } from '../../app/Functions';
let questionArray = [];
const { colors, size, fonts } = Theme;
let data = []
const toastText = 'پرتو فاصله میان دوره های شما را 28 روزه قرار می دهد تا در دوره های بعدی خودتان آن را ثبت کنید تا بتوانیم به پیش بینی دقیق تری از دوره های شما برسیم'

const dataSet = () => {
  for (let i = 15; i < 100; i++)
    data.push(toPersianNum(i));
}
dataSet()
const Start4 = (props) => {
  const [state, setState] = useState({
    items: [1],
    selectedItem: 0,
  })

  useEffect(() => {
    questionArray = props.navigation.state.params.questionArray
    console.log("day: ", questionArray)
  }, [props]);

  const onItemSelected = selectedItem => {
    console.log("selected: ", selectedItem + 15)
    setState({ selectedItem });
  };

  const nextPress = (item) => {
    let foundIndex = questionArray.findIndex(obj => obj.periodlength)

    if (foundIndex > 0)
      questionArray.splice(foundIndex, 2)
    questionArray.push(
      { periodlength: item },
      { pregnancyWeek: 0 })
    props.navigation.navigate("StartQuestion5", { questionArray })
  }
  function forgetPress() {
    ToastAndroid.show(
      toastText,
      ToastAndroid.LONG,
    );
    setTimeout(async () => { nextPress(28) }, 2000)
  }
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#D164A6', '#C2428F', '#780048']}
      style={styles.gradiant}>
      <View style={styles.view}>
        <Text style={styles.txt}>بطور میانگین فاصله دوره هایتان چند روزه است؟ </Text>
        <View style={styles.wrapperVertical}>
          {/* <Text>Selected position: {state.selectedItem}</Text> */}
          <WheelPicker
            style={{ width: 200, height: 200 }}
            isCyclic={true}
            selectedItemTextFontFamily={fonts.regular}
            selectedItemTextSize={20}
            itemTextFontFamily={fonts.regular}
            selectedItem={state.selectedItem}
            data={data}
            onItemSelected={onItemSelected}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => forgetPress()}>
        <Text style={{
          marginTop: 5,
          alignSelf: 'center',
          fontFamily: fonts.regular,
          fontSize: size[15],
          color: colors.text1,
          borderBottomWidth: 0.2,
          paddingHorizontal: 10,
          borderBottomColor: 'white',
          color: 'white'
        }}>فراموش کردم</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Button
          rounded
          style={styles.btn}
          onPress={() => props.navigation.goBack()}>
          <Icon name="arrowright" type="AntDesign" />
          <Title style={[styles.txtbtn, { marginRight: 20 }]}>قبلی</Title>
        </Button>
        <Button
          rounded
          style={styles.btn}
          onPress={() => nextPress(state.selectedItem + 15)}>
          <Title style={[styles.txtbtn, { marginLeft: 20 }]}>بعدی</Title>
          <Icon name="arrowleft" type="AntDesign" />

        </Button>

      </View>
    </LinearGradient>
  );
};

export default Start4;

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
    // justifyContent: 'center',
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
