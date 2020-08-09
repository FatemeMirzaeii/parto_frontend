import React, { Component, useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Button,
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
import { getData } from '../../app/Functions';
import { RESTAPI } from '../../services/RESTAPI';
import { Theme, Height, Width } from '../../app/Theme';
const { fonts, size, colors } = Theme;
import {
  survayQuestion,
  CafeBazarLink,
  survayAnswer,
} from '../../services/ApiNames';
const supportedURL = CafeBazarLink;
const restapi = new RESTAPI();

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`لینک ناشناخته: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const _SurvayAnswer = async () => {
  let _email = await getData('@email');

  console.log(_email);
  let body = {
    email: _email,
  };
  return await restapi.request(survayAnswer, body, 'PUT');
};
const _SurvayQuestion = async () => {
  let _email = await getData('@email');

  console.log(_email);
  let body = {
    email: _email,
  };
  return await restapi.request(survayQuestion, body, 'POST');
};
const Scoring = (props) => {
  useEffect(() => {
    _SurvayQuestion();
  }, []);
  return (
    <Container style={{ flex: 1 }}>
      <Header
        style={{ backgroundColor: 'transparent', elevation: 0, marginTop: 24 }}>
        <Right
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1,
          }}></Right>
        <Body
          style={{
            flex: 4,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fonts.medium,
            }}>
            امتیازدهی به پرتو
          </Text>
        </Body>

        <Left style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              padding: 4,
              backgroundColor: '#FF4A8A',
              borderRadius: 30,
            }}>
            <Icon
              name="arrow-forward"
              type="MaterialIcons"
              style={{ color: 'white' }}></Icon>
          </TouchableOpacity>
        </Left>
      </Header>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.2 }}>
          <View style={{ flex: 2.3 }}>
            <ImageBackground
              style={{ flex: 1 }}
              source={{
                uri:
                  'https://www.komar.de/en/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/s/h/sh041-vd4_into_the_jungle_web.jpg',
              }}></ImageBackground>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: size[17],
                  fontFamily: fonts.regular,
                  marginVertical: 10,
                }}>
                چه امتیازی به پرتو میدی؟
              </Text>
            </View>
            <View
              style={{
                flex: 1.5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF4A8A',
                  width: Width * 0.09,
                  height: Width * 0.09,
                  borderRadius: 1000,
                  marginHorizontal: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="heart"
                  type="AntDesign"
                  style={{ color: 'white', fontSize: 18 }}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF4A8A',
                  width: Width * 0.09,
                  height: Width * 0.09,
                  borderRadius: 1000,
                  marginHorizontal: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="heart"
                  type="AntDesign"
                  style={{ color: 'white', fontSize: 18 }}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF4A8A',
                  width: Width * 0.09,
                  height: Width * 0.09,
                  borderRadius: 1000,
                  marginHorizontal: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="heart"
                  type="AntDesign"
                  style={{ color: 'white', fontSize: 18 }}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF4A8A',
                  width: Width * 0.09,
                  height: Width * 0.09,
                  borderRadius: 1000,
                  marginHorizontal: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="heart"
                  type="AntDesign"
                  style={{ color: 'white', fontSize: 18 }}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FF4A8A',
                  width: Width * 0.09,
                  height: Width * 0.09,
                  borderRadius: 1000,
                  marginHorizontal: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="heart"
                  type="AntDesign"
                  style={{ color: 'white', fontSize: 18 }}></Icon>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  opacity: 0.65,
                  fontFamily: fonts.regular,
                }}>
                بد
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1.2, borderTopWidth: 0.7 }}>
          <View
            style={{ flex: 5, backgroundColor: 'pink', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
              <Text style={{ fontFamily: fonts.regular }}>نقاط قوت</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
              <Text style={{ fontFamily: fonts.regular }}>نقاط ضعف</Text>
            </View>
          </View>
          <OpenURLButton url={supportedURL}>ثبت امتیاز در بازار</OpenURLButton>

          <View
            style={{
              flex: 1.8,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  marginRight: -30,
                  width: '80%',
                  height: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FF4A8A',
                  borderRadius: 30,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 17,
                    fontFamily: fonts.regular,
                  }}>
                  ثبت بازخورد
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  marginLeft: -30,
                  width: '80%',
                  height: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 30,
                }}>
                <Text style={{ fontSize: 17, fontFamily: fonts.regular }}>
                  ثبت دیدگاه
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Scoring;
