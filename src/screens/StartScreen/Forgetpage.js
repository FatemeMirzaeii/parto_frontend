import React, { Component, useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Button,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Footer,
  Body,
  Right,
  Left,
  Icon,
} from 'native-base';
import { storeData } from '../../app/Functions';
import { Theme, Height, Width } from '../../app/Theme';
const { fonts, size, colors } = Theme;
const Forgetpage = (props) => {
  // const goToHome = async () => {
  //   await storeData('@startPages', 'true');
  //   console.log('a');
  //   props.navigation.navigate('Home');
  // };
  return (
    <Container style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ marginTop: Width / 12, alignItems: 'flex-end' }}>
        <Image
          source={require('../../../assets/images/Group-5366.png')}
          style={{ marginRight: 80 }}
        />
        <Image
          source={require('../../../assets/images/Group-5365.png')}
          style={{ marginTop: 10, margin: 20 }}
        />
      </View>
      <Text
        style={{
          color: '#424242',
          fontFamily: fonts.regular,
          fontSize: 16,
          alignSelf: 'center',
        }}>
        دوست عزیز
      </Text>
      <Text
        style={{
          color: '#424242',
          fontFamily: fonts.regular,
          fontSize: 16,
          alignSelf: 'center',
          marginRight: 10,
          marginLeft: 10,
          textAlign: 'center',
          marginTop: 20,
        }}>
        در صورتی که تعداد روزهای پریود خود را به یاد ندارید، ما برای شما به صورت
        پیش فرض 7 روز را در نظر میگیریم.
      </Text>
      <Text
        style={{
          color: '#424242',
          fontFamily: fonts.regular,
          fontSize: 16,
          alignSelf: 'center',
          marginTop: 20,
        }}>
        ( شما قادر به ویرایش آن خواهید بود){' '}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'yellow',
          marginTop: 40,
          flex: 2.5,
        }}>
        <Image
          source={require('../../../assets/images/Group-4484.png')}
          style={{
            // backgroundColor: 'red',
            flex: 0.5,
            height: '100%',
            marginLeft: -20,
          }}
        />

        <Image source={require('../../../assets/images/Group-5364.png')} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          // onPress={() => goToHome()}
          style={{
            height: '40%',
            width: '50%',
            backgroundColor: colors.btn,
            borderRadius: 40,
            elevation: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.7}>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: 14,
              color: 'white',
            }}>
            بعدی
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};
export default Forgetpage;
