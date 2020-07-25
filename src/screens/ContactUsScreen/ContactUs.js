import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
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
const { fonts, size, colors } = Theme

const ContactUs = (props) => {
  return (
    <Container style={{ flex: 1 }}>
      <Header style={{ backgroundColor: 'transparent', elevation: 0, marginTop: 24 }}>
        <Right style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, }}>

        </Right>
        <Body style={{
          flex: 4,
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: fonts.medium
          }}>ارتباط با پرتو</Text>
        </Body>


        <Left style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}
            style={{ padding: 4, backgroundColor: '#FF4A8A', borderRadius: 30 }}>
            <Icon name="arrow-forward" type="MaterialIcons" style={{ color: 'white' }}></Icon>
          </TouchableOpacity>
        </Left>
      </Header>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1.5 }}>
            <ImageBackground
              style={{ flex: 1 }}
              source={{
                uri:
                  'https://www.komar.de/en/media/catalog/product/cache/5/image/9df78eab33525d08d6e5fb8d27136e95/s/h/sh041-vd4_into_the_jungle_web.jpg',
              }}></ImageBackground>
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FF4A8A',
                width: Width * 0.12,
                height: Width * 0.12,
                borderRadius: 1000,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="instagram"
                type="AntDesign"
                style={{ color: 'white' }}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#FF4A8A',
                width: Width * 0.12,
                height: Width * 0.12,
                borderRadius: 1000,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="info"
                type="AntDesign"
                style={{ color: 'white' }}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#FF4A8A',
                width: Width * 0.12,
                height: Width * 0.12,
                borderRadius: 1000,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="whatsapp"
                type="Fontisto"
                style={{ color: 'white' }}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#FF4A8A',
                width: Width * 0.12,
                height: Width * 0.12,
                borderRadius: 1000,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="sc-telegram"
                type="EvilIcons"
                style={{ color: 'white', fontSize: 35 }}></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              width: '90%',
              height: '90%',
              elevation: 3,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderBottomWidth: 0.7,
                width: '85%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="phone"
                  type="FontAwesome"
                  style={{ opacity: 0.5 }}></Icon>
              </View>
              <View
                style={{
                  flex: 5,
                  justifyContent: 'center',
                  //alignItems: 'center',
                }}>
                <Text style={{ textAlign: 'left', fontSize: 18, opacity: 0.7 }}>
                  09981070258
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderBottomWidth: 0.7,
                width: '85%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="envelope"
                  type="SimpleLineIcons"
                  style={{ opacity: 0.5 }}></Icon>
              </View>
              <View
                style={{
                  flex: 5,
                  justifyContent: 'center',
                  //alignItems: 'center',
                }}>
                <Text style={{ textAlign: 'left', fontSize: 18, opacity: 0.7 }}>
                  info@partobanoo.ir
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderBottomWidth: 0.7,
                width: '85%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <Icon
                  name="message-square"
                  type="Feather"
                  style={{ opacity: 0.5 }}></Icon>
              </View>
              <View
                style={{
                  flex: 5,
                  justifyContent: 'center',
                  //alignItems: 'center',
                }}>
                <Text style={{ textAlign: 'left', fontSize: 18, opacity: 0.7 }}>
                  ارسال سریع بازخورد
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                width: '85%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="copy1"
                  type="AntDesign"
                  style={{ opacity: 0.5 }}></Icon>
              </View>
              <View
                style={{
                  flex: 5,
                  justifyContent: 'center',
                  //alignItems: 'center',
                }}>
                <Text style={{ textAlign: 'left', fontSize: 18, opacity: 0.7 }}>
                  داستان پرتو
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ContactUs;
