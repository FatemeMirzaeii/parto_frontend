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
import { Theme, Width, Height } from '../../../app/Theme';
import { LineChart } from 'react-native-chart-kit';
import Weight from './Weight';
import Sport from './Sport';
import Sleep from './Sleep';
import Temp from './Temp';
import Period from './Period';
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
//const chartConfig = {};
const Chart = () => {
  const [spinAnim, setspinAnim] = useState(new Animated.Value(0));
  const [chooseChart, setchooseChart] = useState('period');
  const [circleStyle, setcircleStyle] = useState({
    weight: { borderStyle: 'solid', textColor: '#3673CE' },
    sport: { borderStyle: 'solid', textColor: '#3673CE' },
    sleep: { borderStyle: 'solid', textColor: '#3673CE' },
    temp: { borderStyle: 'solid', textColor: '#3673CE' },
    period: { borderStyle: 'dotted', textColor: '#36CE45' },
  });

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
  useEffect(() => {
    //setspinAnim(0);
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const renderSwitch = () => {
    switch (chooseChart) {
      case 'weight':
        return <Weight />;
      case 'sport':
        return <Sport />;
      case 'sleep':
        return <Sleep />;
      case 'temp':
        return <Temp />;
      default:
        return <Period />;
    }
  };
  function chooseChartBTN(name) {
    var a = name;
    setchooseChart(name);
    setcircleStyle({
      ...circleStyle,
      sport: { borderStyle: 'dotted', textColor: '#36CE45' },
    });
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.textStyle3}>4 فروردین تا 16 اردیبهشت</Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            width: Width * 0.18,
            height: Width * 0.18,
            borderColor: circleStyle.weight.textColor,
            borderWidth: 2,
            marginHorizontal: 5,
            borderRadius: 1000,
            borderStyle: circleStyle.weight.borderStyle,
            //transform: [{ rotate: spin }],
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => chooseChartBTN('weight')}>
          <Text style={styles.textStyle3}>وزن</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: Width * 0.18,
            height: Width * 0.18,
            borderColor: circleStyle.sport.textColor,
            borderWidth: 2,
            marginHorizontal: 5,
            borderRadius: 1000,
            borderStyle: circleStyle.sport.borderStyle,
            //transform: [{ rotate: spin }],
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => chooseChartBTN('sport')}>
          <Text style={styles.textStyle3}>ورزش</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: Width * 0.18,
            height: Width * 0.18,
            borderColor: circleStyle.sleep.textColor,
            borderWidth: 2,
            marginHorizontal: 5,
            borderRadius: 1000,
            borderStyle: circleStyle.sleep.borderStyle,
            //transform: [{ rotate: spin }],
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => chooseChartBTN('sleep')}>
          <Text style={styles.textStyle3}>خواب</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: Width * 0.18,
            height: Width * 0.18,
            borderColor: circleStyle.temp.textColor,
            borderWidth: 2,
            marginHorizontal: 5,
            borderRadius: 1000,
            borderStyle: circleStyle.temp.borderStyle,
            //transform: [{ rotate: spin }],
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => chooseChartBTN('temp')}>
          <Text style={styles.textStyle3}>دما</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: Width * 0.18,
            height: Width * 0.18,
            borderColor: circleStyle.period.textColor,
            borderWidth: 2,
            marginHorizontal: 5,
            borderRadius: 1000,
            borderStyle: circleStyle.period.borderStyle,
            //transform: [{ rotate: spin }],
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => chooseChartBTN('period')}>
          <Text style={styles.textStyle3}>دوره</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 7 }}>{renderSwitch()}</View>
    </View>
  );
};

export default Chart;
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
