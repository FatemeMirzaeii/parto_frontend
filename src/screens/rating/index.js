import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StatusBar,
  Text,
  TextInput,
  Animated,
} from 'react-native';
import axios from 'axios';
import { Icon, Button } from 'react-native-elements';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { Rating } from 'react-native-ratings';
import Modal from 'react-native-modal';
//import { getUniqueId, getManufacturer } from 'react-native-device-info';
import DeviceInfo from 'react-native-device-info';
import { COLOR, FONT, HEIGHT } from '../../styles/static';
import styles from './styles';
import HeartShape from '../../../assets/images/heartShape.png';
import neg from './neg';
import pos from './pos';
import md5 from 'md5';

const { event, ValueXY } = Animated;
const scrollY = new ValueXY();
const Tab = createMaterialTopTabNavigator();
const Ratings = ({ navigation }) => {
  const [heartCount, setHeartCount] = useState(2.5);
  const [idea, setIdea] = useState('');
  const [questionItems, setQuestionItems] = useState([]);
  const [positiveItems, setPositiveItems] = useState([]);
  const [negativeItems, setNegativeItems] = useState([]);
  const [ideaVisible, setIdeaVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(false);
  const macAdd = DeviceInfo.getMacAddress();
  const UniqueId = DeviceInfo.getUniqueId();
  let deviceId = DeviceInfo.getDeviceId();
  const UUID = md5(UniqueId.concat(deviceId));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'امتیازدهی به پرتو',
      headerLeft: () => null,
      headerRight: () => (
        <Icon
          reverse
          size={15}
          name="arrow-right"
          type="font-awesome"
          color={COLOR.btn}
          onPress={() => navigation.pop()}
        />
      ),
    });
  }, [navigation]);

  //   useEffect(() => {
  //     // Anything in here is fired on component mount.
  //     setTimeout(() => {
  //       let appTourSequence = new AppTourSequence()
  //       this.appTourTargets.forEach(appTourTarget => {
  //         appTourSequence.add(appTourTarget)
  //       })

  //       AppTour.ShowSequence(appTourSequence)
  //     }, 1000)
  //     registerSequenceStepEvent()
  //     return () => {
  //         // Anything in here is fired on component unmount.
  //         registerSequenceStepEvent()

  //     }
  // }, [])

  // useEffect(() => {
  //   const getAnswer = () => {
  //     axios({
  //       //method: 'post',
  //       method: 'get',
  //       // url: `https://api.parto.app/survay/surveyQuestion/fa`,
  //       url: `https://api.parto.app/survey/question/fa`,

  //       // data: {
  //       //   IMEi: '123456789123456',
  //       // },
  //       // headers: {
  //       //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  //       // },
  //     })
  //       .then((res) => {
  //         console.log('res', res);
  //         console.log('res', res.data.answers);
  //         setQuestionItems(res.data.answers);
  //       })
  //       .catch((err) => {
  //         console.error(err, err.response);
  //       });
  //   };

  //   getAnswer();
  // }, []);
  useEffect(() => {
    const getAnswer = () => {
      axios({
        //method: 'post',
        method: 'get',
        // url: `https://api.parto.app/survay/surveyQuestion/fa`,
        url: `https://api.parto.app/survey/question/fa`,

        // data: {
        //   IMEi: '123456789123456',
        // },
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        // },
      })
        .then((res) => {
          console.log('resneg', res);
          console.log('res', res.data.negativeQuestion);
          setQuestionItems(res.data);
          setNegativeItems(res.data.negativeQuestion);
          setPositiveItems(res.data.posetivQuestion);
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };

    getAnswer();
  }, []);

  const _ratingCompleted = (rating) => {
    setHeartCount(+rating);
    setTabVisible(true);
  };

  const _handleIdea = () => {
    setIdea();
    setIdeaVisible(false);
  };

  const _handleSubmit = () => {
    axios({
      method: 'put',
      url: `https://api.parto.app/survay/userSurveyAnswer/fa`,
      data: {
        userId: 0,
        IMEi: '123456789123456',
        rate: heartCount,
        answers: '',
        description: idea,
      },
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      // },
    })
      .then((res) => {
        console.log('res', res);
        // console.log('res', res.data.answers);
        // setServayItems(res.data.answers);
      })
      .catch((err) => {
        console.error(err, err.response);
      });
  };

  const _renderHeader = () => {
    return <></>;
  };

  const _renderForeground = () => (
    <>
      <Image
        style={styles.img}
        source={require('../../../assets/images/rate.png')}
        resizeMode="contain"></Image>
      <Text style={styles.Title}>دوست خوبم! نظرت راجع به پرتو چیه؟</Text>
      <Rating
        type="custom"
        ratingImage={HeartShape}
        ratingColor={COLOR.btn}
        ratingBackgroundColor={COLOR.lightPink}
        ratingCount={5}
        imageSize={40}
        onFinishRating={_ratingCompleted}
        style={{ paddingVertical: 10 }}
      />
    </>
  );

  const _renderBody = () => (
    // <View style={styles.contentContiner}>
    //    <FlatList
    //     data={questionItems}
    //     numColumns={2}
    //     keyExtractor={(item, index) => index.toString()}
    //     // ListEmptyComponent={() => {
    //     //   return <EmptyList />;
    //     // }}
    //     renderItem={({ item }) => (
    //       <TouchableOpacity
    //         style={styles.GridViewContainer}
    //         // onPress={() =>
    //         //   navigation.navigate('TreatiseDetails', {
    //         //     treatiseContent: item,
    //         //   })
    //         // }
    //       >
    //         <Text style={styles.GridViewTextLayout}> {item.answer}</Text>
    //       </TouchableOpacity>
    //     )}
    //   />
    // </View>

    <NavigationContainer independent>
      {tabVisible && (
        <Tab.Navigator
          initialRouteName="نقاط قوت"
          tabBarOptions={{
            activeTintColor: 'black',
            pressColor: COLOR.lightPink,
            labelStyle: { fontSize: 14, fontFamily: FONT.regular },
            indicatorStyle: { backgroundColor: COLOR.btn },
            style: {
              backgroundColor: 'white',
              borderColor: '#aaa',
              borderWidth: 1,
            },
          }}>
          <Tab.Screen name="نقاط ضعف" component={neg} />
          <Tab.Screen name="نقاط قوت" component={pos} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );

  console.log('macAdd', macAdd);
  console.log('uniqueId', UniqueId);
  console.log('deviceId', deviceId);
  console.log('device', DeviceInfo.getDeviceName()._W);
  console.log('UUID', UUID);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{backgroundColor:COLOR.white}}>
      <Image
        style={styles.img}
        source={require('../../../assets/images/rate.png')}
        resizeMode="contain"
      />
      <Text style={styles.Title}>دوست خوبم! نظرت راجع به پرتو چیه؟</Text>
      <Rating
        type="custom"
        ratingImage={HeartShape}
        ratingColor={COLOR.btn}
        ratingBackgroundColor={COLOR.lightPink}
        ratingCount={5}
        imageSize={40}
        onFinishRating={_ratingCompleted}
        style={{ paddingVertical: 10 }}
      />
      </View>

      <FlatList
        data={questionItems}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        // ListEmptyComponent={() => {
        //   return <EmptyList />;
        // }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.GridViewContainer}
            // onPress={() =>
            //   navigation.navigate('TreatiseDetails', {
            //     treatiseContent: item,
            //   })
            // }
          >
            <Text style={styles.GridViewTextLayout}> {item.answer}</Text>
          </TouchableOpacity>
        )}
      /> */}
      <StickyParallaxHeader
        headerType="AvatarHeader"
        hasBorderRadius={false}
        backgroundColor="white"
        scrollEvent={event(
          [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
          {
            useNativeDriver: false,
          },
        )}
        parallaxHeight={HEIGHT / 2.3}
        transparentHeader={true}
        foreground={_renderForeground}
        renderBody={_renderBody}
        header={_renderHeader}
        snapStartThreshold={50}
        snapStopThreshold={250}
        snapValue={167}
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.buttons}>
        <Button
          title="ثبت بازخورد"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.nextButton}
          titleStyle={styles.btnTitle}
          type="solid"
          onPress={_handleSubmit}
        />
        <Button
          title="نوشتن دیدگاه"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.prevButton}
          titleStyle={styles.darkBtnTitle}
          type="solid"
          onPress={() => setIdeaVisible(true)}
        />
      </View>
      <Modal
        animationType="fade"
        isVisible={ideaVisible}
        onRequestClose={() => setIdeaVisible(false)}
        onBackdropPress={() => setIdeaVisible(false)}>
        <View
          style={{ backgroundColor: '#fff', borderRadius: 15, padding: 20 }}>
          <View
            style={{
              // marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              height: HEIGHT * 0.3,
              borderWidth: 1,
              borderRadius: 20,
              borderColor: '#aaa',
            }}>
            <TextInput
              style={{
                flex: 1,
                borderColor: 'black',
                alignSelf: 'flex-start',
                padding: 20,
                fontFamily: FONT.regular,
              }}
              placeholder={'نظر دهید...'}
              underlineColorAndroid="transparent"
              multiline
              onChangeText={(text) => setIdea(text)}
              value={idea}
            />
          </View>
          <View style={styles.ideaButtonWrapper}>
            <Button
              title="ثبت دیدگاه"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.nextButton}
              titleStyle={styles.btnTitle}
              type="solid"
              onPress={_handleIdea}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Ratings;
