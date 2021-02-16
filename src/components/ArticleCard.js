import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//styles
import { FONT } from '../styles/static';

const ArticleCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
          <View style={styles.cardTitleWrapper}>
            <Text style={styles.cardTitle}>{props.name}</Text>
          </View>
          <View>
            <Image
              style={styles.image}
              source={
                props.image
                  ? { uri: props.image }
                  : require('../../assets/images/NoPic.jpeg')
              }
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    height: 150,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardTitleWrapper: {
    alignItems: 'flex-end',
    marginTop: 10,
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: FONT.medium,
    marginBottom: 15,
  },
  cardContext: {
    fontSize: 12,
    fontFamily: FONT.medium,
    color: '#aaa',
  },
  button: {
    flexDirection: 'row',
    padding: 5,
    marginHorizontal: 20,
    justifyContent: 'flex-end',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 15,
    borderColor: 'black',
  },
});
