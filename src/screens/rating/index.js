import React, { useCallback, useEffect } from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Button,
  Dimensions,
} from 'react-native';
import { Container, Header, Body, Right, Left, Icon } from 'native-base';
import { getData } from '../../lib/func';
import { api } from '../../services/api';
import { HEIGHT, FONT, SIZE, COLOR } from '../../styles/static';
import Rate from '../../components/Rating';
// import { Rating as Rate, AirbnbRating } from 'react-native-elements';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { FlatList } from 'react-native-gesture-handler';

import {
  survayQuestion,
  CafeBazarLink,
  survayAnswer,
} from '../../services/urls';
const supportedURL = CafeBazarLink;
const restapi = new api();

const initialLayout = { width: Dimensions.get('window').width };
//supportedURL = 'https://cafebazaar.ir/app/ir.partoparto.parto';

const DATA = ['1', '2', '3', '4', '5', '6'];
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
const Rating = (props) => {
  useEffect(() => {
    _SurvayQuestion();
  }, []);

  const array = ['ضعیف', 'بد', 'متوسط', 'خوب', 'خیلی خوب'];
  const FirstRoute = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={DATA}
      renderItem={({ item }) => (
        <View
          style={{
            width: '45%',
            height: HEIGHT / 16,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: COLOR.btn,
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        />
      )}
      // keyExtractor={(item) => item.title.toString()}
    />
  );
  const SecondRoute = () => (
    <FlatList
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={DATA}
      renderItem={({ item }) => (
        <View
          style={{
            width: '45%',
            height: HEIGHT / 16,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: COLOR.btn,
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        />
      )}
      // keyExtractor={(item) => item.title.toString()}
    />
  );
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'نقاط ضعف' },
    { key: 'second', title: 'نقاط قوت' },
  ]);
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <TabBar
        {...props}
        activeColor={COLOR.textColorDark}
        inactiveColor={COLOR.reView}
        // pressColor={'red'}
        indicatorStyle={{
          height: '100%',
          backgroundColor: 'transparent',
          // borderTopStartRadius: 10,
          // borderTopEndRadius: 10,
          width: '45%',
          marginLeft: 12,
          marginRight: 5,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          color: COLOR.reView,
          borderBottomColor: COLOR.btn,
          borderBottomWidth: 2,
        }}
        style={{ elevation: 0, backgroundColor: 'transparent' }}
        renderLabel={({ route, focused, color }) => (
          <Text
            style={{
              color,
              margin: 0,
              fontFamily: FONT.regular,
            }}>
            {route.title}
          </Text>
        )}
      />
    );
  };

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
              color: COLOR.textColor,
              fontSize: SIZE[16],
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
              style={{ color: 'white' }}
            />
          </TouchableOpacity>
        </Left>
      </Header>
      {/* <View style={{ flex: 1 }}> */}
      <View style={{ flex: 1.2 }}>
        <View style={{ flex: 2.3 }}>
          <ImageBackground
            style={{ flex: 1 }}
            source={require('../../../assets/images/emtiyaz.png')}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
              marginTop: -20,
            }}>
            <Text
              style={{
                fontSize: SIZE[14],
                fontFamily: FONT.medium,
                color: COLOR.textColor,
                // marginVertical: 10,
              }}>
              چه امتیازی به پرتو میدی؟
            </Text>
          </View>
          <View
            style={{
              flex: 1.8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'yellow',
            }}>
            <Rate />
          </View>
          {/* <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                opacity: 0.65,
                fontFamily: FONT.regular,
              }}>
              بد
            </Text>
          </View> */}
        </View>
      </View>
      <View
        style={{
          // backgroundColor: 'green',
          // height: HEIGHT / 3,
          flex: 1.25,
          justifyContent: 'flex-start',
          borderTopColor: COLOR.reView,
          borderTopWidth: 0.5,
        }}>
        <TabView
          indicatorStyle={{ backgroundColor: 'red', height: 2 }}
          style={{
            // position: 'absolute',
            // height: '20%',
            width: '100%',
            alignSelf: 'center',
            backgroundColor: 'transparent',
            // marginTop: SIZE[90],
            flex: 5,
            // backgroundColor: 'pink',
          }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
      <OpenURLButton url={supportedURL}>ثبت امتیاز در بازار</OpenURLButton>
      <View
        style={{
          // height: HEIGHT / 10,
          flex: 0.35,
          flexDirection: 'row',
          // backgroundColor: 'yellow',
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
              borderWidth: 0.5,
              borderRadius: 30,
              borderColor: COLOR.textColor,
            }}>
            <Text
              style={{
                color: COLOR.textColor,
                fontSize: 14,
                fontFamily: FONT.regular,
              }}>
              ثبت دیدگاه
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
              backgroundColor: '#FF4A8A',
              borderRadius: 30,
              elevation: 5,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FONT.regular,
                color: 'white',
              }}>
              ثبت بازخورد
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </View> */}
    </Container>
  );
};

export default Rating;
