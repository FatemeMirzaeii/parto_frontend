import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import Ptxt from './Ptxt';
//styles
import { COLOR, FONT, SIZE,WIDTH } from '../styles/static';

const NewestArticles = props => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity 
      //onPress={props.onSelectMeal}
      >
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              // source={{ uri: props.image }}
              source={require('../../assets/images/NoPic.jpeg')}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Ptxt style={styles.title} numberOfLines={2}>
                  {props.title}
                </Ptxt>
              </View>
            </ImageBackground>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 170,
    width:WIDTH-70 ,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop:10
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    //height: '85%'
  },
  mealDetail: {
    //paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontSize: SIZE[17],
    color: 'white',
    textAlign: 'center'
  }
});

export default NewestArticles;
