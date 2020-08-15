import React from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Body, Right, Left, Icon } from 'native-base';
import { Theme, Height } from '../../app/Theme';
const { fonts, colors } = Theme;

const AboutUs = (props) => {
  return (
    <Container style={{ flex: 1, backgroundColor: 'white' }}>
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
              fontFamily: fonts.medium,
              color: colors.textColor,
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
      <View style={{}}>
        <Image
          source={require('../../../assets/images/Group5369.png')}
          style={{ marginLeft: 20 }}
        />
      </View>
      <Text
        style={{
          fontFamily: fonts.medium,
          fontSize: 16,
          color: colors.story,
          marginRight: 20,
        }}>
        داستان ما
      </Text>
      <Text
        style={{
          fontFamily: fonts.regular,
          fontSize: 14,
          color: colors.textColor,
          // marginRight: 20,
          margin: 20,
        }}>
        تولید نرم افزار پرتو به عنوان اولین نرم افزار هوش مصنوعی ایرانی مخصوص
        بانوان بر پایه تقویم قاعدگی توسط جمعی از جوانان نخبه و دغدغه مند در حوزه
        علوم رایانه و هوش مصنوعی همچنین پژوهشگران حوزه فرهنگ و سلامت بانوان در
        سال 1398 آغاز شد. آغازی پر از انگیزه و زیبا که به سوی دست یابی به سلامت
        و نشاط جسمانی و روحی همه بانوان ایرانی و مسلمانان جهان به پیش می رود.
      </Text>
      <Text
        style={{
          fontFamily: fonts.regular,
          fontSize: 14,
          color: colors.textColor,
          // marginRight: 20,
          margin: 20,
          marginTop: -10,
        }}>
        اولین نسخه نرم افزار پرتو به صورت رایگان پیش روی شماست
      </Text>
      <View style={{ marginTop: Height / 6, alignItems: 'flex-end' }}>
        <Image
          source={require('../../../assets/images/Group5369.png')}
          style={{ marginRight: 20 }}
        />
      </View>
    </Container>
  );
};
export default AboutUs;
