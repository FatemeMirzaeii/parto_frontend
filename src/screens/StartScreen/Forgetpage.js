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
import { Theme, Height, Width } from '../../app/Theme';
const { fonts, size, colors } = Theme;
const Forgetpage = (props) => {
  return (
    <Container style={{ flex: 1, backgroundColor: 'white' }}>
      <Image source={require('../../../assets/images/Group-5366.png')} />
      <Image source={require('../../../assets/images/Group-5365.png')} />
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
        }}>
        ( شما قادر به ویرایش آن خواهید بود){' '}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('../../../assets/images/Group-4484.png')} />

        <Image source={require('../../../assets/images/Group-5364.png')} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => nextPress()}
          style={{
            height: '40%',
            width: '80%',
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
