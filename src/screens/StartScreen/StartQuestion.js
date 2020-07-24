import { Button, Radio, Title, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Theme } from '../../app/Theme';
import Database from '../../components/Database';

let questionArray = [{ pregnant: 1, pregnancy_try: 0, period: 0 }];
const db = new Database();
const { colors, size, fonts } = Theme;

const Start1 = (props) => {
  const [selected, setSelected] = useState({
    period: false,
    pregnancy_try: false,
    pregnant: false,
  });
  const nextPage = async () => {
    if (
      selected.period == false &&
      selected.pregnancy_try == false &&
      selected.pregnant == false
    )
      ToastAndroid.show(
        'لطفا یکی از گزینه ها را انتخاب نمایید',
        ToastAndroid.SHORT,
      );
    else {
      questionArray = [];
      if (selected.pregnant == true)
        questionArray.push({ pregnant: 1, pregnancy_try: 0, period: 0 });
      if (selected.pregnancy_try == true)
        questionArray.push({ pregnant: 0, pregnancy_try: 1, period: 0 });
      if (selected.period == true)
        questionArray.push({ pregnant: 0, pregnancy_try: 0, period: 1 });

      if (selected.pregnancy_try == true || selected.period == true)
        props.navigation.navigate('StartQuestion2', { questionArray });
      else
        props.navigation.navigate('StartQuestionpragnent', { questionArray });
    }
  };
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#D164A6', '#C2428F', '#780048']}
      style={styles.gradiant}>
      <View style={styles.view}>
        <Text style={styles.txt}>خوش اومدی عزیزم،</Text>
        <Text style={styles.txt}>ما چطور میتونیم به شما کمک کنیم؟</Text>
        <TouchableOpacity onPress={() => setSelected({ period: true })}>
          <View style={styles.view2}>
            <Radio
              selected={selected.period}
              color="#F700FF"
              selectedColor="#F93DFF"
              style={{
                marginRight: 10,
              }}
            />
            <Text style={styles.txt}>ثبت دوره های ماهانه</Text>
          </View>
          <Text style={styles.txt2}>برنامه ای برای بارداری ندارم</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelected({ pregnancy_try: true })}>
          <View style={styles.view2}>
            <Radio
              selected={selected.pregnancy_try}
              color="#F700FF"
              selectedColor="#F93DFF"
              style={{
                marginRight: 10,
              }}
            />
            <Text style={styles.txt}>تلاش برای بارداری</Text>
          </View>
          <Text style={styles.txt2}>
            بعضی روزها برایم مهم و تایین کننده هستند
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelected({ pregnant: true })}>
          <View style={styles.view2}>
            <Radio
              selected={selected.pregnant}
              color="#F700FF"
              selectedColor="#F93DFF"
              style={{
                marginRight: 10,
              }}
            />
            <Text style={styles.txt}>من باردارم</Text>
          </View>
          <Text style={styles.txt2}>میخواهم شرایطم را ثبت کنم</Text>
        </TouchableOpacity>
      </View>
      <Button rounded style={styles.btn} onPress={() => nextPage()}>
        <Title style={styles.txtbtn}>ورود</Title>
      </Button>
    </LinearGradient>
  );
};
export default Start1;
const styles = StyleSheet.create({
  gradiant: {
    flex: 1,
    justifyContent: 'center',
  },
  view: {
    justifyContent: 'center',
    height: '60%',
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    marginVertical: 10,
    fontFamily: fonts.regular,
    fontSize: size[15],
  },
  txt2: {
    marginTop: -10,
    color: 'gray',
    marginLeft: 30,
    marginVertical: 10,
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
