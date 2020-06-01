import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import {Theme, Width, Height} from '../../app/Theme';
import {View, Container} from 'native-base';

const {colors, size, fonts} = Theme;
const Home = (props) => {
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Hours
  console.log('month: ', month);
  console.log('y: ', year);
  if (year == 2020 && month < 6) {
    return (
      <Container>
        <StatusBar hidden />
        <ImageSlider
          loopBothSides
          images={[
            require('../../../assets/images/1.jpg'),
            require('../../../assets/images/2.jpg'),
            require('../../../assets/images/3.jpg'),
            require('../../../assets/images/4.jpg'),
            require('../../../assets/images/5.jpg'),
            require('../../../assets/images/6.jpg'),
            require('../../../assets/images/7.jpg'),
          ]}
        />
      </Container>
    );
  } else {
    return (
      <View
        style={{backgroundColor: 'pink', flex: 1, justifyContent: 'center'}}>
        <Image
          style={{
            alignSelf: 'center',
            borderRadius: 200,
            width: 200,
            height: 200,
            marginBottom: 50,
          }}
          source={require('../../../assets/images/parto.jpeg')}
        />
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: fonts.regular,
            fontSize: size[24],
          }}>
          {' '}
          پرتو دستیار هوشمند سلامت بانوان{' '}
        </Text>
      </View>
    );
  }
};
export default Home;
const styles = StyleSheet.create({
  calendar: {
    // position: 'absolute',
    width: '100%',
    top: -Width / 1.5,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
});
