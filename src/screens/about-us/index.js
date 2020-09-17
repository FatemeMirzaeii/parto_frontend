import React from 'react';
import {
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Container, Header, Body, Right, Left, Icon } from 'native-base';
import { COLOR, FONT } from '../../styles/static';

const AboutUs = (props) => {
  return (
    <Container
      style={{
        flex: 1,
        backgroundColor: COLOR.white,
      }}>
      <ImageBackground
        source={require('../../../assets/images/about-us.png')}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Header
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
            marginTop: 24,
          }}>
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
                color: COLOR.textColor,
                fontSize: 16,
              }}>
              درباره پرتو
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
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: 16,
            color: COLOR.story,
            marginRight: 20,
          }}>
          داستان ما
        </Text>
        <Text
          style={{
            fontFamily: FONT.regular,
            fontSize: 14,
            color: COLOR.textColor,
            // marginRight: 20,
            margin: 20,
          }}>
          تولید نرم افزار پرتو به عنوان اولین نرم افزار هوش مصنوعی ایرانی مخصوص
          بانوان بر پایه تقویم قاعدگی توسط جمعی از جوانان نخبه و دغدغه مند در
          حوزه علوم رایانه و هوش مصنوعی همچنین پژوهشگران حوزه فرهنگ و سلامت
          بانوان در سال 1398 آغاز شد. آغازی پر از انگیزه و زیبا که به سوی دست
          یابی به سلامت و نشاط جسمانی و روحی همه بانوان ایرانی و مسلمانان جهان
          به پیش می رود.{'\n'}
          اولین نسخه نرم افزار پرتو به صورت رایگان پیش روی شماست
        </Text>
      </ImageBackground>
    </Container>
  );
};
export default AboutUs;
