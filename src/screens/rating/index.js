import React from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import TextScore from './TextScore';
import Rating from './Rating.js';
import styles from './styles';

const Ratings = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.up}>
        <Text style={styles.text1}>امتیاز دهی به پرتو</Text>
        <Image
          source={require('../../../assets/images/mahdie/Component23–3.png')}
        />
      </View>
      <View>
        <Image source={require('../../../assets/images/rate.png')} />
      </View>
      <Text style={styles.text2}>به پرتو چه امتیازی می دهی ؟</Text>
      <Rating />
      <View>
        <Image source={require('../../../assets/images/mahdie/Line36.png')} />
      </View>
      {/* {select} */}
      <TextScore />
      <View style={styles.design}>
        <View style={styles.all}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              Alert.alert('ثبت دیدگاه', 'با تشکر نظر شما ثبت شد', [
                { text: 'ثبت', style: 'default' },
              ])
            }>
            <Image
              source={require('../../../assets/images/mahdie/Component7–1.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              Alert.alert('ثبت بازخورد', 'با تشکر نظر شما ثبت شد', [
                { text: 'ثبت', style: 'default' },
              ])
            }>
            <Image
              source={require('../../../assets/images/mahdie/Component8–8.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Ratings;
