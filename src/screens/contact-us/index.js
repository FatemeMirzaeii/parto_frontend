import React from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Container, Header, Body, Right, Left, Icon } from 'native-base';
import { COLOR, FONT, SIZE, WIDTH, HEIGHT } from '../../styles/static';
import Ptxt from '../../components/Ptxt';

const ContactUs = (props) => {
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
              style={{ color: 'white' }}
            />
          </TouchableOpacity>
        </Left>
      </Header>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <View style={{ flex: 1 }}>
        {/* <View style={{ flex: 1, backgroundColor: 'blue' }}> */}
        <ImageBackground
          style={{
            // backgroundColor: 'pink',
            width: WIDTH,
            height: HEIGHT / 4,
          }}
          source={require('../../../assets/images/letter.png')}
          resizeMode="contain"
        />
        {/* </View> */}
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor: 'green',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF4A8A',
              width: WIDTH * 0.12,
              height: WIDTH * 0.12,
              borderRadius: 1000,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,
            }}>
            <Icon
              name="sc-telegram"
              type="EvilIcons"
              style={{ color: 'white', fontSize: SIZE[35] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF4A8A',
              width: WIDTH * 0.12,
              height: WIDTH * 0.12,
              borderRadius: 1000,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,
            }}>
            <Icon
              name="whatsapp"
              type="Fontisto"
              style={{ color: 'white', fontSize: SIZE[30] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF4A8A',
              width: WIDTH * 0.12,
              height: WIDTH * 0.12,
              borderRadius: 1000,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 5,
            }}>
            <Icon
              name="linkedin"
              type="Entypo"
              style={{ color: 'white', fontSize: SIZE[30] }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF4A8A',
              width: WIDTH * 0.12,
              height: WIDTH * 0.12,
              borderRadius: 1000,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
              elevation: 5,
            }}>
            <Icon
              name="instagram"
              type="AntDesign"
              style={{ color: 'white', fontSize: SIZE[30] }}
            />
          </TouchableOpacity>
        </View>
        {/* </View> */}
        <View
          style={{
            // flex: 0.8,
            height: HEIGHT / 3,
            width: WIDTH / 1.15,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            elevation: 2,
            // backgroundColor: 'pink',
            marginTop: 50,
          }}>
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('ClientInformation')}
            style={{
              flexDirection: 'row',
              width: '90%',
              height: '25%',
              justifyContent: 'center',
              alignSelf: 'center',
              // backgroundColor: 'green',
            }}>
            <Left style={{}} />

            <Body
              style={{
                // backgroundColor: 'yellow',
                flex: 2,
                alignItems: 'flex-start',
              }}>
              <Ptxt
                style={{
                  // textAlign: 'left',
                  // fontSize: 18,
                  // opacity: 0.7,
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
                  // opacity: 0.5,
                  textAlign: 'left',
                  color: COLOR.nextPage,
                }}
              />
            </Right>
          </TouchableOpacity>
          <View
            style={{
              // position: 'absolute',
              borderBottomWidth: 0.5,
              paddingHorizontal: 160,
              // marginTop: 75,
              // marginBottom: 10,
              alignSelf: 'center',
              margin: 0,

              borderColor: '#707070',
            }}
          />
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('ClientInformation')}
            style={{
              flexDirection: 'row',
              width: '90%',
              height: '25%',
              justifyContent: 'center',
              alignSelf: 'center',
              // backgroundColor: 'green',
            }}>
            <Right style={{}} />
            <Body
              style={{
                // backgroundColor: 'yellow',
                flex: 2,
                alignItems: 'flex-start',
              }}>
              <Ptxt
                style={{
                  // opacity: 0.7,
                  textAlign: 'right',
                  fontSize: SIZE[14],
                  color: '#707070',
                  marginLeft: 10,
                }}>
                info@partobanoo.ir
              </Ptxt>
            </Body>
            <Left style={{ flex: 0.35 }}>
              <Icon
                name="envelope"
                type="SimpleLineIcons"
                style={{
                  // opacity: 0.5,
                  textAlign: 'right',
                  color: COLOR.nextPage,
                }}
              />
            </Left>
          </TouchableOpacity>
          <View
            style={{
              // position: 'absolute',
              borderBottomWidth: 0.5,
              paddingHorizontal: 160,
              // marginTop: 75,
              // marginBottom: 10,
              alignSelf: 'center',
              margin: 0,

              borderColor: '#707070',
            }}
          />
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('ClientInformation')}
            style={{
              flexDirection: 'row',
              width: '90%',
              height: '25%',
              justifyContent: 'center',
              alignSelf: 'center',
              // backgroundColor: 'green',
            }}>
            <Right style={{}} />
            <Body
              style={{
                // backgroundColor: 'yellow',
                flex: 2,
                alignItems: 'flex-start',
              }}>
              <Ptxt
                style={{
                  // opacity: 0.7,
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
                  // opacity: 0.5,
                  textAlign: 'right',
                  color: COLOR.nextPage,
                }}
              />
            </Left>
          </TouchableOpacity>
          <View
            style={{
              // position: 'absolute',
              borderBottomWidth: 0.5,
              paddingHorizontal: 160,
              // marginTop: 75,
              // marginBottom: 10,
              alignSelf: 'center',
              margin: 0,
              borderColor: '#707070',
            }}
          />
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('ClientInformation')}
            style={{
              flexDirection: 'row',
              width: '90%',
              height: '25%',
              justifyContent: 'center',
              alignSelf: 'center',
              // backgroundColor: 'green',
            }}>
            <Right style={{}} />
            <Body
              style={{
                // backgroundColor: 'yellow',
                flex: 2,
                alignItems: 'flex-start',
              }}>
              <Ptxt
                style={{
                  // opacity: 0.7,
                  textAlign: 'right',
                  fontSize: SIZE[14],
                  marginLeft: 80,
                  color: '#79EBEE',
                }}
                onPress={() => props.navigation.navigate('AboutUs')}>
                داستان پرتو
              </Ptxt>
            </Body>
            <Left style={{ flex: 0.35 }}>
              <Icon
                name="copy1"
                type="AntDesign"
                style={{ textAlign: 'right', color: '#79EBEE' }}
                onPress={() => props.navigation.navigate('AboutUs')}
              />
            </Left>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </Container>
  );
};

export default ContactUs;
