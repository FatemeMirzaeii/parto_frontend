import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { Segment, Icon } from 'native-base';
import { Theme, Width, Height } from '../../../styles/Theme';
import { LineChart } from 'react-native-chart-kit';
const { colors, size, fonts } = Theme;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Rainy Days'], // optional
};
const Weight = () => {
  const [chartConfig, setchartConfig] = useState({
    backgroundColor: 'white',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  });
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 / 8, flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
          }}></View>
        <View
          style={{
            flex: 1,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#DBDBDB',
            flexDirection: 'row',
            height: '90%',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="weight"
              type="FontAwesome5"
              style={{ color: '#44B8FF', fontSize: 20 }}></Icon>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textStyle2}>56 kg</Text>
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textStyle1}>وزن</Text>
          </View>
        </View>
      </View>
      <Text>Weight</Text>
    </View>
  );
};

export default Weight;
const styles = StyleSheet.create({
  circle: {
    width: Width * 0.2,
    height: Width * 0.2,
    borderColor: '#437CD1',
    borderWidth: 2,
    marginHorizontal: 5,
    borderRadius: 1000,
    borderStyle: 'dashed',
    // transform: [{ rotate:  }],
  },
  textStyle1: {
    color: '#00BCD4',
    fontSize: size[14],
    fontFamily: fonts.medium,
  },
  textStyle2: {
    color: '#00BCD4',
    fontSize: size[17],
    fontFamily: fonts.regular,
  },
  textStyle3: {
    color: '#00BCD4',
    fontFamily: fonts.medium,
    fontSize: size[14],
  },
  textView: {
    marginHorizontal: 15,
  },
});
