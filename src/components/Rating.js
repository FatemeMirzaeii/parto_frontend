//
import React, { Component } from 'react';
//import react in our code.
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  // Icon,
} from 'react-native';
import { Icon } from 'native-base';

import { Theme, Height, Width } from '../app/Theme';
const { fonts, size, colors } = Theme;
//import all the components we are going to use.

export default class Rating extends Component<{}> {
  constructor() {
    super();
    this.state = {
      Default_Rating: 0,
      //To set the default Star Selected
      Max_Rating: 5,
      index: 0,
      //To set the max number of Stars
    };
    //Filled Star. You can also give the path from local
    this.Star = <Icon name="heart" type="FontAwesome" />;
    //   'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    //Empty Star. You can also give the path from local
    this.Star_With_Border = <Icon name="heart-o" type="FontAwesome" />;
    //   'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }
  UpdateRating(key) {
    this.setState({ Default_Rating: key });
    //Keeping the Rating Selected in state
  }
  // TextRating(key) {
  //   this.setState({ index: i - 1 });
  //   console.log('sho');
  // }

  render() {
    let React_Native_Rating_Bar = [];
    let array = ['ضعیف', 'بد', 'متوسط', 'خوب', 'خیلی خوب'];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      // this.setState({ index: i });
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          {/* <Icon
            style={styles.StarImage}
            name={ */}
          {i <= this.state.Default_Rating ? (
            <Icon
              name="heart-circle"
              type="Ionicons"
              style={styles.StarImage}
            />
          ) : (
            <Icon
              name="heart-circle-outline"
              type="Ionicons"
              style={styles.StarImage}
            />
          )}

          {/* this.TextRating.bind(this, i) */}
          {/* } */}
          {/* /> */}
        </TouchableOpacity>,
      );
    }
    return (
      <View style={styles.MainContainer}>
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>

        {/* <Text style={styles.textStyle}>
          {this.state.Default_Rating} / {this.state.Max_Rating}
        </Text> */}
        <Text style={styles.textStyle}>
          {array[this.state.Default_Rating - 1]}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    // paddingTop: Platform.OS === 'ios' ? 20 : 0,
    // marginTop: 10,
  },
  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
    // marginTop: 30,
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    // marginTop: 30,
    // padding: 15,
    backgroundColor: '#8ad24e',
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    color: colors.btn,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.reView,
    marginTop: -15,
    fontFamily: fonts.regular,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,

    color: '#000',
    marginTop: 15,
  },
});
