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
  processColor,
} from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import { Segment, Icon } from 'native-base';
import { Theme, Width, Height } from '../../../styles/Theme';
const { colors, size, fonts } = Theme;
const colors1 = [
  processColor('red'),
  processColor('blue'),
  processColor('green'),
  processColor('yellow'),
  processColor('purple'),
  processColor('pink'),
];
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
const Temp = () => {
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
  const [chartConfig1, setchartConfig1] = useState({
    values: [0],
    colorIndex: 0,
    marker: {
      enabled: true,
      digits: 2,
      backgroundTint: processColor('teal'),
      markerColor: processColor('#F0C0FF8C'),
      textColor: processColor('white'),
    },
  });
  function next(values, colorIndex) {
    return {
      data: {
        dataSets: [
          {
            values: values,
            label: 'Sine function',

            config: {
              drawValues: false,
              color: colors1[colorIndex],
              mode: 'CUBIC_BEZIER',
              drawCircles: false,
              lineWidth: 2,
            },
          },
        ],
      },
      xAxis: {
        axisLineWidth: 0,
        drawLabels: false,
        position: 'BOTTOM',
        drawGridLines: false,
      },
    };
  }
  const { values, colorIndex } = chartConfig1;
  const config = next(values, colorIndex);
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
              name="thermometer-half"
              type="FontAwesome5"
              style={{ color: '#FF6D5E', fontSize: 25 }}></Icon>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textStyle2}>37 C</Text>
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textStyle1}>متوسط دمای بدن شما</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 7 / 8 }}>
        <LineChart
          data={config.data}
          xAxis={config.xAxis}
          style={styles.container}
          marker={chartConfig1.marker}
          ref="chart"
        />
      </View>
    </View>
  );
};

export default Temp;
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
  },
});
