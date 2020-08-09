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
import { Segment, Icon } from 'native-base';
import { Theme, Width, Height } from '../../../app/Theme';
import { LineChart } from 'react-native-chart-kit';
import { BarChart } from 'react-native-charts-wrapper';
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
const Sport = () => {
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
    legend: {
      enabled: true,
      textSize: 14,
      form: 'SQUARE',
      formSize: 14,
      xEntrySpace: 10,
      yEntrySpace: 5,
      wordWrapEnabled: true,
    },
    data: {
      dataSets: [
        {
          values: [
            { y: [40, 30, 20], marker: ['row1', 'row2', 'row3'] },
            { y: [10, 20, 10], marker: 'second' },
            { y: [30, 20, 50], marker: ['hello', 'world', 'third'] },
            { y: [30, 50, 10], marker: 'fourth' },
          ],
          label: 'آمار ورزشی',
          config: {
            colors: [
              processColor('#C0FF8C'),
              processColor('#FFF78C'),
              processColor('#FFD08C'),
            ],
            stackLabels: ['شنا', 'باشگاه', 'نرمش'],
          },
        },
      ],
    },
    highlights: [
      { x: 1, stackIndex: 2 },
      { x: 2, stackIndex: 1 },
    ],
    xAxis: {
      valueFormatter: ['Q1', 'Q2', 'Q3', 'Q4'],
      granularityEnabled: true,
      granularity: 1,
    },
  });
  function handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      setchartConfig1({ ...chartConfig1, selectedEntry: null });
    } else {
      setchartConfig1({
        ...chartConfig1,
        selectedEntry: JSON.stringify(entry),
      });
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
              name="foot"
              type="Foundation"
              style={{ color: '#9DCE46', fontSize: 25 }}></Icon>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textStyle2}>2 ساعت</Text>
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.textStyle1}>متوسط ساعات ورزشی</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 7 / 8 }}>
        <BarChart
          style={styles.chart}
          xAxis={chartConfig1.xAxis}
          data={chartConfig1.data}
          legend={chartConfig1.legend}
          drawValueAboveBar={false}
          marker={{
            enabled: true,
            markerColor: processColor('#F0C0FF8C'),
            textColor: processColor('white'),
            markerFontSize: 14,
          }}
          highlights={chartConfig1.highlights}
          onSelect={(event) => handleSelect(event)}
          onChange={(event) => console.log(event.nativeEvent)}
        />
      </View>
    </View>
  );
};

export default Sport;
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
  chart: {
    flex: 1,
  },
  textStyle2: {
    color: '#00BCD4',
    fontSize: size[14],
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
