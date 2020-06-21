import { Button, Title } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WheelPicker } from "react-native-wheel-picker-android";
import { Theme } from '../../app/Theme';
let questionArray = [];
const { colors, size, fonts } = Theme;
let wheelPickerData = ['۳', '۴', '۵', '۶', '۷', '۸', '۹', '۱۰'];

const Start3 = (props) => {
  const [state, setState] = useState({
    selectedItem: 0
  })

  useEffect(() => {
    questionArray = props.navigation.state.params.questionArray
    console.log("day: ", questionArray)
  }, [props]);

  const onItemSelected = selectedItem => {
    console.log("selected: ", selectedItem + 3)
    setState({ selectedItem });
  };

  const nextPress = () => {
    let foundIndex = questionArray.findIndex(obj => obj.periodDays)

    if (foundIndex > 0)
      questionArray.splice(foundIndex, 1)

    questionArray.push({ periodDays: state.selectedItem + 3 })
    props.navigation.navigate("StartQuestion4", { questionArray })
  }
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#D164A6', '#C2428F', '#780048']}
      style={styles.gradiant}>
      <View style={styles.view}>
        <Text style={styles.txt}>اخیرا چند روزه پاک می شوید؟ </Text>
        <View style={styles.wrapperVertical}>
          <WheelPicker
            style={{ width: 200, height: 200 }}
            isCyclic={true}
            selectedItemTextFontFamily={fonts.regular}
            selectedItemTextSize={20}
            itemTextFontFamily={fonts.regular}
            selectedItem={state.selectedItem}
            data={wheelPickerData}
            onItemSelected={onItemSelected}
          />
        </View>
      </View>
      <Button
        rounded
        style={styles.btn}
        onPress={() => nextPress()}>
        <Title style={styles.txtbtn}>بعدی</Title>
      </Button>
    </LinearGradient>
  );
};

export default Start3;

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
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#C2428F',
  },
  txtbtn: {
    fontFamily: fonts.regular,
  },
});
