import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

//components
import Ptxt from './Ptxt';

//styles
import { SIZE, WIDTH, HEIGHT } from '../styles/static';

const NewestArticles = (props) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={props.onSelectArticle}>
        <>
          <View style={styles.imageWrapper}>
            <ImageBackground
              source={
                props.image
                  ? { uri: props.image }
                  : require('../../assets/images/NoPic.jpeg')
              }
              style={styles.bgImage}>
              <View style={styles.titleContainer}>
                <Ptxt style={styles.title} numberOfLines={2}>
                  {props.title}
                </Ptxt>
              </View>
            </ImageBackground>
          </View>
        </>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: HEIGHT / 4,
    width: WIDTH - 70,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 10,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageWrapper: {
    flexDirection: 'row',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: SIZE[17],
    color: 'white',
    textAlign: 'center',
  },
});

export default NewestArticles;
