import {
  Content,
  Container,
  View,
  Left,
  Right,
  Radio,
  Body,
  Button,
  Title,
} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, Dimensions, Text, ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Theme, Width} from '../../app/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {colors, size, fonts} = Theme;

const Start1 = (props) => {
  const [selected, setSelected] = useState({
    selected1: false,
    selected2: false,
    selected3: false,
  });
  const Login = () => {
    if (
      selected.selected1 == false &&
      selected.selected2 == false &&
      selected.selected3 == false
    )
      ToastAndroid.show(
        'لطفا یکی از گزینه ها را انتخاب نمایید',
        ToastAndroid.SHORT,
      );
    else props.navigation.navigate('StartQuestion2');
  };
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#D164A6', '#C2428F', '#780048']}
      style={styles.gradiant}>
      <View style={styles.view}>
        <Text style={styles.txt}>خوش اومدی عزیزم،</Text>
        <Text style={styles.txt}>ما چطور میتونیم به شما کمک کنیم؟</Text>
        <TouchableOpacity onPress={() => setSelected({selected1: true})}>
          <View style={styles.view2}>
            <Radio
              selected={selected.selected1}
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
        <TouchableOpacity onPress={() => setSelected({selected2: true})}>
          <View style={styles.view2}>
            <Radio
              selected={selected.selected2}
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
        <TouchableOpacity onPress={() => setSelected({selected3: true})}>
          <View style={styles.view2}>
            <Radio
              selected={selected.selected3}
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
      <Button rounded style={styles.btn} onPress={() => Login()}>
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
