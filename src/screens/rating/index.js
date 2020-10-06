import React, { useState, useLayoutEffect } from 'react';
import { SafeAreaView, View, Image, Text ,TextInput} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import { COLOR ,FONT,HEIGHT} from '../../styles/static';
import styles from './styles';

const Ratings = ({ navigation }) => {
  const [heartCount, setHeartCount] = useState(2.5);
  const [idea,setIdea]= useState('');
  const [ideaVisible,setIdeaVisible]= useState(false);

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

  const _ratingCompleted = (rating) => {
    setHeartCount(+rating);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.img}
        source={require('../../../assets/images/rate.png')}
        resizeMode="contain"
      />
      {/* <Rating
        type="heart"
        ratingCount={5}
        imageSize={50}
        ratingColor={COLOR.btn}
        // ratingBackgroundColor={COLOR.lightPink}
        // ratingBackgroundColor='#c8c7c8'
       //type='custom'
        onFinishRating={_ratingCompleted}
      /> */}
      <Rating
        type="custom"
        // ratingImage={WATER_IMAGE}
        ratingColor={COLOR.tiffany}
        ratingBackgroundColor={'#ceee'}
        //  ratingColor={COLOR.btn}
        //  ratingBackgroundColor={COLOR.lightPink}
        ratingCount={5}
        imageSize={40}
        onFinishRating={_ratingCompleted}
        //showRating
        style={{ paddingVertical: 10 }}
      />
      <View style={styles.buttons}>
        <Button
          title="ثبت بازخورد"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.nextButton}
          titleStyle={styles.btnTitle}
          type="solid"
          onPress={() => console.log('star', heartCount)}
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
        onRequestClose={() =>setIdeaVisible(false)}
        onBackdropPress={() => setIdeaVisible(false)}>
        <View style={{ backgroundColor: '#fff', borderRadius: 15,padding:20 }}>
          <View
            style={{
             // marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              height:HEIGHT*0.3,
              borderWidth: 1,
              borderRadius: 20,
              borderColor:'#aaa'
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
              
              onChangeText={(text) => setIdea({ text })}
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
          onPress={() => console.log('star', heartCount)}
        />
        </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Ratings;
