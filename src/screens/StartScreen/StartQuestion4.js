import { Button, Title } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmoothPicker from 'react-native-smooth-picker';
import { toPersianNum } from '../../app/Functions';
import { Theme } from '../../app/Theme';

const { colors, size, fonts } = Theme;
let day = [];

const opacities = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};
const sizeText = {
  0: 20,
  1: 15,
  2: 10,
};

const Item = React.memo(({ opacity, selected, vertical, fontSize, name }) => {
  return (
    <View
      style={[
        styles.OptionWrapper,
        { opacity, borderColor: selected ? 'gray' : 'transparent', width: 100 },
      ]}>
      <Text style={{ fontSize, fontFamily: fonts.regular }}>{name}</Text>
    </View>
  );
});

const ItemToRender = ({ item, index }, indexSelected, vertical) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = opacities[gap];
  if (gap > 3) {
    opacity = opacities[2];
  }
  let fontSize = sizeText[gap];
  if (gap > 1) {
    fontSize = sizeText[2];
  }

  return (
    <Item
      opacity={opacity}
      selected={selected}
      vertical={vertical}
      fontSize={fontSize}
      name={item}
    />
  );
};

const Start4 = (props) => {
  useEffect(() => {
    for (let i = 20; i <= 100; i++) day.push(toPersianNum(i));
  });
  const handleChangeday = (index) => {
    setSelectedday(index);
  };

  const [selectedday, setSelectedday] = useState(4);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#D164A6', '#C2428F', '#780048']}
      style={styles.gradiant}>
      <View style={styles.view}>
        <Text style={styles.txt}>
          بطور میانگین فاصله دوره هایتان چند روزه است؟
        </Text>
        <View style={styles.wrapperVertical}>
          <SmoothPicker
            initialScrollToIndex={selectedday}
            onScrollToIndexFailed={() => { }}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={day}
            scrollAnimation
            onSelected={({ item, index }) => handleChangeday(index)}
            renderItem={(option) => ItemToRender(option, selectedday, true)}
            magnet
          />
        </View>
        {/* <View>
                <Text>{`Your selection is ${dataCity[selected]}`}</Text>
            </View> */}
      </View>
      <Button
        rounded
        style={styles.btn}
        onPress={() => props.navigation.navigate('StartQuestion5')}>
        <Title style={styles.txtbtn}>بعدی</Title>
      </Button>
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
