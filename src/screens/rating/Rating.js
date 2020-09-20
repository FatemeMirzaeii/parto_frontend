import React, { Component } from 'react';
//import { Rating, AirbnbRating } from 'react-native-elements';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

export default class Rating extends Component {
  constructor() {
    super();
    this.state = {
      Default_Rating: 5,
      Max_Rating: 5,
    };
  }
  Update(key) {
    this.setState({ Default_Rating: key });
  }
  render() {
    let React_Native_Bar = []; //...this.React_Native_Bar
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Bar.push(
        //this.
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.Update.bind(this, i)}>
          <Image
            style={styles.button}
            source={
              i <= this.state.Default_Rating
                ? require('../../../assets/images/mahdie/Group4295.png')
                : require('../../../assets/images/mahdie/Ellipse306.png')
            }
          />
          {/* if(i==1){ <Text>بد</Text>} */}
          {/* <View><Quote quoteText={this.props.text} quoteSource={this.props.source} /></View> */}
        </TouchableOpacity>,
      );
    }
    return (
      //this.setState()
      <View style={styles.allR}>{React_Native_Bar}</View>
    );
  }
}
