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
import { BarChart } from 'react-native-charts-wrapper';
import { Segment, Icon } from 'native-base';
import { Theme, Width, Height } from '../../../app/Theme';
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
const Period = () => {
  const [chartConfig1, setchartConfig1] = useState({
    legend: {
      enabled: true,
      textSize: 14,
      form: 'SQUARE',
      formSize: 14,
      xEntrySpace: 10,
      yEntrySpace: 5,
      formToTextSpace: 5,
      wordWrapEnabled: true,
      maxSizePercent: 0.5,
    },
    data: {
      dataSets: [
        {
          values: [
            { y: 100 },
            { y: 105 },
            { y: 102 },
            { y: 110 },
            { y: 114 },
            { y: 109 },
            { y: 105 },
            { y: 99 },
            { y: 95 },
          ],
          label: 'وضعیت پریود',
          config: {
            color: processColor('teal'),
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red'),
          },
        },
      ],

      config: {
        barWidth: 0.7,
      },
    },
    highlights: [{ x: 3 }, { x: 6 }],
    xAxis: {
      valueFormatter: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
      granularityEnabled: true,
      granularity: 1,
    },
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
  function handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }
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
              name="retweet"
              type="AntDesign"
              style={{ color: '#35CADD', fontSize: 25 }}></Icon>
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
        <BarChart
          style={styles.chart}
          data={chartConfig1.data}
          xAxis={chartConfig1.xAxis}
          animation={{ durationX: 2000 }}
          legend={chartConfig1.legend}
          gridBackgroundColor={processColor('#ffffff')}
          visibleRange={{ x: { min: 5, max: 5 } }}
          drawBarShadow={false}
          drawValueAboveBar={true}
          drawHighlightArrow={true}
          onSelect={() => handleSelect()}
          highlights={chartConfig1.highlights}
          onChange={(event) => console.log(event.nativeEvent)}
        />
      </View>
    </View>
  );
};

export default Period;
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
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
