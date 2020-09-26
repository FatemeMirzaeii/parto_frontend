import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONT } from '../styles/static';

const ArticleCard = (props) => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            flexDirection: 'row',
            padding: 5,
            marginHorizontal: 20,
            justifyContent: 'flex-end',
          }}>
          <View style={{ alignItems: 'flex-end', flex: 1, padding: 10 }}>
            <Text style={styles.cardTitle}>{props.name}</Text>
          </View>
          <View>
            <Image
              style={{
                width: 110,
                height: 110,
                borderRadius: 15,
                borderColor: 'black',
                //borderWidth: 1,
              }}
              source={{ uri: props.image }}
            />
          </View>
        </TouchableOpacity>
        {/* <View
          style={{
            flexDirection: 'row',
            padding: 5,
            marginHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '30%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Icon
              type="Feather"
              name="share-2"
              // onPress={props.shareContent}
              style={{ fontSize: 18 }}
            />
            <Icon type="Feather" name="bookmark" style={{ fontSize: 18 }} />
            <Icon type="Feather" name="eye" style={{ fontSize: 18 }} />
            <Icon
              type="Feather"
              name="heart"
              //onPress={props.shareContent}
              style={{ fontSize: 18 }}
            />
          </View>
          <Text style={{}}>منبع مقاله</Text>
        </View> */}
      </View>
    </View>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    // backgroundColor: "#e5e5e5"
  },
  card: {
    // alignItems: "center",
    backgroundColor: '#fff',
    flex: 1,
    height: 180,
    margin: 10,
    paddingVertical: 20,
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
  cardTitle: {
    fontSize: 15,
    fontFamily: FONT.medium,
    marginBottom: 15,
    // padding:5
  },
  cardContext: {
    fontSize: 12,
    fontFamily: FONT.medium,
    //padding:7,
    color: '#aaa',
  },
});
