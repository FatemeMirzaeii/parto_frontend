import React from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import { Container, Header, Body, Right, Left, Icon } from 'native-base';
import { Icon as IconElemnt } from 'react-native-elements';
import { COLOR, FONT, SIZE, WIDTH, HEIGHT } from '../../styles/static';
import Ptxt from '../../components/Ptxt';

const ContactUs = ({ navigation }) => {
  return (
    <Container style={{ flex: 1 }}>
      <Header
        style={{ backgroundColor: 'transparent', elevation: 0, marginTop: 24 }}>
        <Right
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1,
          }}
        />
        <Body
          style={{
            flex: 4,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: FONT.medium,
              color: '#757575',
            }}>
            ارتباط با پرتو
          </Text>
        </Body>

        <Left style={{ flex: 1, alignItems: 'flex-end' }}>
          <IconElemnt
            reverse
            size={15}
            name="arrow-right"
            type="font-awesome"
            color={COLOR.btn}
            onPress={() => navigation.pop()}
          />
        </Left>
      </Header>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            width: WIDTH,
            height: HEIGHT / 4,
          }}
          source={require('../../../assets/images/letter.png')}
          resizeMode="contain"
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <IconElemnt
            reverse
            size={25}
            name="telegram"
            type="font-awesome"
            color={COLOR.btn}
            onPress={() => Linking.openURL('https://t.me/Partobanoo ')}
          />
          <IconElemnt
            reverse
            size={25}
            name="whatsapp"
            type="fontisto"
            color={COLOR.btn}
            onPress={() => Linking.openURL('http://google.com')}
          />
          <IconElemnt
            reverse
            size={25}
            name="linkedin"
            type="entypo"
            color={COLOR.btn}
            onPress={() =>
              Linking.openURL('https://www.linkedin.com/company/partoapp')
            }
          />
          <IconElemnt
            reverse
            size={25}
            name="instagram"
            type="antdesign"
            color={COLOR.btn}
            onPress={() => Linking.openURL('https://instagram.com/parto.app')}
          />
        </View>
        <View
          style={{
            height: HEIGHT / 3,
            width: WIDTH / 1.15,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            elevation: 2,
            marginTop: 50,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '90%',
              height: '25%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Left style={{}} />

            <Body
              style={{
                flex: 2,
                alignItems: 'flex-start',
              }}>
              <Ptxt
                style={{
                  textAlign: 'right',
                  fontSize: SIZE[14],
                  color: '#707070',
                  marginLeft: 60,
                }}>
                09981070258
              </Ptxt>
            </Body>
            <Right style={{ flex: 0.35 }}>
              <Icon
                name="phone"
                type="FontAwesome"
                style={{
                  textAlign: 'left',
                  color: COLOR.nextPage,
                }}
              />
            </Right>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 0.5,
              paddingHorizontal: 160,
              alignSelf: 'center',
              margin: 0,

              borderColor: '#707070',
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '90%',
              height: '25%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Right style={{}} />
            <Body
              style={{
                flex: 2,
                alignItems: 'flex-start',
              }}>
              <Ptxt
                style={{
                  textAlign: 'right',
                  fontSize: SIZE[14],
                  color: '#707070',
                  marginLeft: 10,
                }}>
                info@partobanoo.com
              </Ptxt>
            </Body>
            <Left style={{ flex: 0.35 }}>
              <Icon
                name="envelope"
                type="SimpleLineIcons"
                style={{
                  textAlign: 'right',
                  color: COLOR.nextPage,
                }}
              />
            </Left>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 0.5,
              paddingHorizontal: 160,
              alignSelf: 'center',
              margin: 0,

              borderColor: '#707070',
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '90%',
              height: '25%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Right style={{}} />
            <Body
              style={{
                flex: 2,
                alignItems: 'flex-start',
              }}>
              <Ptxt
                style={{
                  textAlign: 'right',
                  fontSize: SIZE[14],
                  color: '#707070',
                  marginLeft: 30,
                }}>
                ارسال سریع بازخورد
              </Ptxt>
            </Body>
            <Left style={{ flex: 0.35 }}>
              <Icon
                name="message-square"
                type="Feather"
                style={{
                  textAlign: 'right',
                  color: COLOR.nextPage,
                }}
              />
            </Left>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default ContactUs;
