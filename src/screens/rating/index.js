import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { Icon, Button } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import { COLOR, FONT, HEIGHT } from '../../styles/static';
import styles from './styles';
import HeartShape from '../../../assets/images/heartShape.png';

const Ratings = ({ navigation }) => {
  const [heartCount, setHeartCount] = useState(2.5);
  const [idea, setIdea] = useState('');
  const [servayItems, setServayItems] = useState([]);
  const [ideaVisible, setIdeaVisible] = useState(false);

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

  useEffect(() => {
    const getAnswer = () => {
      axios({
        method: 'post',
        url: `https://api.partobanoo.com/survay/surveyQuestion/fa`,
        data: {
          IMEi: '123456789123456',
        },
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        // },
      })
        .then((res) => {
          console.log('res', res);
          console.log('res', res.data.answers);
          setServayItems(res.data.answers);
        })
        .catch((err) => {
          console.error(err, err.response);
        });
    };

    getAnswer();
  }, []);

  const _ratingCompleted = (rating) => {
    setHeartCount(+rating);
  };

  const _handleIdea = () => {
    setIdea();
    setIdeaVisible(false)
  }; 
  const _handleSubmit=()=>{
    axios({
      method: 'put',
      url: `https://api.partobanoo.com/survay/userSurveyAnswer/fa`,
      data: {
        "userId": 0,
        "IMEi": "123456789123456",
        "rate": 2.5,
        "answers": "",
        "description": ""

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor:COLOR.white}}>
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
        data={servayItems}
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
      />

      <View style={styles.buttons}>
        <Button
          title="ثبت بازخورد"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.nextButton}
          titleStyle={styles.btnTitle}
          type="solid"
          onPress={ _handleSubmit}
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
